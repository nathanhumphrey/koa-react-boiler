import 'isomorphic-fetch';
import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import koaWebpack from 'koa-webpack';
import renderReactApp from './render-react-app';
import { routes } from '../app/routes';

dotenv.config();
const { PORT = 3000 } = process.env;

const app = new Koa();

if (process.env.NODE_ENV === 'production') {
  const router = new Router();
  routes.map(route => {
    router[route.method](route.path, renderReactApp);
  });
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(require('koa-static')('static'));
} else {
  // development
  const webpack = require('webpack');
  const config = require('../../webpack.config.js')(process.env, {
    mode: 'development'
  });
  const compiler = webpack(config);
  koaWebpack({ compiler }).then(middleware => {
    app.use(middleware).use(renderReactApp);
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
