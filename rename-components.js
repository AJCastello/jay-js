#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'templates');
const templates = fs.readdirSync(templatesDir);

const componentsMap = [
  {
    oldPath: 'components/common/NavBar',
    newPath: 'components/navbar',
    oldImport: /from ["'](.*)\/components\/common\/NavBar["']/g,
    newImport: 'from "$1/components/navbar"'
  }
];

function getFileExtensions(templatePath) {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  return extensions;
}

function updateImportsInFile(filePath, componentMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  const newContent = content.replace(componentMap.oldImport, (match, group1) => {
    updated = true;
    return componentMap.newImport.replace('$1', group1);
  });

  if (updated) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  ✓ Updated imports in: ${path.relative(templatesDir, filePath)}`);
  }

  return updated;
}

function findAndUpdateImports(dir, componentMap) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      findAndUpdateImports(fullPath, componentMap);
    } else if (entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      updateImportsInFile(fullPath, componentMap);
    }
  }
}

function renameComponent(templatePath, componentMap) {
  const srcPath = path.join(templatePath, 'src');
  if (!fs.existsSync(srcPath)) return;

  const extensions = getFileExtensions(templatePath);

  for (const ext of extensions) {
    const oldFilePath = path.join(srcPath, componentMap.oldPath + ext);
    const newFilePath = path.join(srcPath, componentMap.newPath + ext);

    if (fs.existsSync(oldFilePath)) {
      const newDir = path.dirname(newFilePath);
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }

      fs.renameSync(oldFilePath, newFilePath);
      console.log(`  ✓ Moved: ${componentMap.oldPath}${ext} → ${componentMap.newPath}${ext}`);

      const oldCommonDir = path.dirname(oldFilePath);
      if (fs.existsSync(oldCommonDir) && fs.readdirSync(oldCommonDir).length === 0) {
        fs.rmdirSync(oldCommonDir);
        console.log(`  ✓ Removed empty directory: ${path.relative(srcPath, oldCommonDir)}`);
      }

      break;
    }
  }
}

console.log('🔄 Starting component rename process...\n');

for (const template of templates) {
  const templatePath = path.join(templatesDir, template);
  const stat = fs.statSync(templatePath);

  if (!stat.isDirectory()) continue;

  console.log(`📁 Processing template: ${template}`);

  for (const componentMap of componentsMap) {
    renameComponent(templatePath, componentMap);
    findAndUpdateImports(path.join(templatePath, 'src'), componentMap);
  }

  console.log('');
}

console.log('✅ Component rename process completed!');
