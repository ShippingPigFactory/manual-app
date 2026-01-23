// src/lib/types.ts

// 1. Manual (マニュアル本体)
// 検索機能の精度を高めるため keywords フィールドを必須としています。
export type Manual = {
    id: string;
    title: string;          // 例: "経費精算の手順"
    description: string;    // 一覧に表示する短い説明
    category: string;       // 例: "総務", "IT設定", "入社手続き"
    keywords: string[];     // ★検索用タグ (例: ["領収書", "交通費", "月末", "電車代"])
    estimatedTime: number;  // 所要時間(分)
    totalSteps: number;     // ステップ総数
    updatedAt: string;      // ISO string形式の日付
};

// 2. ChecklistItem (チェックリストの項目)
export type ChecklistItem = {
    id: string;
    text: string;           // 例: "領収書の宛名が自社名になっているか確認しましたか？"
    isRequired: boolean;    // trueの場合、チェックしないと「次へ」ボタンが無効化される
};

// 3. Step (各手順)
// 1ステップにつき1画面を表示します。
export type Step = {
    id: string;
    manualId: string;
    order: number;          // 1, 2, 3... (表示順)
    title: string;          // その画面でやることのタイトル
    content: string;        // 説明文 (HTML string または Markdown string)
    media?: {
        type: 'image' | 'video' | 'youtube';
        url: string;
        caption?: string;
    };
    checklist: ChecklistItem[];
};

// 4. UserProgress (進捗状況)
// ユーザーごとの進捗を管理するオブジェクト。
// MVPではローカルストレージまたはZustandストア内でのみ保持します。
export type UserProgress = {
    userId: string;         // MVPでは "current-user" 固定でも可
    manualId: string;
    currentStepIndex: number; // 現在表示しているステップのインデックス (0 start)
    completedStepIds: string[]; // 完了したステップIDのリスト
    isCompleted: boolean;     // マニュアル全体の完了フラグ
    lastAccessedAt: string;
};
