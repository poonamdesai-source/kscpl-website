const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'kscpl-cms', 'src', 'api');

// Rename the entire api/news folder to api/news-article
const oldDir = path.join(baseDir, 'news');
const newDir = path.join(baseDir, 'news-article');

if (fs.existsSync(oldDir)) {
  fs.renameSync(oldDir, newDir);
}

// Rename content-types/news to content-types/news-article
const oldCtDir = path.join(newDir, 'content-types', 'news');
const newCtDir = path.join(newDir, 'content-types', 'news-article');
if (fs.existsSync(oldCtDir)) {
  fs.renameSync(oldCtDir, newCtDir);
}

// Rename files in controllers, routes, services
['controllers', 'routes', 'services'].forEach(folder => {
  const fileDir = path.join(newDir, folder);
  if (fs.existsSync(path.join(fileDir, 'news.ts'))) {
    fs.renameSync(path.join(fileDir, 'news.ts'), path.join(fileDir, 'news-article.ts'));
    
    // Update content of the file
    let content = fs.readFileSync(path.join(fileDir, 'news-article.ts'), 'utf8');
    content = content.replace(/'api::news\.news'/g, "'api::news-article.news-article'");
    fs.writeFileSync(path.join(fileDir, 'news-article.ts'), content);
  }
});

console.log('Fixed news-article rename');
