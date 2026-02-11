import { Manual, Step } from '@/lib/types';

export const manual: Manual = {
    "id": "manual_005",
    "title": "欠席・出欠対応",
    "description": "欠席連絡の受付から、スプレッドシート、Rakuko、支援記録の入力までの標準手順",
    "category": "利用者対応",
    "keywords": [
        "欠席",
        "遅刻",
        "早退",
        "Rakuko",
        "スプレッドシート",
        "支援記録"
    ],
    "estimatedTime": 10,
    "totalSteps": 5,
    "updatedAt": "2026-01-29T12:00:00Z"
};

export const steps: Step[] = [
    {
        "id": "step_005_1",
        "manualId": "manual_005",
        "order": 1,
        "title": "受付・ヒアリング（電話・メール・その他）",
        "blocks": [
            {
                "id": "block_005_1_1",
                "type": "text",
                "content": "電話や口頭、メールで連絡を受けたら、以下の項目を確認します。<br>・欠席 か 午前・午後出社（遅刻・早退）か<br>・理由や体調<br>・（体調不良等ですぐ治りそうなら）次に来れそうな日付<br><br><strong>【重要】</strong>最後に「無理しないでいいですよ」など、優しい言葉をかけてください。"
            },
            {
                "id": "block_005_1_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_005_1_1",
                        "text": "必要な情報のヒアリング完了（区分、理由、次回予定等）",
                        "isRequired": true
                    },
                    {
                        "id": "chk_005_1_2",
                        "text": "最後に優しい言葉をかけた",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_005_2",
        "manualId": "manual_005",
        "order": 2,
        "title": "スプレッドシート記入",
        "blocks": [
            {
                "id": "block_005_2_1",
                "type": "text",
                "content": "「欠席連絡フォーム（回答）」のスプレッドシートを開き、以下の項目を記入します。<br>・受付日<br>・氏名<br>・変更内容<br>・対象日<br>・変更理由<br>・その他連絡事項（詳細な理由）<br>・次回出勤日<br>・支援内容<br>・受付方法<br>・対応者"
            },
            {
                "id": "block_005_2_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_005_2_1",
                        "text": "スプレッドシートへの記入を完了した",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_005_3",
        "manualId": "manual_005",
        "order": 3,
        "title": "Rakuko利用実績（対象者選択）",
        "blocks": [
            {
                "id": "block_005_3_1",
                "type": "text",
                "content": "Rakukoの「実績」ページを開きます。<br>当該者の行にあるチェックボックスを<strong>オン</strong>にして、「編集する」ボタンを押してください。"
            },
            {
                "id": "block_005_3_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_005_3_1",
                        "text": "当該者を選択して編集画面へ遷移した",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_005_4",
        "manualId": "manual_005",
        "order": 4,
        "title": "Rakuko利用実績（入力・保存）",
        "blocks": [
            {
                "id": "block_005_4_1",
                "type": "text",
                "content": "実績入力画面で以下の操作を行います。<br>1. <strong>提供サービス</strong>：セレクトボックスで「欠席時対応」または「欠席（加算なし）」を選択<br>2. <strong>備考欄</strong>：理由や次回出勤予定日を記入<br>※有給使用の場合は「メモ欄」へ記入してください。<br><br>必要項目をもれなく記入し、「保存する」ボタンを押します。"
            },
            {
                "id": "block_005_4_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_005_4_1",
                        "text": "提供サービス（欠席対応/欠席）を正しく選択した",
                        "isRequired": true
                    },
                    {
                        "id": "chk_005_4_2",
                        "text": "備考欄（有給時はメモ欄）への記入完了",
                        "isRequired": true
                    },
                    {
                        "id": "chk_005_4_3",
                        "text": "保存を完了した",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_005_5",
        "manualId": "manual_005",
        "order": 5,
        "title": "支援記録への記入",
        "blocks": [
            {
                "id": "block_005_5_1",
                "type": "text",
                "content": "「記録」>「支援記録」ページへ移動します。<br>当該者の「編集する」ボタンから編集ページへ遷移し、以下を記入・選択します。<br>・当該者の記入欄<br>・記録者<br>・欠席理由・支援内容<br>・対応職員<br><br>入力後、「保存する」ボタンを押して完了です。"
            },
            {
                "id": "block_005_5_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_005_5_1",
                        "text": "支援記録への記入・保存を完了した",
                        "isRequired": true
                    }
                ]
            }
        ]
    }
];
