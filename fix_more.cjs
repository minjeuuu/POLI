const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('DetailScreen.tsx') || f.endsWith('DetailModal.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Deep map replacement eg: data.psychologicalProfile.traits?.map(
  // Let's just do a blanket find for anything before .map or ?.map inside JSX {} that could be an array.
  // Actually, let's target the exact ones we see
  content = content.replace(/\{data\.psychologicalProfile\.traits\?\.map\(/g, '{(Array.isArray(data.psychologicalProfile.traits) ? data.psychologicalProfile.traits : []).map(');
  content = content.replace(/\{data\.mediaPresence\.interviews\?\.map\(/g, '{(Array.isArray(data.mediaPresence.interviews) ? data.mediaPresence.interviews : []).map(');
  content = content.replace(/\{data\.mediaPresence\.speeches\?\.map\(/g, '{(Array.isArray(data.mediaPresence.speeches) ? data.mediaPresence.speeches : []).map(');
  content = content.replace(/\{\(data as any\)\.allies\?\.map\(/g, '{(Array.isArray((data as any).allies) ? (data as any).allies : []).map(');
  content = content.replace(/\{\(data as any\)\.rivals\?\.map\(/g, '{(Array.isArray((data as any).rivals) ? (data as any).rivals : []).map(');
  
  // also fix grids
  content = content.replace(/grid grid-cols-1 md:grid-cols-3 gap-8/g, 'flex flex-col gap-8');
  content = content.replace(/md:col-span-2/g, '');
  content = content.replace(/md:col-span-1/g, '');

  fs.writeFileSync(filePath, content);
});
console.log('Fixed more arrays and layouts in Detail Screens!');
