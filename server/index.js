import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import koaWebpack from 'koa-webpack';
import renderReactApp from './render-react-app';

dotenv.config();

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  koaWebpack().then(middleware => {
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

export default app;
