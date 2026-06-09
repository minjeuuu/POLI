const fs = require('fs');
const path = require('path');

function processFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/(<div[^>]*>\s*<h[3-4][^>]*>.*?Notable Alumni.*?<\/h[3-4]>\s*<ul[^>]*>\s*\{\(Array\.isArray\(data\.notableAlumni\)[^}]*\}\s*<\/ul>\s*<\/div>)/g, "{data.notableAlumni?.length > 0 && (\n$1\n)}");
    content = content.replace(/(<div[^>]*>\s*<h[3-4][^>]*>.*?Key Focus Areas.*?<\/h[3-4]>\s*<div[^>]*>\s*\{\(Array\.isArray\(data\.focusAreas\)[^}]*\}\s*<\/div>\s*<\/div>)/g, "{data.focusAreas?.length > 0 && (\n$1\n)}");
    content = content.replace(/(<div[^>]*>\s*<h[3-4][^>]*>.*?Notable Directors.*?<\/h[3-4]>\s*<ul[^>]*>\s*\{\(Array\.isArray\(data\.keyFigures\)[^}]*\}\s*<\/ul>\s*<\/div>)/g, "{data.keyFigures?.length > 0 && (\n$1\n)}");
    content = content.replace(/(<div[^>]*>\s*<h[3-4][^>]*>.*?Core Focus.*?<\/h[3-4]>\s*<ul[^>]*>\s*\{\(Array\.isArray\(data\.coreFocus\)[^}]*\}\s*<\/ul>\s*<\/div>)/g, "{data.coreFocus?.length > 0 && (\n$1\n)}");

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
