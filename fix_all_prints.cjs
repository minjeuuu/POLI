const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('DetailScreen.tsx') || f.endsWith('DetailModal.tsx'));

const newHandleDownload = `
  const handleDownload = () => {
      if (typeof playSFX === 'function') playSFX('click');
      if (!data) return;
      try {
          const sections = [];
          
          if (data.bio) sections.push({ title: "Biography", content: data.bio });
          if (data.biography) sections.push({ title: "Biography", content: data.biography });
          if (data.overview) sections.push({ title: "Overview", content: data.overview });
          if (data.historicalImpact) sections.push({ title: "Historical Impact", content: data.historicalImpact });
          if (data.context) sections.push({ title: "Context", content: data.context });
          if (data.earlyLife) sections.push({ title: "Early Life", content: data.earlyLife });
          if (data.ideology) sections.push({ title: "Ideology", content: data.ideology });
          if (data.legacy) sections.push({ title: "Legacy", content: data.legacy });
          
          Object.entries(data).forEach(([key, val]) => {
              const ignoreKeys = ["name", "type", "imageUrl", "bio", "biography", "overview", "historicalImpact", "context", "earlyLife", "ideology", "legacy", "role", "country", "era", "year", "location"];
              if (ignoreKeys.includes(key) || !val) return;
              
              const title = key.replace(/([A-Z])/g, ' $1').toUpperCase();
              
              if (typeof val === 'string' && val.length > 20) {
                  sections.push({ title, content: val });
              } else if (Array.isArray(val) && val.length > 0) {
                  if (typeof val[0] === 'string') {
                      sections.push({ title, content: val });
                  } else if (typeof val[0] === 'object') {
                      sections.push({ title, content: val.map(v => JSON.stringify(v).replace(/[{}"]/g, '').replace(/:/g, ': ')) });
                  }
              } else if (typeof val === 'object' && !Array.isArray(val)) {
                  const arr = [];
                  Object.entries(val).forEach(([k, v]) => {
                      if (typeof v === 'string') arr.push(\`\${k.toUpperCase()}: \${v}\`);
                      else if (Array.isArray(v)) arr.push(\`\${k.toUpperCase()}: \${v.join(', ')}\`);
                  });
                  if (arr.length > 0) sections.push({ title, content: arr });
              }
          });

          generateAestheticPDF(
              data.name || "Dossier",
              data.type || data.role || data.country || "Intelligence Record",
              data.shortBio || data.bio?.substring(0, 100) || data.overview?.substring(0, 100) || "Fact Sheet",
              sections,
              \`\${(data.name || "Document").replace(/\\s+/g, '_')}_Dossier.pdf\`
          );
      } catch (err) {
          console.error("PDF generation failed:", err);
      }
  };
`;

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Need to ensure generateAestheticPDF is imported
  if (!content.includes('generateAestheticPDF')) {
      content = content.replace(/import React/, "import { generateAestheticPDF } from '../utils/pdfGenerator';\nimport React");
  }
  // Optional playSFX check
  if (!content.includes('playSFX')) {
      // Just ignore, the function checks typeof playSFX === 'function'
  }

  // If there's an existing handleDownload, replace it
  const dlMatch = content.match(/const handleDownload = \(\) => {[\s\S]*?generateAestheticPDF\([\s\S]*?\);[\s\S]*?}[\s\S]*?};/);
  if (dlMatch) {
      content = content.replace(dlMatch[0], newHandleDownload.trim());
  } else {
      // If there isn't one, we find handlePrint
      const printMatch = content.match(/const handlePrint = \(\) => {\s*window\.print\(\);\s*};/);
      if (printMatch) {
          content = content.replace(printMatch[0], newHandleDownload.trim());
      } else {
        // Insert right after the first useEffect or right before the return statements
        const insertPoint = content.indexOf('if (loading');
        if (insertPoint !== -1) {
            content = content.slice(0, insertPoint) + newHandleDownload + '\n    ' + content.slice(insertPoint);
        }
      }
  }

  // Replace all window.print() inside onClick handlers to handleDownload()
  content = content.replace(/onClick=\{\(\) => window\.print\(\)\}/g, 'onClick={handleDownload}');
  content = content.replace(/onClick=\{handlePrint\}/g, 'onClick={handleDownload}');

  fs.writeFileSync(filePath, content);
});

console.log('PDF logic replaced in Detail Screens');
