import { Manual, Step } from '@/lib/types';

export const manual: Manual = {
    id: 'manual_001',
    title: '経費精算の手順',
    description: '交通費や交際費の精算フローについて解説します。',
    category: '総務',
    keywords: ['領収書', '交通費', '経費', '精算', '電車代', 'タクシー代'],
    estimatedTime: 10,
    totalSteps: 3,
    updatedAt: '2023-10-01T10:00:00Z',
};

export const steps: Step[] = [
    {
        id: 'step_001_1',
        manualId: 'manual_001',
        order: 1,
        title: '領収書の準備',
        blocks: [
            {
                id: 'block_001_1_1',
                type: 'text',
                content: '精算に必要な領収書を手元に用意してください。<br>日付、金額、但し書きが明記されていることを確認します。'
            },
            {
                id: 'block_001_1_2',
                type: 'checklist',
                items: [
                    { id: 'chk_001_1_1', text: '領収書が揃っている', isRequired: true },
                    { id: 'chk_001_1_2', text: '宛名が自社名になっている', isRequired: true },
                ]
            }
        ]
    },
    {
        id: 'step_001_2',
        manualId: 'manual_001',
        order: 2,
        title: '申請システムへの入力',
        blocks: [
            {
                id: 'block_001_2_1',
                type: 'text',
                content: '社内ポータルから経費精算システムにログインし、「新規申請」ボタンをクリックしてください。'
            },
            {
                id: 'block_001_2_2',
                type: 'image',
                url: '/images/expense_system_login.png',
                caption: 'システムログイン画面'
            },
            {
                id: 'block_001_2_3',
                type: 'checklist',
                items: [
                    { id: 'chk_001_2_1', text: 'ログインできた', isRequired: true },
                ]
            }
        ]
    },
    {
        id: 'step_001_3',
        manualId: 'manual_001',
        order: 3,
        title: '上長への提出',
        blocks: [
            {
                id: 'block_001_3_1',
                type: 'text',
                content: '入力内容に間違いがないか確認し、「申請」ボタンを押してください。その後、領収書の原本を総務ボックスへ提出します。'
            },
            {
                id: 'block_001_3_2',
                type: 'checklist',
                items: [
                    { id: 'chk_001_3_1', text: '申請ボタンを押した', isRequired: true },
                    { id: 'chk_001_3_2', text: '原本を提出した', isRequired: true },
                ]
            }
        ]
    },
];
