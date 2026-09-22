const fs = require('fs');
const path = require('path');

const indexTsPath = path.join(__dirname, '..', 'kscpl-cms', 'src', 'index.ts');
let content = fs.readFileSync(indexTsPath, 'utf8');

// replace .count() with .count({})
content = content.replace(/\.count\(\)/g, '.count({})');

fs.writeFileSync(indexTsPath, content);
console.log('Fixed typescript errors in index.ts');
