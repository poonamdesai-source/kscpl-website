const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'kscpl-cms', 'src', 'api', 'project', 'content-types', 'project', 'schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (schema.attributes.Status) {
  schema.attributes.ProjectStatus = schema.attributes.Status;
  delete schema.attributes.Status;
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
  console.log('Fixed project status attribute');
}
