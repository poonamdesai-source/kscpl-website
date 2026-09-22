const strapi = require('@strapi/strapi');
(async () => {
  const app = await strapi().load();
  try {
    const tokenService = app.service('admin::api-token');
    const token = await tokenService.create({
      name: 'Frontend-Token',
      description: 'Read-only token for Next.js',
      type: 'read-only',
      lifespan: null
    });
    console.log('--- GENERATED API TOKEN ---');
    console.log(token.accessKey);
    console.log('---------------------------');
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
})();
