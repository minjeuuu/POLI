const fs = require('fs');

const file = 'components/GenericKnowledgeScreen.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/fixed inset-0 z-\[70\]/g, 'h-full w-full relative');
fs.writeFileSync(file, content);
