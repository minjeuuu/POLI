const fs = require('fs');
const path = require('path');

function processFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Check for "Information currently unavailable or generation failed." inside JSX.
    // E.g. <p>{data.historicalImpact}</p> if historicalImpact is set to this fallback, it doesn't have an "Unknown" check.
    // Since I removed them from the catch blocks, they won't be set! So they will just be undefined.
    
    // We should make sure we don't have things like `<p>undefined</p>` where it expects string.
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
    }
}
