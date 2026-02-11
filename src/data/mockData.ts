import { Manual, Step } from '@/lib/types';
import * as manual001 from './manuals/manual_001';
import * as manual002 from './manuals/manual_002';
import * as manual003 from './manuals/manual_003';
import * as manual004 from './manuals/manual_004';
import * as manual_004 from './manuals/manual_004';

const allManualsData = [manual001, manual002, manual003, manual004, manual_004];

export const mockManuals: Manual[] = allManualsData.map(m => m.manual);

export const mockSteps: Record<string, Step[]> = allManualsData.reduce((acc, m) => {
    acc[m.manual.id] = m.steps;
    return acc;
}, {} as Record<string, Step[]>);

// Force update check
