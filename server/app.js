'use strict';

const koa = require('koa');
const serve = require('koa-static');
const routes = require('./routes');
const app = koa();
const port = process.argv[2] || 8000;

// files built to public and served as static files
app.use(serve('public/'));
app.use(routes);

app.listen(port, _ => {
  console.log(`Starting server on port ${port}`);
});
