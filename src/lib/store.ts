// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from './types';

interface AppState {
    progress: Record<string, UserProgress>; // key: manualId
    // Actions
    initProgress: (manualId: string) => void;
    updateCurrentStep: (manualId: string, stepIndex: number) => void;
    markStepCompleted: (manualId: string, stepId: string) => void;
    completeManual: (manualId: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            progress: {},

            initProgress: (manualId: string) => {
                const { progress } = get();
                if (!progress[manualId]) {
                    set({
                        progress: {
                            ...progress,
                            [manualId]: {
                                userId: 'current-user',
                                manualId,
                                currentStepIndex: 0,
                                completedStepIds: [],
                                isCompleted: false,
                                lastAccessedAt: new Date().toISOString(),
                            },
                        },
                    });
                }
            },

            updateCurrentStep: (manualId: string, stepIndex: number) => {
                set((state) => ({
                    progress: {
                        ...state.progress,
                        [manualId]: {
                            ...state.progress[manualId],
                            currentStepIndex: stepIndex,
                            lastAccessedAt: new Date().toISOString(),
                        }
                    }
                }))
            },

            markStepCompleted: (manualId: string, stepId: string) => {
                set((state) => {
                    const currentProgress = state.progress[manualId];
                    if (!currentProgress) return state;

                    const newCompletedSteps = currentProgress.completedStepIds.includes(stepId)
                        ? currentProgress.completedStepIds
                        : [...currentProgress.completedStepIds, stepId];

                    return {
                        progress: {
                            ...state.progress,
                            [manualId]: {
                                ...currentProgress,
                                completedStepIds: newCompletedSteps,
                                lastAccessedAt: new Date().toISOString(),
                            },
                        },
                    };
                });
            },

            completeManual: (manualId: string) => {
                set((state) => ({
                    progress: {
                        ...state.progress,
                        [manualId]: {
                            ...state.progress[manualId],
                            isCompleted: true,
                            lastAccessedAt: new Date().toISOString(),
                        },
                    },
                }));
            },
        }),
        {
            name: 'manual-app-storage',
        }
    )
);
