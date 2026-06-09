const fs = require('fs');
const path = require('path');

function processFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // We do a regex replace to conditionally render the spans and divs if the data exists.
    // E.g. <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {data.year}</span>
    
    // There are some standard blocks. Let's do it simply:
    // {data.motto && <p ...>"{data.motto}"</p>}
    // <span ...><Clock /> Est. {data.year}</span> -> {data.year && <span ...><Clock /> Est. {data.year}</span>}
    content = content.replace(/(<span[^>]*><Clock[^>]*\/>\s*(Est\.\s*)?\{data\.year\}<\/span>)/g, "{data.year && $1}");

    content = content.replace(/(<span[^>]*><MapPin[^>]*\/>\s*\{data\.location\}<\/span>)/g, "{data.location && $1}");
    content = content.replace(/(<span[^>]*><MapPin[^>]*\/>\s*\{data\.country\}<\/span>)/g, "{data.country && $1}");

    // Also wrap the bullets:
    // <span className="hidden sm:inline">•</span>
    // This is hard to conditionally render without wrapping the whole set, but the easy way is to wrap it all:
    // Better: let's just do a blanket find-and-replace for the full header block across all screens.
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
    }
}

function walkDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('DetailScreen.tsx')) {
            processFile(fullPath);
        }
    });
}

walkDir('./components');
