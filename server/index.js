import 'isomorphic-fetch';
import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import koaWebpack from 'koa-webpack';
import renderReactApp from './render-react-app';

dotenv.config();

const { PORT = 3000 } = process.env;

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('../webpack.config.js')[1]; // webpack name:dev config object
  const compiler = webpack(config);
  koaWebpack({ compiler }).then(middleware => {
    app.use(middleware).use(renderReactApp);
  });
} else {
  const router = new Router();
  router.get('/app', renderReactApp);
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(require('koa-static')('static')); // ensure static assets are accessible in production
}

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
