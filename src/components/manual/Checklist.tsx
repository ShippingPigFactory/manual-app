'use client';

import { ChecklistItem } from '@/lib/types';
import styles from './Checklist.module.scss';
import clsx from 'clsx';
import { Check } from 'lucide-react';

type Props = {
    items: ChecklistItem[];
    checkedIds: string[];
    onToggle: (id: string, checked: boolean) => void;
};

export default function Checklist({ items, checkedIds, onToggle }: Props) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                <Check size={20} className={styles.icon} />
                確認事項
            </h3>
            <ul className={styles.list}>
                {items.map((item) => {
                    const isChecked = checkedIds.includes(item.id);
                    return (
                        <li key={item.id} className={clsx(styles.item, isChecked && styles.checked)}>
                            <label className={styles.label}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={isChecked}
                                    onChange={(e) => onToggle(item.id, e.target.checked)}
                                />
                                <span className={styles.text}>{item.text}</span>
                                {item.isRequired && <span className={styles.requiredBadge}>必須</span>}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
