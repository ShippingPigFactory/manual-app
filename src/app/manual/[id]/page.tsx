'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockManuals, mockSteps } from '@/data/mockData';
import styles from './page.module.scss';
import Checklist from '@/components/manual/Checklist';
import MediaViewer from '@/components/manual/MediaViewer';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

// Next.js 15/16 App Router: params is a Promise
export default function ManualWizardPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const router = useRouter();
    const { id } = unwrappedParams;

    const { progress, initProgress, updateCurrentStep, markStepCompleted, completeManual } = useAppStore(
        useShallow((state) => ({
            progress: state.progress,
            initProgress: state.initProgress,
            updateCurrentStep: state.updateCurrentStep,
            markStepCompleted: state.markStepCompleted,
            completeManual: state.completeManual,
        }))
    );

    const [mounted, setMounted] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]); // Current step's checked items

    const manual = mockManuals.find((m) => m.id === id);
    const steps = mockSteps[id] || [];

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
        // Reset checks when step changes, OR restore if we track them.
        // Since we don't track individual checkbox state in store (only step completion),
        // we will clear them.
        setCheckedItems([]);

        // If step is already marked as completed in history, maybe pre-fill?
        if (userProgress?.completedStepIds.includes(currentStep?.id)) {
            // Fill all required items?
            // For simplicity, let's just leave them unchecked or fill all.
            // Let's fill all to be kind.
            if (currentStep) {
                setCheckedItems(currentStep.checklist.map(c => c.id));
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
                <button onClick={() => router.push('/')} className={styles.homeButton}>
                    ダッシュボードへ戻る
                </button>
            </div>
        );
    }

    if (!currentStep) return <div>Loading...</div>;

    const isLastStep = currentStepIndex === steps.length - 1;

    // Validation
    const requiredItemIds = currentStep.checklist.filter(i => i.isRequired).map(i => i.id);
    const allRequiredChecked = requiredItemIds.every(id => checkedItems.includes(id));
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
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${((currentStepIndex) / steps.length) * 100}%` }}
                    />
                </div>
            </header>

            <main className={styles.main}>
                <h1 className={styles.stepTitle}>{currentStep.title}</h1>

                {currentStep.media && (
                    <MediaViewer
                        url={currentStep.media.url}
                        type={currentStep.media.type}
                        caption={currentStep.media.caption}
                    />
                )}

                {/* Using dangerouslySetInnerHTML as spec allows content to be HTML string */}
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: currentStep.content }}
                />

                <Checklist
                    items={currentStep.checklist}
                    checkedIds={checkedItems}
                    onToggle={handleToggle}
                />
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
