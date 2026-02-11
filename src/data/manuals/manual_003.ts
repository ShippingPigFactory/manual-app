import { Manual, Step } from '@/lib/types';

export const manual: Manual = {
    id: 'manual_003',
    title: '入社時の書類提出',
    description: '入社初日に提出が必要な書類リストと書き方です。',
    category: '入社手続き',
    keywords: ['入社', '書類', '人事', '契約書', 'マイナンバー'],
    estimatedTime: 20,
    totalSteps: 4,
    updatedAt: '2023-09-20T09:00:00Z',
};

export const steps: Step[] = [
    {
        id: 'step_003_1',
        manualId: 'manual_003',
        order: 1,
        title: '必要書類の確認',
        blocks: [
            {
                id: 'block_003_1_1',
                type: 'text',
                content: '以下の書類が手元にあるか確認してください：雇用契約書、身元保証書、マイナンバーカード（または通知カード）。'
            },
            {
                id: 'block_003_1_2',
                type: 'checklist',
                items: [
                    { id: 'chk_003_1_1', text: '雇用契約書がある', isRequired: true },
                    { id: 'chk_003_1_2', text: '身元保証書がある', isRequired: true },
                    { id: 'chk_003_1_3', text: 'マイナンバー関連書類がある', isRequired: true }
                ]
            }
        ]
    },
    {
        id: 'step_003_2',
        manualId: 'manual_003',
        order: 2,
        title: '雇用契約書の記入',
        blocks: [
            {
                id: 'block_003_2_1',
                type: 'text',
                content: '雇用契約書の署名・捺印欄に記入してください。住所は住民票の通りに記載します。'
            },
            {
                id: 'block_003_2_2',
                type: 'checklist',
                items: [
                    { id: 'chk_003_2_1', text: '署名・捺印完了', isRequired: true }
                ]
            }
        ]
    },
    {
        id: 'step_003_3',
        manualId: 'manual_003',
        order: 3,
        title: '身元保証書の記入',
        blocks: [
            {
                id: 'block_003_3_1',
                type: 'text',
                content: '保証人の方に署名・捺印を依頼してください。'
            },
            {
                id: 'block_003_3_2',
                type: 'checklist',
                items: [
                    { id: 'chk_003_3_1', text: '保証人の署名・捺印完了', isRequired: true }
                ]
            }
        ]
    },
    {
        id: 'step_003_4',
        manualId: 'manual_003',
        order: 4,
        title: '提出',
        blocks: [
            {
                id: 'block_003_4_1',
                type: 'text',
                content: '全ての書類をクリアファイルに入れ、人事担当者へ提出してください。'
            },
            {
                id: 'block_003_4_2',
                type: 'checklist',
                items: [
                    { id: 'chk_003_4_1', text: '提出完了', isRequired: true }
                ]
            }
        ]
    }
];
