'use client';

import Link from 'next/link';
import { Manual, UserProgress } from '@/lib/types';
import styles from './ManualCard.module.scss';
import clsx from 'clsx';
import { Clock, ListChecks } from 'lucide-react';

type Props = {
    manual: Manual;
    progress?: UserProgress;
};

export default function ManualCard({ manual, progress }: Props) {
    // 進捗計算
    const completedCount = progress?.completedStepIds.length || 0;
    const totalCount = manual.totalSteps; // Manual型にtotalStepsがあると仮定(typesで定義済み)
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const status = progress?.isCompleted
        ? 'completed'
        : (completedCount > 0 ? 'in-progress' : 'not-started');

    return (
        <Link href={`/manual/${manual.id}`} className={styles.card}>
            <div className={styles.header}>
                <span className={clsx(styles.badge, styles[status])}>
                    {status === 'completed' && '完了'}
                    {status === 'in-progress' && '進行中'}
                    {status === 'not-started' && '未着手'}
                </span>
                <span className={styles.category}>{manual.category}</span>
            </div>

            <h3 className={styles.title}>{manual.title}</h3>
            <p className={styles.description}>{manual.description}</p>

            <div className={styles.meta}>
                <div className={styles.metaItem}>
                    <Clock size={14} />
                    <span>{manual.estimatedTime}分</span>
                </div>
                <div className={styles.metaItem}>
                    <ListChecks size={14} />
                    <span>{totalCount} steps</span>
                </div>
            </div>

            <div className={styles.progressBarWrapper}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <span className={styles.progressText}>{completedCount}/{totalCount} steps</span>
            </div>
        </Link>
    );
}
