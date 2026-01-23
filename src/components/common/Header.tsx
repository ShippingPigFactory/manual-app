'use client';

import Link from 'next/link';
import SearchBar from '../search/SearchBar';
import styles from './Header.module.scss';
import { LayoutDashboard, Settings } from 'lucide-react';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo}>
                        <LayoutDashboard size={24} color="var(--primary-color)" />
                        <span className={styles.logoText}>Onboarding App</span>
                    </Link>
                </div>

                <div className={styles.center}>
                    <SearchBar className={styles.searchBar} placeholder="キーワードで検索 (例: 経費, Wifi...)" />
                </div>

                <div className={styles.right}>
                    <Link href="/admin" className={styles.adminLink}>
                        <Settings size={18} />
                        <span>管理者モード</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
