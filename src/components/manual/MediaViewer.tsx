'use client';

import styles from './MediaViewer.module.scss';
import Image from 'next/image';

type Props = {
    url: string;
    type: 'image' | 'video' | 'youtube';
    caption?: string;
};

export default function MediaViewer({ url, type, caption }: Props) {
    if (type !== 'image') {
        return (
            <div className={styles.container}>
                <div className={styles.placeholder}>
                    Video/YouTube not implemented in MVP ({url})
                </div>
                {caption && <p className={styles.caption}>{caption}</p>}
            </div>
        );
    }

    const getImageSrc = (src: string) => {
        if (!src) return '';
        if (src.startsWith('http') || src.startsWith('/')) return src;
        return `/${src}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                {/* Next/Image requires width/height or fill. Using unoptimized for external/mock urls simplification. */}
                <img
                    src={getImageSrc(url)}
                    alt={caption || 'Instruction image'}
                    className={styles.image}
                />
            </div>
            {caption && <p className={styles.caption}>{caption}</p>}
        </div>
    );
}
