const fs = require('fs');
const path = require('path');

function replaceInDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            // Patterns
            const patterns = [
                'fixed inset-0 top-16 z-[60]',
                'fixed inset-0 top-16 z-[70]',
                'fixed inset-0 top-16 z-40'
            ];

            for (const p of patterns) {
                if (content.includes(p)) {
                    content = content.split(p).join('h-full w-full relative');
                    modified = true;
                }
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed', fullPath);
            }
        }
    }
}

replaceInDirectory('./components');
console.log('Classes replaced');
