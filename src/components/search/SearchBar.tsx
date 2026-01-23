'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { initFuse, searchManuals } from '@/lib/search';
import { mockManuals } from '@/data/mockData';
import { Manual } from '@/lib/types';
import Link from 'next/link';
import styles from './SearchBar.module.scss';
import clsx from 'clsx';

type Props = {
    className?: string;
    placeholder?: string;
    onSearch?: (results: Manual[]) => void;
    showResults?: boolean; // 結果をドロップダウンで表示するかどうか
};

export default function SearchBar({
    className,
    placeholder = "マニュアルを検索...",
    onSearch,
    showResults = true
}: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Manual[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 初回のみFuse初期化
    useEffect(() => {
        initFuse(mockManuals);
    }, []);

    useEffect(() => {
        const hitManuals = searchManuals(query);
        setResults(hitManuals);
        if (onSearch) {
            onSearch(hitManuals);
        }
    }, [query, onSearch]);

    // クリック外で閉じる
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={clsx(styles.container, className)} ref={containerRef}>
            <div className={styles.inputWrapper}>
                <Search className={styles.icon} size={20} />
                <input
                    type="text"
                    className={styles.input}
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                />
            </div>

            {showResults && isFocused && query.length > 0 && results.length > 0 && (
                <div className={styles.resultsDropdown}>
                    {results.map((manual) => (
                        <Link
                            key={manual.id}
                            href={`/manual/${manual.id}`}
                            className={styles.resultItem}
                            onClick={() => setIsFocused(false)}
                        >
                            <div className={styles.resultTitle}>{manual.title}</div>
                            <div className={styles.resultMeta}>
                                <span className={styles.category}>{manual.category}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
