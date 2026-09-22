const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'kscpl-cms', 'src', 'api', 'news', 'content-types', 'news', 'schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
schema.info.singularName = 'news-article';
schema.info.pluralName = 'news-articles';
fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
console.log('Fixed news schema');
