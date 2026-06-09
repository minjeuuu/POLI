const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('DetailScreen.tsx') || f.endsWith('DetailModal.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove imports
  content = content.replace(/^import\s+{[^}]*Widget[^}]*}\s+from\s+['"]\.\/external\/[^'"]+['"];\r?\n/gm, '');

  // Remove JSX usage (simple single line mostly)
  content = content.replace(/<[A-Za-z]+Widget[^>]*\/>\r?\n?/g, '');
  
  // What about multiline widget tags?
  content = content.replace(/<[A-Za-z]+Widget[\s\S]*?\/>\r?\n?/g, '');

  fs.writeFileSync(filePath, content);
});
console.log('Widgets removed from DetailScreens.');
