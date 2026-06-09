const fs = require('fs');
const path = require('path');

function processFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // We can conditionally render the h3 and p tags!
    content = content.replace(/(<h[3-4][^>]*>.*?Geopolitical.*?<\/h[3-4]>\s*<p[^>]*>\{data\.historicalImpact\}<\/p>)/g, "{data.historicalImpact && (\n<>$1</>\n)}");
    content = content.replace(/(<h[3-4][^>]*>.*?Academic Overview.*?<\/h[3-4]>\s*<p[^>]*>\{data\.overview\}<\/p>)/g, "{data.overview && (\n<>$1</>\n)}");
    
    // Add same for Biography, Early Life, Legacy, Environment, etc.
    content = content.replace(/(<h[3-4][^>]*>.*?Biography.*?<\/h[3-4]>\s*<p[^>]*>\{data\.(bio|biography)\}<\/p>)/g, "{(data.$2) && (\n<>$1</>\n)}");
    content = content.replace(/(<h[3-4][^>]*>.*?Early Life.*?<\/h[3-4]>\s*<p[^>]*>\{data\.earlyLife\}<\/p>)/g, "{data.earlyLife && (\n<>$1</>\n)}");
    
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
