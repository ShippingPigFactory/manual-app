'use client';

import { useAppStore } from '@/lib/store';
import { mockManuals } from '@/data/mockData';
import ManualCard from '@/components/dashboard/ManualCard';
import SearchBar from '@/components/search/SearchBar';
import styles from './page.module.scss';
import { Manual } from '@/lib/types';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RECOMMENDED_TAGS = ['入社手続き', 'Wifi接続', 'Slack設定', '経費精算'];

export default function Home() {
  const router = useRouter();
  const { progress, initProgress } = useAppStore(
    useShallow((state) => ({
      progress: state.progress,
      initProgress: state.initProgress,
    }))
  );

  // Hydration mismatch回避のため、マウント後にストアデータを使用するか、
  // あるいは単にuseEffectで初期化を行う。
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 全マニュアルの進捗データを初期化しておく（必要であれば）
    mockManuals.forEach(m => initProgress(m.id));
  }, [initProgress]);

  const handleCreateSearch = (results: Manual[]) => {
    // ヒーロー検索での挙動：結果があれば詳細へ...というよりは
    // 現状はドロップダウンが出るので、そこで遷移してもらう。
    // もしEnterキーでリストページに行きたい場合は別途実装が必要だが
    // MVPではドロップダウン遷移で十分とする。
  };

  const handleTagClick = (tag: string) => {
    // タグクリック時の挙動。
    // 本来は検索結果ページに行くか、検索窓に文字を入れる。
    // ここでは簡易的に検索窓に値を入れたいのだけど、SearchBarがUncontrolledに近い。
    // Query Paramで制御するか、今回はPropがないので省略実装も考えられるが
    // ユーザー体験向上のため、本来は検索結果ページを用意すべき。
    // しかしMVP仕様では検索結果ページがない（各page.tsxの実装リストにない）ため
    // ここではアラートか、あるいは何もしない（実装範囲外）とするのが無難だが、
    // 検索窓フォーカスなどを実装すると親切。
    // 今回はコンソールログのみとしておく。
    console.log(`Tag clicked: ${tag}`);
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          何をお探しですか？
        </h1>
        <div className={styles.heroSearch}>
          <SearchBar
            placeholder="業務名、キーワードで検索..."
            onSearch={handleCreateSearch}
          />
        </div>

        <div className={styles.tagsWrapper}>
          <div className={styles.tagTitle}>おすすめのタグ:</div>
          {RECOMMENDED_TAGS.map(tag => (
            <button
              key={tag}
              className={styles.tagChip}
              onClick={() => handleTagClick(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>すべてのマニュアル</h2>
        <div className={styles.grid}>
          {mockManuals.map((manual) => (
            <ManualCard
              key={manual.id}
              manual={manual}
              progress={mounted ? progress[manual.id] : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
