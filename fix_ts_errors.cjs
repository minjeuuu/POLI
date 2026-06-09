const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('DetailScreen.tsx') || f.endsWith('DetailModal.tsx'));

files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Highlight is named 'detail' instead of 'data'
    if (file === 'HighlightDetailScreen.tsx') {
        content = content.replace(/if \(\!data\) return;/g, 'if (!detail) return;');
        content = content.replace(/data\./g, 'detail.');
        content = content.replace(/data \? data :/g, 'detail ? detail :');
    }

    // playSFX missing
    if (content.includes('playSFX') && !content.includes('import { playSFX }')) {
        content = "import { playSFX } from '../services/soundService';\n" + content;
    }

    fs.writeFileSync(filePath, content);
});

console.log('Fixed typescript issues in Detail Screens.');
