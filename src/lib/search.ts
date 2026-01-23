// src/lib/search.ts
import Fuse, { IFuseOptions } from 'fuse.js';
import { Manual } from './types';

const options: IFuseOptions<Manual> = {
    includeScore: true,
    // 0.0=完全一致。0.3~0.4あたりで「多少のタイプミス」を許容する
    threshold: 0.35,
    keys: [
        { name: 'title', weight: 0.6 },      // タイトル最優先でヒットさせる
        { name: 'keywords', weight: 0.3 },   // 管理者が設定した類義語タグも重視
        { name: 'description', weight: 0.1 } // 説明文は補助的
    ]
};

let fuseInstance: Fuse<Manual> | null = null;

export const initFuse = (manuals: Manual[]) => {
    fuseInstance = new Fuse(manuals, options);
};

export const searchManuals = (query: string): Manual[] => {
    if (!fuseInstance) return [];
    if (!query) return []; // Empty query

    // itemsプロパティから元のManualオブジェクトを取り出す
    return fuseInstance.search(query).map(result => result.item);
};
