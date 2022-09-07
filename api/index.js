const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3002, () => {
    console.log('%s listening at port 3002 MAMI VOS PODES!:)'); // eslint-disable-line no-console
  });
});