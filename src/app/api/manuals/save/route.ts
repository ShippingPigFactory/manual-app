import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Manual, Step } from '@/lib/types';

// Helper to serialize array objects to string
function serializeObject(obj: any): string {
    return JSON.stringify(obj, null, 4);
    // Note: This generates JSON. The plan was Typescript string.
    // JSON is easier. But we need `export const manual = ...` format.
    // So we'll wrap it.
}

export async function POST(request: Request) {
    try {
        const { manual, steps } = await request.json();

        if (!manual || !manual.id) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const manualsDir = path.join(process.cwd(), 'src/data/manuals');
        const fileName = `${manual.id}.ts`;
        const filePath = path.join(manualsDir, fileName);

        // Serialize content
        // Note: Using JSON.stringify ensures valid JS syntax for objects.
        // We just need to prefix "export const ..."
        const fileContent = `import { Manual, Step } from '@/lib/types';

export const manual: Manual = ${serializeObject(manual)};

export const steps: Step[] = ${serializeObject(steps)};
`;

        // Write file
        fs.writeFileSync(filePath, fileContent, 'utf-8');

        // Check if we need to update mockData.ts
        const mockDataPath = path.join(process.cwd(), 'src/data/mockData.ts');
        let mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

        // Check if import already exists
        const safeId = manual.id.replace(/[^a-zA-Z0-9_]/g, '_');
        const importLine = `import * as ${safeId} from './manuals/${manual.id}';`;

        // Simplified logic: If manualId is new, we likely need to append.
        // But manual_005 might need to be added to the array manually in the file logic.
        // Current mockData.ts structure:
        // import ...
        // const allManualsData = [manual001, ...];
        // export const mockManuals ...

        // This is tricky to parse safely with Regex.
        // A simple append strategy for "allManualsData" array:

        if (!mockDataContent.includes(importLine)) {
            // 1. Add import at the top (after last import)
            const lastImportIndex = mockDataContent.lastIndexOf('import ');
            const lastImportEndIndex = mockDataContent.indexOf('\n', lastImportIndex);

            mockDataContent = mockDataContent.slice(0, lastImportEndIndex + 1) +
                importLine + '\n' +
                mockDataContent.slice(lastImportEndIndex + 1);

            // 2. Add to array
            // Find "const allManualsData = ["
            const arrayStart = mockDataContent.indexOf('const allManualsData = [');
            if (arrayStart !== -1) {
                const arrayEnd = mockDataContent.indexOf('];', arrayStart);
                if (arrayEnd !== -1) {
                    const arrayContent = mockDataContent.slice(arrayStart, arrayEnd);
                    // Just insert before the closing bracket
                    // Check if it ends with comma
                    const insertPos = arrayEnd;
                    // Ensure comma if previous element exists
                    // (Rough heuristic: if it doesn't end with [ )
                    const insertion = `, ${safeId}`;

                    mockDataContent = mockDataContent.slice(0, arrayEnd) + insertion + mockDataContent.slice(arrayEnd);
                }
            }

            // Write back mockData
            fs.writeFileSync(mockDataPath, mockDataContent, 'utf-8');
        }

        return NextResponse.json({ success: true, message: 'Saved successfully' });

    } catch (error) {
        console.error('Error saving manual:', error);
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}
