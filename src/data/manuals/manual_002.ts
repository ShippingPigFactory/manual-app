import { Manual, Step } from '@/lib/types';

export const manual: Manual = {
    id: 'manual_002',
    title: '社内Wifiの接続設定',
    description: 'PCやスマートフォンを社内ネットワークに接続する方法です。',
    category: 'IT設定',
    keywords: ['wifi', 'internet', 'network', 'パスワード', '無線LAN'],
    estimatedTime: 5,
    totalSteps: 2,
    updatedAt: '2023-10-05T14:30:00Z',
};

export const steps: Step[] = [
    {
        id: 'step_002_1',
        manualId: 'manual_002',
        order: 1,
        title: 'SSIDの選択',
        blocks: [
            {
                id: 'block_002_1_1',
                type: 'text',
                content: 'Wifi設定画面を開き、SSID <strong>"Company-Secure-5G"</strong> を選択してください。'
            },
            {
                id: 'block_002_1_2',
                type: 'checklist',
                items: [
                    { id: 'chk_002_1_1', text: 'SSIDが見つかった', isRequired: true },
                ]
            }
        ]
    },
    {
        id: 'step_002_2',
        manualId: 'manual_002',
        order: 2,
        title: 'パスワードの入力',
        blocks: [
            {
                id: 'block_002_2_1',
                type: 'text',
                content: '配布されたパスワードを入力し、接続を確認してください。'
            },
            {
                id: 'block_002_2_2',
                type: 'checklist',
                items: [
                    { id: 'chk_002_2_1', text: 'インターネットに繋がった', isRequired: true },
                ]
            }
        ]
    },
];
