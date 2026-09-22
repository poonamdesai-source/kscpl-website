const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'kscpl-cms', '.tmp', 'data.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Get the id for the Public role
  db.get("SELECT id FROM up_roles WHERE type = 'public'", (err, row) => {
    if (err) throw err;
    const roleId = row.id;

    // Check if permission exists
    db.get("SELECT id FROM up_permissions WHERE action = 'api::architect.architect.find' AND role_id = ?", [roleId], (err, permRow) => {
      if (err) throw err;
      if (!permRow) {
        db.run("INSERT INTO up_permissions (action, role_id) VALUES ('api::architect.architect.find', ?)", [roleId], (err) => {
          if (err) throw err;
          console.log('Granted public access to architect.find');
        });
      } else {
        console.log('Public access already granted to architect.find');
      }
    });
  });
});
