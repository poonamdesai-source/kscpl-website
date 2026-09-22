const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '..', 'kscpl-cms', 'src', 'api');

const schemas = {
  'home-page': {
    kind: 'singleType',
    collectionName: 'home_pages',
    info: { singularName: 'home-page', pluralName: 'home-pages', displayName: 'Home Page' },
    options: { draftAndPublish: true },
    pluginOptions: {},
    attributes: {
      heroTitle: { type: 'string' },
      heroSubtitle: { type: 'text' },
      heroImage: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
      aboutTitle: { type: 'string' },
      aboutContent: { type: 'text' },
      aboutImage: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
      ctaTitle: { type: 'string' },
      ctaButtonText: { type: 'string' },
      ctaButtonLink: { type: 'string' },
      ctaImage: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] }
    }
  },
  'about-page': {
    kind: 'singleType',
    collectionName: 'about_pages',
    info: { singularName: 'about-page', pluralName: 'about-pages', displayName: 'About Page' },
    options: { draftAndPublish: true },
    pluginOptions: {},
    attributes: {
      bannerTitle: { type: 'string' },
      bannerSubtitle: { type: 'string' },
      introTitle: { type: 'string' },
      introContent1: { type: 'text' },
      introContent2: { type: 'text' },
      introImage: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
      managementTitle: { type: 'string' },
      managementSubtitle: { type: 'string' },
      chairmanName: { type: 'string' },
      chairmanTitle: { type: 'string' },
      chairmanDescription: { type: 'text' }
    }
  },
  'contact-page': {
    kind: 'singleType',
    collectionName: 'contact_pages',
    info: { singularName: 'contact-page', pluralName: 'contact-pages', displayName: 'Contact Page' },
    options: { draftAndPublish: true },
    pluginOptions: {},
    attributes: {
      connectTitle: { type: 'string' },
      connectSubtitle: { type: 'string' },
      companyName: { type: 'string' },
      addressLine1: { type: 'string' },
      addressLine2: { type: 'string' },
      pinCode: { type: 'string' },
      email: { type: 'string' },
      mapUrl: { type: 'text' },
      inquiryTitle: { type: 'string' },
      inquirySubtitle: { type: 'string' },
      inquiryImage: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] }
    }
  },
  'architect': {
    kind: 'collectionType',
    collectionName: 'architects',
    info: { singularName: 'architect', pluralName: 'architects', displayName: 'Architects' },
    options: { draftAndPublish: true },
    pluginOptions: {},
    attributes: {
      Name: { type: 'string' },
      DisplayOrder: { type: 'integer' },
      Active: { type: 'boolean', default: true }
    }
  },
  'project': {
    kind: 'collectionType',
    collectionName: 'projects',
    info: { singularName: 'project', pluralName: 'projects', displayName: 'Projects' },
    options: { draftAndPublish: true },
    pluginOptions: {},
    attributes: {
      ProjectName: { type: 'string' },
      Slug: { type: 'uid', targetField: 'ProjectName' },
      ShortDescription: { type: 'text' },
      FullDescription: { type: 'richtext' },
      FeaturedImage: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
      Gallery: { type: 'media', multiple: true, required: false, allowedTypes: ['images'] },
      Location: { type: 'string' },
      ProjectType: { type: 'enumeration', enum: ['Residential', 'Commercial', 'Infrastructure'] },
      Status: { type: 'enumeration', enum: ['Completed', 'Ongoing', 'Upcoming'] },
      DisplayOrder: { type: 'integer' },
      Featured: { type: 'boolean', default: false }
    }
  },
  'news': {
    kind: 'collectionType',
    collectionName: 'news',
    info: { singularName: 'news', pluralName: 'news', displayName: 'News' },
    options: { draftAndPublish: true },
    pluginOptions: {},
    attributes: {
      Title: { type: 'string' },
      Slug: { type: 'uid', targetField: 'Title' },
      ShortDescription: { type: 'text' },
      Content: { type: 'richtext' },
      FeaturedImage: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
      PublishedDate: { type: 'date' }
    }
  },
  'management-member': {
    kind: 'collectionType',
    collectionName: 'management_members',
    info: { singularName: 'management-member', pluralName: 'management-members', displayName: 'Management Members' },
    options: { draftAndPublish: true },
    pluginOptions: {},
    attributes: {
      Name: { type: 'string' },
      Designation: { type: 'string' },
      ProfileImage: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
      Description: { type: 'text' },
      DisplayOrder: { type: 'integer' }
    }
  }
};

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

for (const [name, schema] of Object.entries(schemas)) {
  const baseDir = path.join(apiDir, name);
  const contentTypesDir = path.join(baseDir, 'content-types', name);
  const controllersDir = path.join(baseDir, 'controllers');
  const routesDir = path.join(baseDir, 'routes');
  const servicesDir = path.join(baseDir, 'services');

  makeDir(contentTypesDir);
  makeDir(controllersDir);
  makeDir(routesDir);
  makeDir(servicesDir);

  // Schema
  fs.writeFileSync(path.join(contentTypesDir, 'schema.json'), JSON.stringify(schema, null, 2));

  const controllerTpl = "import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('api::" + name + "." + name + "');\n";
  fs.writeFileSync(path.join(controllersDir, name + ".ts"), controllerTpl);

  // Route
  const routeTpl = "import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('api::" + name + "." + name + "');\n";
  fs.writeFileSync(path.join(routesDir, name + ".ts"), routeTpl);

  // Service
  const serviceTpl = "import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('api::" + name + "." + name + "');\n";
  fs.writeFileSync(path.join(servicesDir, name + ".ts"), serviceTpl);

  console.log("Scaffolded " + name);
}
