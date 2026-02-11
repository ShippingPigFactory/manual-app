'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import clsx from 'clsx';
import { Folder, FileText, GripVertical, Plus, Save, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, ListChecks, Type } from 'lucide-react';
import { Manual, Step, Block, TextBlock, ImageBlock, ChecklistBlock, ChecklistItem } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default function AdminPage() {
    const {
        manuals,
        stepsMap,
        createManual,
        updateManual,
        addStep,
        updateStep,
        reorderSteps,
        deleteManual,
        deleteStep
    } = useAppStore(
        useShallow(state => ({
            manuals: state.manuals,
            stepsMap: state.steps,
            createManual: state.createManual,
            updateManual: state.updateManual,
            addStep: state.addStep,
            updateStep: state.updateStep,
            reorderSteps: state.reorderSteps,
            deleteManual: state.deleteManual,
            deleteStep: state.deleteStep
        }))
    );

    const [selectedManualId, setSelectedManualId] = useState<string | null>(null);

    // Local editing state
    const [editingManual, setEditingManual] = useState<Manual | undefined>(undefined);
    const [editingSteps, setEditingSteps] = useState<Step[]>([]);
    const [isDirty, setIsDirty] = useState(false);

    // Initial load selection
    useEffect(() => {
        if (!selectedManualId && manuals.length > 0) {
            handleManualSelect(manuals[0].id);
        }
    }, [manuals.length]);

    const handleManualSelect = (id: string) => {
        if (isDirty) {
            if (!confirm('保存されていない変更があります。破棄してもよろしいですか？')) return;
        }
        setSelectedManualId(id);
        const manual = manuals.find(m => m.id === id);
        setEditingManual(manual ? { ...manual } : undefined);
        setEditingSteps(stepsMap[id] ? JSON.parse(JSON.stringify(stepsMap[id])) : []); // Deep copy for blocks
        setIsDirty(false);
    };

    const handleSave = async () => {
        if (!editingManual || !selectedManualId) return;

        // 1. Update Client Store (Immediate UI reflect)
        updateManual(editingManual);
        reorderSteps(selectedManualId, editingSteps);

        // 2. Persist to Disk (API)
        try {
            const res = await fetch('/api/manuals/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    manual: editingManual,
                    steps: editingSteps
                })
            });

            if (!res.ok) throw new Error('Failed to save to disk');

            setIsDirty(false);
            alert('保存しました (ファイル書き込み完了)');
        } catch (e) {
            console.error(e);
            alert('ブラウザ保存は完了しましたが、ファイル書き込みに失敗しました');
        }
    };

    const handleCreateManual = () => {
        const newId = `manual_${Date.now()}`;
        const newManual: Manual = {
            id: newId,
            title: '新規マニュアル',
            description: '',
            category: '未分類',
            keywords: [],
            estimatedTime: 10,
            totalSteps: 0,
            updatedAt: new Date().toISOString()
        };
        createManual(newManual);
        handleManualSelect(newId);
    };

    const handleAddStep = () => {
        if (!editingManual) return;
        const newStep: Step = {
            id: `step_${Date.now()}`,
            manualId: editingManual.id,
            order: editingSteps.length + 1,
            title: '',
            blocks: []
        };
        setEditingSteps([...editingSteps, newStep]);
        setIsDirty(true);
    };

    const handleStepChange = (index: number, field: keyof Step, value: any) => {
        const newSteps = [...editingSteps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    const handleStepDelete = (index: number) => {
        if (!confirm('このステップを削除しますか？')) return;
        const newSteps = editingSteps.filter((_, i) => i !== index);
        newSteps.forEach((s, i) => s.order = i + 1);
        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    // --- Block Management ---

    const handleAddBlock = (stepIndex: number, type: Block['type']) => {
        const newSteps = [...editingSteps];
        const step = newSteps[stepIndex];
        const newBlockId = `block_${Date.now()}`;

        let newBlock: Block;
        if (type === 'text') {
            newBlock = { id: newBlockId, type: 'text', content: '' };
        } else if (type === 'image') {
            newBlock = { id: newBlockId, type: 'image', url: '', caption: '' };
        } else {
            newBlock = { id: newBlockId, type: 'checklist', items: [] };
        }

        step.blocks = [...(step.blocks || []), newBlock];
        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    const handleBlockChange = (stepIndex: number, blockIndex: number, field: string, value: any) => {
        const newSteps = [...editingSteps];
        const step = newSteps[stepIndex];
        const block = { ...step.blocks[blockIndex] };

        // Type safety handling roughly
        (block as any)[field] = value;

        step.blocks[blockIndex] = block;
        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    // Checklist Item Management
    const handleAddChecklistItem = (stepIndex: number, blockIndex: number) => {
        const newSteps = [...editingSteps];
        const step = newSteps[stepIndex];
        const block = step.blocks[blockIndex] as ChecklistBlock;

        const newItem: ChecklistItem = {
            id: `chk_${Date.now()}`,
            text: '',
            isRequired: true
        };

        block.items = [...block.items, newItem];
        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    const handleChecklistItemChange = (stepIndex: number, blockIndex: number, itemIndex: number, field: keyof ChecklistItem, value: any) => {
        const newSteps = [...editingSteps];
        const step = newSteps[stepIndex];
        const block = step.blocks[blockIndex] as ChecklistBlock;

        const newItem = { ...block.items[itemIndex], [field]: value };
        block.items[itemIndex] = newItem;

        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    const handleChecklistItemDelete = (stepIndex: number, blockIndex: number, itemIndex: number) => {
        const newSteps = [...editingSteps];
        const step = newSteps[stepIndex];
        const block = step.blocks[blockIndex] as ChecklistBlock;

        block.items = block.items.filter((_, i) => i !== itemIndex);
        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    const handleBlockDelete = (stepIndex: number, blockIndex: number) => {
        if (!confirm('このブロックを削除しますか？')) return;
        const newSteps = [...editingSteps];
        const step = newSteps[stepIndex];
        step.blocks = step.blocks.filter((_, i) => i !== blockIndex);
        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    const handleBlockMove = (stepIndex: number, blockIndex: number, direction: 'up' | 'down') => {
        const newSteps = [...editingSteps];
        const step = newSteps[stepIndex];
        const blocks = [...step.blocks];

        if (direction === 'up' && blockIndex === 0) return;
        if (direction === 'down' && blockIndex === blocks.length - 1) return;

        const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
        [blocks[blockIndex], blocks[targetIndex]] = [blocks[targetIndex], blocks[blockIndex]];

        step.blocks = blocks;
        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    const handleStepMove = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === editingSteps.length - 1) return;

        const newSteps = [...editingSteps];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];

        newSteps.forEach((s, i) => s.order = i + 1);

        setEditingSteps(newSteps);
        setIsDirty(true);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingManual) return;
        const val = e.target.value;
        const keywords = val.split(',').map(k => k.trim());
        setEditingManual({ ...editingManual, keywords });
        setIsDirty(true);
    };

    if (!manuals) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>マニュアル管理</h2>
                <div className={styles.tree}>
                    {manuals.map(manual => (
                        <div
                            key={manual.id}
                            className={clsx(styles.treeItem, selectedManualId === manual.id && styles.active)}
                            onClick={() => handleManualSelect(manual.id)}
                        >
                            <Folder size={16} className={styles.icon} />
                            <span className={styles.folderName}>{manual.title}</span>
                        </div>
                    ))}
                </div>
                <button className={styles.addButton} onClick={handleCreateManual}>
                    <Plus size={16} />
                    新規マニュアル作成
                </button>
            </aside>

            <main className={styles.main}>
                {editingManual ? (
                    <>
                        <div className={styles.editorHeader}>
                            <h1 className={styles.editorTitle}>編集: {editingManual.title}</h1>
                            <button
                                className={styles.saveButton}
                                onClick={handleSave}
                                disabled={!isDirty}
                            >
                                <Save size={16} /> 保存する
                            </button>
                        </div>

                        <div className={styles.columns}>
                            <div className={styles.stepListColumn}>
                                <h3 className={styles.colTitle}>ステップ構成</h3>
                                <div className={styles.stepList}>
                                    {editingSteps.map((step, stepIndex) => (
                                        <div key={step.id} className={styles.stepItemWrapper}>
                                            <div className={styles.stepItem}>
                                                <div className={styles.stepControls}>
                                                    <button onClick={() => handleStepMove(stepIndex, 'up')} disabled={stepIndex === 0}><ArrowUp size={14} /></button>
                                                    <button onClick={() => handleStepMove(stepIndex, 'down')} disabled={stepIndex === editingSteps.length - 1}><ArrowDown size={14} /></button>
                                                </div>
                                                <div className={styles.stepContent}>
                                                    <span className={styles.stepOrder}>Step {stepIndex + 1}</span>
                                                    <input
                                                        type="text"
                                                        value={step.title}
                                                        onChange={(e) => handleStepChange(stepIndex, 'title', e.target.value)}
                                                        className={styles.stepTitleInput}
                                                    />
                                                </div>
                                                <button onClick={() => handleStepDelete(stepIndex)} className={styles.deleteButton}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>

                                            {/* Blocks Editor */}
                                            <div className={styles.stepBlocks}>
                                                {(step.blocks || []).map((block, blockIndex) => (
                                                    <div key={block.id} className={styles.blockItem}>
                                                        <div className={styles.blockHeader}>
                                                            <span className={styles.blockTypeLabel}>
                                                                {block.type === 'text' && <Type size={12} />}
                                                                {block.type === 'image' && <ImageIcon size={12} />}
                                                                {block.type === 'checklist' && <ListChecks size={12} />}
                                                                <span>{block.type.toUpperCase()}</span>
                                                            </span>
                                                            <div className={styles.blockControls}>
                                                                <button onClick={() => handleBlockMove(stepIndex, blockIndex, 'up')} disabled={blockIndex === 0}><ArrowUp size={12} /></button>
                                                                <button onClick={() => handleBlockMove(stepIndex, blockIndex, 'down')} disabled={blockIndex === step.blocks.length - 1}><ArrowDown size={12} /></button>
                                                                <button onClick={() => handleBlockDelete(stepIndex, blockIndex)} className={styles.deleteBlockButton}><Trash2 size={12} /></button>
                                                            </div>
                                                        </div>

                                                        <div className={styles.blockBody}>
                                                            {block.type === 'text' && (
                                                                <textarea
                                                                    className={styles.blockTextarea}
                                                                    value={block.content}
                                                                    onChange={(e) => handleBlockChange(stepIndex, blockIndex, 'content', e.target.value)}
                                                                    placeholder="テキストを入力 (HTML可)"
                                                                />
                                                            )}
                                                            {block.type === 'image' && (
                                                                <div className={styles.blockImageInput}>
                                                                    <input
                                                                        type="text"
                                                                        value={block.url}
                                                                        onChange={(e) => handleBlockChange(stepIndex, blockIndex, 'url', e.target.value)}
                                                                        placeholder="画像URL"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={block.caption || ''}
                                                                        onChange={(e) => handleBlockChange(stepIndex, blockIndex, 'caption', e.target.value)}
                                                                        placeholder="キャプション (任意)"
                                                                    />
                                                                </div>
                                                            )}
                                                            {block.type === 'checklist' && (
                                                                <div className={styles.blockChecklist}>
                                                                    {block.items.map((item, itemIndex) => (
                                                                        <div key={item.id} className={styles.checklistItem}>
                                                                            <input
                                                                                type="text"
                                                                                value={item.text}
                                                                                onChange={(e) => handleChecklistItemChange(stepIndex, blockIndex, itemIndex, 'text', e.target.value)}
                                                                                placeholder="確認項目"
                                                                            />
                                                                            <button onClick={() => handleChecklistItemDelete(stepIndex, blockIndex, itemIndex)}><Trash2 size={12} /></button>
                                                                        </div>
                                                                    ))}
                                                                    <button className={styles.addCheckItemButton} onClick={() => handleAddChecklistItem(stepIndex, blockIndex)}>
                                                                        + 項目追加
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className={styles.addBlockArea}>
                                                    <span className={styles.addBlockLabel}>ブロック追加:</span>
                                                    <button onClick={() => handleAddBlock(stepIndex, 'text')}><Type size={14} /> テキスト</button>
                                                    <button onClick={() => handleAddBlock(stepIndex, 'image')}><ImageIcon size={14} /> 画像</button>
                                                    <button onClick={() => handleAddBlock(stepIndex, 'checklist')}><ListChecks size={14} /> チェックリスト</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className={styles.addStepItem} onClick={handleAddStep}>
                                        <Plus size={16} /> ステップを追加
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formColumn}>
                                <h3 className={styles.colTitle}>基本情報設定</h3>
                                <div className={styles.formGroup}>
                                    <label>タイトル</label>
                                    <input
                                        type="text"
                                        value={editingManual.title}
                                        onChange={(e) => {
                                            setEditingManual({ ...editingManual, title: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>説明</label>
                                    <textarea
                                        value={editingManual.description}
                                        onChange={(e) => {
                                            setEditingManual({ ...editingManual, description: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className={styles.textarea}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>カテゴリ</label>
                                    <input
                                        type="text"
                                        value={editingManual.category}
                                        onChange={(e) => {
                                            setEditingManual({ ...editingManual, category: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>検索キーワード (カンマ区切り)</label>
                                    <input
                                        type="text"
                                        value={editingManual.keywords.join(', ')}
                                        onChange={handleKeywordChange}
                                        className={styles.input}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyState}>マニュアルを選択または作成してください</div>
                )}
            </main>
        </div>
    );
}
