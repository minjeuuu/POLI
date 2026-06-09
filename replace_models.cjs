const fs = require('fs');
const path = require('path');

function replaceInDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDirectory(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            if (content.includes('gemini-3-pro-preview')) {
                content = content.replace(/gemini-3-pro-preview/g, 'gemini-2.5-pro');
                modified = true;
            }
            if (content.includes('gemini-3-flash-preview')) {
                content = content.replace(/gemini-3-flash-preview/g, 'gemini-2.5-flash');
                modified = true;
            }
            if (content.includes('gemini-2.5-pro-preview')) {
                content = content.replace(/gemini-2.5-pro-preview/g, 'gemini-2.5-pro');
                modified = true;
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

replaceInDirectory('./services');
console.log('Models replaced');
