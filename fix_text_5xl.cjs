const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('DetailScreen.tsx') || f.endsWith('DetailModal.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  content = content.replace(/text-5xl/g, 'text-3xl');

  fs.writeFileSync(filePath, content);
});
console.log('Fixed text-5xl arrays and layouts in Detail Screens!');
