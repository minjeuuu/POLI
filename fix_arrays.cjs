const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('DetailScreen.tsx') || f.endsWith('DetailModal.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // We want to replace data.PROPERTY.map with (Array.isArray(data.PROPERTY) ? data.PROPERTY : []).map
  // This Regex will find pattern like: {data.controversies.map
  // or {data.timeline.map
  // or {data.officesHeld.map
  
  // Be careful with new line and spaces 
  content = content.replace(/\{(\w+)\.([a-zA-Z0-9_]+)\.map\(/g, '{(Array.isArray($1.$2) ? $1.$2 : []).map(');
  content = content.replace(/\{(\w+)\.([a-zA-Z0-9_]+)\?\.map\(/g, '{(Array.isArray($1.$2) ? $1.$2 : []).map(');

  fs.writeFileSync(filePath, content);
});
console.log('Fixed array iterations in Detail Screens!');
