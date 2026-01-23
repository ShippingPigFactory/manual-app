'use client';

import { useState } from 'react';
import { mockManuals, mockSteps } from '@/data/mockData';
import styles from './page.module.scss';
import clsx from 'clsx';
import { Folder, FileText, GripVertical, Plus } from 'lucide-react';
import { Manual, Step } from '@/lib/types';
// dnd-kit imports (omitted for MVP mock unless strictly required to work. Focusing on layout and keywords editing)

export default function AdminPage() {
    const [selectedManualId, setSelectedManualId] = useState<string | null>(mockManuals[0]?.id || null);
    const [editingManual, setEditingManual] = useState<Manual | undefined>(
        mockManuals.find(m => m.id === mockManuals[0]?.id)
    );

    const steps = selectedManualId ? mockSteps[selectedManualId] : [];

    const handleManualSelect = (id: string) => {
        setSelectedManualId(id);
        const manual = mockManuals.find(m => m.id === id);
        setEditingManual(manual ? { ...manual } : undefined);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingManual) return;
        const val = e.target.value;
        // カンマ区切りで配列に変換 (簡易実装)
        const keywords = val.split(',').map(k => k.trim()).filter(k => k !== '');
        setEditingManual({ ...editingManual, keywords });
    };

    if (!editingManual) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>マニュアル管理</h2>
                <div className={styles.tree}>
                    {mockManuals.map(manual => (
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
                <button className={styles.addButton}>
                    <Plus size={16} />
                    新規マニュアル作成
                </button>
            </aside>

            <main className={styles.main}>
                <div className={styles.editorHeader}>
                    <h1 className={styles.editorTitle}>編集: {editingManual.title}</h1>
                    <button className={styles.saveButton}>保存する</button>
                </div>

                <div className={styles.columns}>
                    {/* Step List (Tree) */}
                    <div className={styles.stepListColumn}>
                        <h3 className={styles.colTitle}>ステップ構成</h3>
                        <div className={styles.stepList}>
                            {steps.map((step, index) => (
                                <div key={step.id} className={styles.stepItem}>
                                    <GripVertical size={16} className={styles.dragHandle} />
                                    <div className={styles.stepContent}>
                                        <span className={styles.stepOrder}>Step {index + 1}</span>
                                        <span className={styles.stepTitle}>{step.title}</span>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.addStepItem}>
                                <Plus size={16} /> ステップを追加
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className={styles.formColumn}>
                        <h3 className={styles.colTitle}>基本情報設定</h3>

                        <div className={styles.formGroup}>
                            <label>タイトル</label>
                            <input type="text" value={editingManual.title} readOnly className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>説明</label>
                            <textarea value={editingManual.description} readOnly className={styles.textarea} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                検索キーワード (カンマ区切り)
                                <span className={styles.badge}>必須</span>
                            </label>
                            <p className={styles.helpText}>
                                ユーザーが検索しそうな言葉を入力してください (例: 領収書, バス代, 定期)
                            </p>
                            <input
                                type="text"
                                value={editingManual.keywords.join(', ')}
                                onChange={handleKeywordChange}
                                className={styles.input}
                                placeholder="キーワード1, キーワード2..."
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
