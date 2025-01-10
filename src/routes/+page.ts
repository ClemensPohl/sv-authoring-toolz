import type { Root } from './wapJson';
import type { Root as RootJson } from './wapJson';

export interface PageData {
    pageData: {
        createNewJson: () => void;
        handleFileUpload: (event: Event) => Promise<Root>;
        saveJson: (currentData: Root) => void;
        handleVideoUpload: (i: number, root: RootJson | null) => void;
    }
}

export const load = (): PageData => {
    let currentRoot: Root | null = null;

    return {
        pageData: {
            createNewJson: () => {
                currentRoot = {
                    description: {
                        context: '',
                        date: new Date().toISOString().split('T')[0],
                        furtherContent: []
                    },
                    content: [{
                        context: '',
                        chapter: '',
                        mainvideo: '',
                        ressources: [],
                        sidetexts: [],
                        quiz: [],
                        clickables: [],
                        podcast: []
                    }]
                };
                return currentRoot;
            },
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
            saveJson: (currentData: Root) => {

                const jsonString = JSON.stringify(currentData, null, 2);
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
            },
            handleVideoUpload: (i: number, root: RootJson | null) => {
                const vplayer = document.getElementById(`vplayer-${i}`) as HTMLVideoElement;
                const vfile = document.getElementById(`videoFile-${i}`) as HTMLInputElement;
                const vurl = document.getElementById(`video-url-${i}`) as HTMLInputElement;
                
                if (!vplayer || !vfile || !vfile.files?.length) {
                    alert('Please select a video file first');
                    return;
                }

                // Revoke any existing object URL to prevent memory leaks
                if (vplayer.src) {
                    URL.revokeObjectURL(vplayer.src);
                }

                const file = vfile.files[0];
                // Validate file type
                if (!file.type.startsWith('video/')) {
                    alert('Please select a valid video file');
                    return;
                }

                vplayer.src = URL.createObjectURL(file);

                // Update the mainVideo path with the file name
                if (root && root.content[i]) {
                    vurl.value = vfile.files[0].name;
                    root.content[i].mainvideo = vurl.value;
                }
            }
        }
    };
};

