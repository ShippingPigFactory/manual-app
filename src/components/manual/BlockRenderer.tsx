'use client';

import { Block, ChecklistItem } from '@/lib/types';
import Checklist from './Checklist';
import MediaViewer from './MediaViewer';
import styles from './BlockRenderer.module.scss';

type Props = {
    block: Block;
    checkedItems: string[];
    onToggle: (itemId: string, checked: boolean) => void;
};

export default function BlockRenderer({ block, checkedItems, onToggle }: Props) {
    switch (block.type) {
        case 'text':
            return (
                <div
                    className={styles.textBlock}
                    dangerouslySetInnerHTML={{ __html: block.content }}
                />
            );
        case 'image':
            return (
                <div className={styles.imageBlock}>
                    <MediaViewer
                        url={block.url}
                        type="image"
                        caption={block.caption}
                    />
                </div>
            );
        case 'checklist':
            return (
                <div className={styles.checklistBlock}>
                    <Checklist
                        items={block.items}
                        checkedIds={checkedItems}
                        onToggle={onToggle}
                    />
                </div>
            );
        default:
            return null;
    }
}
