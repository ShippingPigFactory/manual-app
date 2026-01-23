import { Manual, Step } from '@/lib/types';

export const mockManuals: Manual[] = [
    {
        id: 'manual_001',
        title: '経費精算の手順',
        description: '交通費や交際費の精算フローについて解説します。',
        category: '総務',
        keywords: ['領収書', '交通費', '経費', '精算', '電車代', 'タクシー代'],
        estimatedTime: 10,
        totalSteps: 3,
        updatedAt: '2023-10-01T10:00:00Z',
    },
    {
        id: 'manual_002',
        title: '社内Wifiの接続設定',
        description: 'PCやスマートフォンを社内ネットワークに接続する方法です。',
        category: 'IT設定',
        keywords: ['wifi', 'internet', 'network', 'パスワード', '無線LAN'],
        estimatedTime: 5,
        totalSteps: 2,
        updatedAt: '2023-10-05T14:30:00Z',
    },
    {
        id: 'manual_003',
        title: '入社時の書類提出',
        description: '入社初日に提出が必要な書類リストと書き方です。',
        category: '入社手続き',
        keywords: ['入社', '書類', '人事', '契約書', 'マイナンバー'],
        estimatedTime: 20,
        totalSteps: 4,
        updatedAt: '2023-09-20T09:00:00Z',
    },
];

export const mockSteps: Record<string, Step[]> = {
    'manual_001': [
        {
            id: 'step_001_1',
            manualId: 'manual_001',
            order: 1,
            title: '領収書の準備',
            content: '精算に必要な領収書を手元に用意してください。<br>日付、金額、但し書きが明記されていることを確認します。',
            checklist: [
                { id: 'chk_001_1_1', text: '領収書が揃っている', isRequired: true },
                { id: 'chk_001_1_2', text: '宛名が自社名になっている', isRequired: true },
            ],
        },
        {
            id: 'step_001_2',
            manualId: 'manual_001',
            order: 2,
            title: '申請システムへの入力',
            content: '社内ポータルから経費精算システムにログインし、「新規申請」ボタンをクリックしてください。',
            media: {
                type: 'image',
                url: '/images/expense_system_login.png',
                caption: 'システムログイン画面',
            },
            checklist: [
                { id: 'chk_001_2_1', text: 'ログインできた', isRequired: true },
            ],
        },
        {
            id: 'step_001_3',
            manualId: 'manual_001',
            order: 3,
            title: '上長への提出',
            content: '入力内容に間違いがないか確認し、「申請」ボタンを押してください。その後、領収書の原本を総務ボックスへ提出します。',
            checklist: [
                { id: 'chk_001_3_1', text: '申請ボタンを押した', isRequired: true },
                { id: 'chk_001_3_2', text: '原本を提出した', isRequired: true },
            ],
        },
    ],
    'manual_002': [
        {
            id: 'step_002_1',
            manualId: 'manual_002',
            order: 1,
            title: 'SSIDの選択',
            content: 'Wifi設定画面を開き、SSID <strong>"Company-Secure-5G"</strong> を選択してください。',
            checklist: [
                { id: 'chk_002_1_1', text: 'SSIDが見つかった', isRequired: true },
            ],
        },
        {
            id: 'step_002_2',
            manualId: 'manual_002',
            order: 2,
            title: 'パスワードの入力',
            content: '配布されたパスワードを入力し、接続を確認してください。',
            checklist: [
                { id: 'chk_002_2_1', text: 'インターネットに繋がった', isRequired: true },
            ],
        },
    ],
    'manual_003': [
        {
            id: 'step_003_1',
            manualId: 'manual_003',
            order: 1,
            title: '必要書類の確認',
            content: '以下の書類が手元にあるか確認してください：雇用契約書、身元保証書、マイナンバーカード（または通知カード）。',
            checklist: [
                { id: 'chk_003_1_1', text: '雇用契約書がある', isRequired: true },
                { id: 'chk_003_1_2', text: '身元保証書がある', isRequired: true },
                { id: 'chk_003_1_3', text: 'マイナンバー関連書類がある', isRequired: true }
            ]
        },
        {
            id: 'step_003_2',
            manualId: 'manual_003',
            order: 2,
            title: '雇用契約書の記入',
            content: '雇用契約書の署名・捺印欄に記入してください。住所は住民票の通りに記載します。',
            checklist: [
                { id: 'chk_003_2_1', text: '署名・捺印完了', isRequired: true }
            ]
        },
        {
            id: 'step_003_3',
            manualId: 'manual_003',
            order: 3,
            title: '身元保証書の記入',
            content: '保証人の方に署名・捺印を依頼してください。',
            checklist: [
                { id: 'chk_003_3_1', text: '保証人の署名・捺印完了', isRequired: true }
            ]
        },
        {
            id: 'step_003_4',
            manualId: 'manual_003',
            order: 4,
            title: '提出',
            content: '全ての書類をクリアファイルに入れ、人事担当者へ提出してください。',
            checklist: [
                { id: 'chk_003_4_1', text: '提出完了', isRequired: true }
            ]
        }
    ]
};
