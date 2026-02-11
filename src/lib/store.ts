// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, Manual, Step } from './types';
import { mockManuals, mockSteps } from '@/data/mockData';

interface AppState {
    progress: Record<string, UserProgress>;
    manuals: Manual[];
    steps: Record<string, Step[]>;
    // Actions
    initProgress: (manualId: string) => void;
    updateCurrentStep: (manualId: string, stepIndex: number) => void;
    markStepCompleted: (manualId: string, stepId: string) => void;
    completeManual: (manualId: string) => void;
    resetManual: (manualId: string) => void;

    // Admin Actions
    createManual: (manual: Manual) => void;
    updateManual: (manual: Manual) => void;
    deleteManual: (manualId: string) => void;

    addStep: (manualId: string, step: Step) => void;
    updateStep: (manualId: string, step: Step) => void;
    reorderSteps: (manualId: string, newOrder: Step[]) => void;
    deleteStep: (manualId: string, stepId: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            progress: {},
            manuals: mockManuals, // Initial load from mock
            steps: mockSteps,     // Initial load from mock

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

            resetManual: (manualId: string) => {
                set((state) => ({
                    progress: {
                        ...state.progress,
                        [manualId]: {
                            ...state.progress[manualId],
                            currentStepIndex: 0,
                            completedStepIds: [],
                            isCompleted: false,
                            lastAccessedAt: new Date().toISOString(),
                        },
                    },
                }));
            },

            // Admin Actions Implementation
            createManual: (manual: Manual) => {
                set((state) => ({
                    manuals: [...state.manuals, manual],
                    steps: { ...state.steps, [manual.id]: [] }
                }));
            },

            updateManual: (updatedManual: Manual) => {
                set((state) => ({
                    manuals: state.manuals.map(m => m.id === updatedManual.id ? updatedManual : m)
                }));
            },

            deleteManual: (manualId: string) => {
                set((state) => ({
                    manuals: state.manuals.filter(m => m.id !== manualId),
                    // Optionally clean up steps and progress
                }));
            },

            addStep: (manualId: string, step: Step) => {
                set((state) => {
                    const currentSteps = state.steps[manualId] || [];
                    const updatedSteps = [...currentSteps, step];
                    // Update totalSteps in manual
                    const updatedManuals = state.manuals.map(m =>
                        m.id === manualId ? { ...m, totalSteps: updatedSteps.length } : m
                    );

                    return {
                        steps: { ...state.steps, [manualId]: updatedSteps },
                        manuals: updatedManuals
                    };
                });
            },

            updateStep: (manualId: string, updatedStep: Step) => {
                set((state) => {
                    const currentSteps = state.steps[manualId] || [];
                    const updatedSteps = currentSteps.map(s => s.id === updatedStep.id ? updatedStep : s);
                    return {
                        steps: { ...state.steps, [manualId]: updatedSteps }
                    };
                });
            },

            reorderSteps: (manualId: string, newOrder: Step[]) => {
                set((state) => ({
                    steps: { ...state.steps, [manualId]: newOrder }
                }));
            },

            deleteStep: (manualId: string, stepId: string) => {
                set((state) => {
                    const currentSteps = state.steps[manualId] || [];
                    const updatedSteps = currentSteps.filter(s => s.id !== stepId);

                    // Update totalSteps in manual
                    const updatedManuals = state.manuals.map(m =>
                        m.id === manualId ? { ...m, totalSteps: updatedSteps.length } : m
                    );

                    return {
                        steps: { ...state.steps, [manualId]: updatedSteps },
                        manuals: updatedManuals
                    };
                });
            },
        }),
        {
            name: 'manual-app-storage',
            version: 2,
            partialize: (state) => ({
                progress: state.progress,
                manuals: state.manuals,
                steps: state.steps
            }), // Persist manuals and steps too
            // Reset if version mismatch (default behavior requires version in storage which is missing for v0)
            // Implicitly handles it or we can force it.
            migrate: (persistedState, version) => {
                if (version < 2) {
                    return {
                        manuals: mockManuals,
                        steps: mockSteps,
                        progress: {}
                    } as unknown as AppState;
                }
                return persistedState as AppState;
            }
        }
    )
);
