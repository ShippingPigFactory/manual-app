import { Manual, Step } from '@/lib/types';

export const manual: Manual = {
    "id": "manual_004",
    "title": "伝票発行業務",
    "description": "GoQシステムを使用した送り状発行業務標準手順（全配送業者共通）",
    "category": "発送業務",
    "keywords": [
        "伝票",
        "GoQ",
        "発送",
        "送り状",
        "佐川",
        "ヤマト",
        "ピッキング"
    ],
    "estimatedTime": 20,
    "totalSteps": 11,
    "updatedAt": "2026-01-26T13:00:00Z"
};

export const steps: Step[] = [
    {
        "id": "step_004_1",
        "manualId": "manual_004",
        "order": 1,
        "title": "作業前チェック（開始条件・数量振分）",
        "blocks": [
            {
                "id": "block_004_1_1",
                "type": "text",
                "content": "1. 業務を行う出荷区分タグ（佐川・ヤマト等）をクリック"
            },
            {
                "id": "block_1769474734520",
                "type": "image",
                "url": "/step1_1.webp",
                "caption": ""
            },
            {
                "id": "block_1769473639718",
                "type": "text",
                "content": "2. 表示件数を「最大」に変更"
            },
            {
                "id": "block_1769475886259",
                "type": "image",
                "url": "/step1_2.png",
                "caption": ""
            },
            {
                "id": "block_1769473653639",
                "type": "text",
                "content": "3. 絞り込みパネルで注文数「2」を指定し「絞り込む」"
            },
            {
                "id": "block_1769475927151",
                "type": "image",
                "url": "/step1_3.webp",
                "caption": ""
            },
            {
                "id": "block_1769473714480",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_1769473723316",
                        "text": "注文数「2」で絞り込み確認した",
                        "isRequired": true
                    }
                ]
            },
            {
                "id": "block_1769473684514",
                "type": "text",
                "content": "4. 内容を確認し、別送やサイズ変更（120サイズ以上等）が必要なものを適切なステータスへ移動<br>※これらを完了してから次へ進みます。"
            },
            {
                "id": "block_004_1_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_1_2",
                        "text": "必要なステータス移動（サイズ変更等）を完了した",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_2",
        "manualId": "manual_004",
        "order": 2,
        "title": "発送待ち・Amazon振分",
        "blocks": [
            {
                "id": "block_004_2_1",
                "type": "text",
                "content": "「発送待ち」および「Amazon振分用」の注文があるか確認し、あれば正しいステータスに移動してください。<br>これらが一覧に残っていない状態にしてから次へ進みます。"
            },
            {
                "id": "block_004_2_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_2_1",
                        "text": "発送待ち・Amazon振分用の注文を処理・移動した",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_3",
        "manualId": "manual_004",
        "order": 3,
        "title": "伝票未発行・ステータス一致確認",
        "blocks": [
            {
                "id": "block_004_3_1",
                "type": "text",
                "content": "全件に対して以下を確認してください。<br>・伝票番号（追跡番号）が未入力<br>・出荷日が未入力<br><br><strong>【重要】現在のステータスと配送業者タグが完全に一致していること</strong><br>例：<br>・佐川急便ステータス → 「佐川急便」タグ<br>・ヤマト運輸ステータス → 「ヤマト運輸」タグ<br>・コンパクトステータス → 「ヤマト運輸コンパクト」タグ<br>・ネコポス徳島ステータス → 「ヤマト運輸ネコポス」タグ<br>※「宅急便コンパクト」「ネコポス」などは別物です。混在していると送り状が発行されません。必ず正しいタグのみが選択されているか確認してください。"
            },
            {
                "id": "block_004_3_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_3_1",
                        "text": "伝票番号（追跡番号）・出荷日が未入力であることを確認。チェックシート記入",
                        "isRequired": true
                    },
                    {
                        "id": "chk_004_3_2",
                        "text": "配送業者タグがステータスと完全に一致していることを確認。チェックシート記入",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_4",
        "manualId": "manual_004",
        "order": 4,
        "title": "チェック項目の変更（配送業者タグが一致している場合は次へ）",
        "blocks": [
            {
                "id": "block_004_4_1",
                "type": "text",
                "content": "注文詳細ページで発送方法に応じた「チェック項目」を選択します。<br>・コンパクト→宅急便コンパクト<br>・ネコポス→ネコポス<br>※佐川急便、ヤマト運輸（60サイズ以上）は全ての「チェック項目」を外してください。"
            },
            {
                "id": "block_004_4_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_4_1",
                        "text": "チェック項目を確認。チェックシート記入",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_5",
        "manualId": "manual_004",
        "order": 5,
        "title": "出荷日入力・当日出荷絞り込み",
        "blocks": [
            {
                "id": "block_004_5_1",
                "type": "text",
                "content": "1. 現在のステータスに戻る<br>2. 全件チェックを入れる<br>3. 一括入力で出荷日に「今日」を選択（上書きON）<br>4. 絞り込みパネルで期間→出荷日→「今日」で絞り込み<br>5. 出荷日の列が今日の日付になっているか確認"
            },
            {
                "id": "block_004_5_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_5_1",
                        "text": "出荷日を一括入力した",
                        "isRequired": true
                    },
                    {
                        "id": "chk_004_5_2",
                        "text": "当日出荷分で絞り込み。チェックシート記入",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_6",
        "manualId": "manual_004",
        "order": 6,
        "title": "出荷件数の記録",
        "blocks": [
            {
                "id": "block_004_6_1",
                "type": "text",
                "content": "当日出荷絞り込み後のGoQ上の件数を確認し、チェックシートに記入してください。"
            },
            {
                "id": "block_004_6_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_6_1",
                        "text": "件数をチェックシートに記入した。",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_7",
        "manualId": "manual_004",
        "order": 7,
        "title": "ピッキングリスト出力",
        "blocks": [
            {
                "id": "block_004_7_1",
                "type": "text",
                "content": "1. 全件チェック<br>2. 出力形式「出荷担当者用」を選択して出力<br>3. Smart Pick（ブックマーク）へ移動し、CSVファイルを選択（日時で判断）<br>4. ピッキングリストを表示・印刷<br>※注文が赤くなっていたり警告が出ている場合は報告する。"
            },
            {
                "id": "block_004_7_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_7_1",
                        "text": "ピッキングリストを印刷した",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_8",
        "manualId": "manual_004",
        "order": 8,
        "title": "送り状データ発行",
        "blocks": [
            {
                "id": "block_004_8_1",
                "type": "text",
                "content": "1. 該当する配送業者の「送り状発行」ボタンをクリック<br>2. ダウンロードファイル一覧を新しいタブで開く<br>3. 完了時間が現在時刻のファイルを開く<br>※エラーが出た場合はTangoマニュアルを参照してください。"
            },
            {
                "id": "block_004_8_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_8_1",
                        "text": "送り状データを出力した",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_9",
        "manualId": "manual_004",
        "order": 9,
        "title": "ラベル・伝票確認",
        "blocks": [
            {
                "id": "block_004_9_1",
                "type": "text",
                "content": "<strong>確認チェック：</strong><br>・印刷件数 ＝ GoQ件数<br>・JANコードが印字されている<br>・数量が（）内に表示されている<br>・複数注文は「×2」等を記載<br><br>印刷件数をチェックシートの赤枠に記入してください。"
            },
            {
                "id": "block_004_9_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_9_1",
                        "text": "印刷件数を確認。チェックシート記入",
                        "isRequired": true
                    },
                    {
                        "id": "chk_004_9_2",
                        "text": "複数注文の記載を行った",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_10",
        "manualId": "manual_004",
        "order": 10,
        "title": "完了確認・終了処理",
        "blocks": [
            {
                "id": "block_004_10_1",
                "type": "text",
                "content": "1. GoQに戻る<br>2. 追跡番号反映済 または 対象受注が一覧から消えたことを確認<br>3. チェックシートに「追跡番号下4桁 または 消」と「作業終了時間」を記入"
            },
            {
                "id": "block_004_10_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_10_1",
                        "text": "追跡番号の反映 または 対象受注が一覧から消えたことを確認した",
                        "isRequired": true
                    },
                    {
                        "id": "chk_004_10_2",
                        "text": "チェックシートに「追跡番号下4桁 または 消」と「作業終了時間」を記入した",
                        "isRequired": true
                    }
                ]
            }
        ]
    },
    {
        "id": "step_004_11",
        "manualId": "manual_004",
        "order": 11,
        "title": "作業完了条件",
        "blocks": [
            {
                "id": "block_004_11_1",
                "type": "text",
                "content": "以下の状態であれば業務完了です。<br>・ピッキングリスト印刷済み<br>・伝票発行済<br>・追跡番号確認済<br>・チェックシート記入完了"
            },
            {
                "id": "block_004_11_2",
                "type": "checklist",
                "items": [
                    {
                        "id": "chk_004_11_1",
                        "text": "全ての工程が完了した",
                        "isRequired": true
                    }
                ]
            }
        ]
    }
];
