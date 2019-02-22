import dotenv from 'dotenv';
import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import renderReactApp from './render-react-app';

dotenv.config();

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  koaWebpack()
    .then(middleware => {
      app.use(middleware);
    })
    .then(() => {
      app.use(renderReactApp);
    });
} else {
  app.use(require('koa-static')('static')); // ensure static assets are accessible in production
  app.use(renderReactApp);
}

export default app;
