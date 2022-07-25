const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at port 3000 MAMI VOS PODES!:)'); // eslint-disable-line no-console
  });
});