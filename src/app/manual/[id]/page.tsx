'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import styles from './page.module.scss';
import BlockRenderer from '@/components/manual/BlockRenderer';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { ChecklistBlock } from '@/lib/types';

// Next.js 15/16 App Router: params is a Promise
export default function ManualWizardPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const router = useRouter();
    const { id } = unwrappedParams;

    const { progress, initProgress, updateCurrentStep, markStepCompleted, completeManual, resetManual, manuals, stepsMap } = useAppStore(
        useShallow((state) => ({
            progress: state.progress,
            initProgress: state.initProgress,
            updateCurrentStep: state.updateCurrentStep,
            markStepCompleted: state.markStepCompleted,
            completeManual: state.completeManual,
            resetManual: state.resetManual,
            manuals: state.manuals,
            stepsMap: state.steps,
        }))
    );

    const [mounted, setMounted] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]); // Current step's checked items

    const manual = manuals.find((m) => m.id === id);
    const steps = stepsMap[id] || [];

    useEffect(() => {
        setMounted(true);
        initProgress(id);
    }, [id, initProgress]);

    // Load current step index from store
    const userProgress = mounted ? progress[id] : undefined;
    const currentStepIndex = userProgress?.currentStepIndex || 0;
    const isCompleted = userProgress?.isCompleted || false;

    const currentStep = steps[currentStepIndex];

    // Restore checked status if this step is already completed
    // (In a real app, we might want to store checked status per step in store too,
    // but spec says only completedStepIds. So for now, if step is "completed", we check all required items?
    // Or we just rely on local state. Since "completedStepIds" tracks completion, we can assume if it's in there, it's done.
    // But spec logic for "Next" button relies on checkbox state. 
    // For UX, when going BACK, we want checks to remain.
    // MVP simplified: If step IS in completedStepIds, we assume all checks are ON initially?
    // Or better: Just managing current step state locally is fine for pure wizard forward flow.
    // But backing up would lose state.
    // Let's rely on `completedStepIds` to auto-fill checks if we revisit?
    // Actually, let's keep it simple: Reset checks when step changes.)

    useEffect(() => {
        // Reset checks when step changes
        setCheckedItems([]);

        // If step is already marked as completed in history, maybe pre-fill?
        if (userProgress?.completedStepIds.includes(currentStep?.id)) {
            if (currentStep && currentStep.blocks) {
                const allChecklistItems = currentStep.blocks
                    .filter((b): b is ChecklistBlock => b.type === 'checklist')
                    .flatMap(b => b.items.map(i => i.id));
                setCheckedItems(allChecklistItems);
            }
        }
    }, [currentStepIndex, currentStep, userProgress?.completedStepIds]);

    if (!manual || !steps.length) {
        return <div className={styles.notFound}>Manual not found</div>;
    }

    if (isCompleted) {
        return (
            <div className={styles.completedContainer}>
                <CheckCircle size={64} className={styles.completedIcon} />
                <h1 className={styles.completedTitle}>お疲れ様でした！</h1>
                <p className={styles.completedMessage}>「{manual.title}」を完了しました。</p>
                <div className={styles.completedActions}>
                    <button onClick={() => resetManual(id)} className={styles.restartButton}>
                        最初からやり直す
                    </button>
                    <button onClick={() => router.push('/')} className={styles.homeButton}>
                        ダッシュボードへ戻る
                    </button>
                </div>
            </div>
        );
    }

    if (!currentStep) return <div>Loading...</div>;

    const isLastStep = currentStepIndex === steps.length - 1;

    // Validation
    // Extract all items from all checklist blocks
    const allChecklistItems = currentStep.blocks
        ? currentStep.blocks
            .filter((b): b is ChecklistBlock => b.type === 'checklist')
            .flatMap(b => b.items)
        : [];

    // Spec: "All checkboxes must be checked" (ignoring isRequired flag, user wants full check)
    // Or should we trust isRequired? User said "check the checkbox...". 
    // Usually "isRequired" implies that. But let's assume ALL items shown are required for now based on request phrasing.
    // "チェックボックスをチェックしないと...すべてのチェックボックスをチェックで次のStepに"
    // -> Suggests ALL.
    const allRequiredChecked = allChecklistItems.every(i => checkedItems.includes(i.id));
    const canProceed = allRequiredChecked;

    const handleToggle = (itemId: string, checked: boolean) => {
        setCheckedItems(prev =>
            checked ? [...prev, itemId] : prev.filter(id => id !== itemId)
        );
    };

    const handleNext = () => {
        if (!canProceed) return;

        // Mark current step as completed
        markStepCompleted(id, currentStep.id);

        if (isLastStep) {
            completeManual(id);
        } else {
            updateCurrentStep(id, currentStepIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            updateCurrentStep(id, currentStepIndex - 1);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.wizardHeader}>
                <div className={styles.progressLabel}>
                    Step {currentStepIndex + 1} / {steps.length}
                </div>
                <div
                    className={styles.progressFill}
                    style={{ width: `${((currentStepIndex) / steps.length) * 100}%` }}
                />
                <div className={styles.progressBar}>
                </div>
            </header>

            <main className={styles.main}>
                <h1 className={styles.stepTitle}>{currentStep.title}</h1>

                {(currentStep.blocks || []).map(block => (
                    <BlockRenderer
                        key={block.id}
                        block={block}
                        checkedItems={checkedItems}
                        onToggle={handleToggle}
                    />
                ))}
            </main>

            <footer className={styles.footer}>
                <button
                    className={styles.backButton}
                    onClick={handleBack}
                    disabled={currentStepIndex === 0}
                >
                    <ChevronLeft size={20} />
                    戻る
                </button>

                <button
                    className={clsx(styles.nextButton, !canProceed && styles.disabled)}
                    onClick={handleNext}
                    disabled={!canProceed}
                    title={!canProceed ? "必須項目をすべてチェックしてください" : ""}
                >
                    {isLastStep ? '完了する' : '次へ'}
                    <ChevronRight size={20} />
                </button>
            </footer>
        </div>
    );
}
