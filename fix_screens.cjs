const fs = require('fs');
const path = require('path');

function processFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. In catch blocks, remove the explicit `year: "Unknown"` etc. settings setting them to Unknown so they are undefined instead.
    content = content.replace(/year:\s*"Unknown",/g, '');
    content = content.replace(/country:\s*"Unknown",/g, '');
    content = content.replace(/origin:\s*"Unknown",/g, '');
    content = content.replace(/dateSigned:\s*"Unknown",/g, '');
    
    // Some historical impact fallbacks
    // "Information currently unavailable or generation failed."

    // 2. We need to conditionally render elements like:
    // <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Est. {data.year}</span>
    // I can do a regex loop to replace these text values...
    
    // Instead of regex hacking JSX, maybe I just find patterns of:
    // <span ...> ... {data.year}</span>
    // Let's replace `{data.year || "Unknown"}` with `{data.year}` everywhere first.
    content = content.replace(/\{data\.year \|\| "Unknown"\}/g, "{data.year}");
    content = content.replace(/\{\(data as any\)\.casualties \|\| "Unknown"\}/g, "{(data as any).casualties}");
    content = content.replace(/\{\(data as any\)\.weather \|\| "N\/A"\}/g, "{(data as any).weather}");
    
    // and `{data.capital?.[0] || 'N/A'}`
    content = content.replace(/\|\|\s*"N\/A"/g, '');
    content = content.replace(/\|\|\s*'N\/A'/g, '');
    content = content.replace(/\|\|\s*"Unknown"/g, '');
    content = content.replace(/\|\|\s*'Unknown'/g, '');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed simple fallbacks in: ' + file);
    }
}

function walkDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('DetailScreen.tsx') || fullPath.endsWith('Widget.tsx') || fullPath.endsWith('Profile.tsx') || fullPath.endsWith('Grid.tsx') || fullPath.endsWith('View.tsx')) {
            processFile(fullPath);
        }
    });
}

walkDir('./components');
