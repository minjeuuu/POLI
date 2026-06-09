import fs from 'fs';

const content = fs.readFileSync('data/personsData.ts', 'utf-8');
const lines = content.split('\n');

// Find the line where "Additional Historical Figures" or "Science & Technology" was added
let endIdx = lines.findIndex(line => line.includes('createFolder("Science & Technology"'));
if (endIdx === -1) {
    endIdx = lines.findIndex(line => line.includes('name: "Additional Historical Figures"'));
}

if (endIdx !== -1) {
    // Also remove the preceding `    },` or `    createFolder(` if needed
    // Look backwards for the end of the previous object
    for (let i = endIdx - 1; i >= 0; i--) {
        if (lines[i].trim() === '},' || lines[i].trim() === ']' || lines[i].trim() === '],') {
            endIdx = i + 1;
            break;
        }
    }
    const original = lines.slice(0, endIdx).join('\n') + '\n];\nexport const PERSONS_DATA: PersonCategory[] = [];\n';
    fs.writeFileSync('temp_original.ts', original);
    console.log(`Saved original up to line ${endIdx}`);
} else {
    console.log("Could not find insertion point.");
}

