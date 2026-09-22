const fs = require('fs');
const path = require('path');

const indexTsPath = path.join(__dirname, '..', 'kscpl-cms', 'src', 'index.ts');
let content = fs.readFileSync(indexTsPath, 'utf8');

// We will inject a token creation logic in bootstrap
const tokenLogic = `
    const tokenService = strapi.plugin('admin').service('api-token');
    const existingTokens = await tokenService.list();
    if (!existingTokens.find(t => t.name === 'Frontend-Token')) {
      const token = await tokenService.create({
        name: 'Frontend-Token',
        description: 'Read-only token for Next.js',
        type: 'read-only',
        lifespan: null
      });
      console.log('--- GENERATED API TOKEN ---');
      console.log(token.accessKey);
      console.log('---------------------------');
    }
`;

// Insert the token logic at the beginning of bootstrap
content = content.replace("console.log('--- STARTING SEEDING PROCESS ---');", "console.log('--- STARTING SEEDING PROCESS ---');\n" + tokenLogic);

fs.writeFileSync(indexTsPath, content);
console.log('Injected token generation logic');
