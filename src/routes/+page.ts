import type { Root } from './wapJson';

export interface PageData {
    pageData: {
        handleFileUpload: (event: Event) => Promise<Root>;
        saveJson: () => void;
    }
}

export const load = (): PageData => {
    let currentRoot: Root | null = null;

    return {
        pageData: {
            handleFileUpload: async (event: Event) => {
                const input = event.target as HTMLInputElement;
                const file = input.files?.[0];
                
                if (!file) {
                    throw new Error('No file selected');
                }

                try {
                    const text = await file.text();
                    const json = JSON.parse(text);
                    currentRoot = json as Root;
                    return currentRoot;
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    throw new Error('Invalid JSON file');
                }
            },
            saveJson: () => {
                if (!currentRoot) {
                    alert('No data to save');
                    return;
                }

                const jsonString = JSON.stringify(currentRoot, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = 'authoringToolz.json';
                document.body.appendChild(a);
                a.click();
                
                // Cleanup
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        }
    };
};
