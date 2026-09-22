const fs = require('fs');
const path = require('path');

const indexTsPath = path.join(__dirname, '..', 'kscpl-cms', 'src', 'index.ts');

const content = `
import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
`;

fs.writeFileSync(indexTsPath, content);
console.log('Restored index.ts');
