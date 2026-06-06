
export interface VirtualFile {
    name: string;
    type: 'file' | 'directory';
    content?: string;
    children?: VirtualFile[];
    created: string;
}

const INITIAL_FILES: VirtualFile[] = [
    {
        name: 'home',
        type: 'directory',
        created: new Date().toISOString(),
        children: [
            {
                name: 'documents',
                type: 'directory',
                created: new Date().toISOString(),
                children: [
                    { name: 'manifesto.txt', type: 'file', content: 'The future is digital.', created: new Date().toISOString() },
                    { name: 'notes.md', type: 'file', content: '# Research Notes\n- Analyze global trends\n- Update policy', created: new Date().toISOString() }
                ]
            },
            {
                name: 'system',
                type: 'directory',
                created: new Date().toISOString(),
                children: [
                    { name: 'config.json', type: 'file', content: '{ "theme": "dark", "version": "1.0" }', created: new Date().toISOString() }
                ]
            }
        ]
    }
];

class FileSystemService {
    private root: VirtualFile[] = INITIAL_FILES;

    // Simulate async IO
    async listDir(path: string): Promise<VirtualFile[]> {
        return this.root[0].children || []; // Simplified for now
    }

    async readFile(path: string): Promise<string> {
        return "Content loaded.";
    }

    async writeFile(path: string, content: string): Promise<void> {
        console.log(`Wrote to ${path}`);
    }
}

export const fs = new FileSystemService();
