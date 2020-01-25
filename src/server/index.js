import path from 'path';
import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import koaWebpack from 'koa-webpack';
import koaStatic from 'koa-static';
import renderReactApp from './render-react-app';
import { routes } from '../app/routes';

dotenv.config();
const { PORT = 3000 } = process.env;

const app = new Koa();

if (process.env.NODE_ENV !== 'production') {
  // development configuration with webpack
  const getWebpack = async () => {
    return [await import('../../webpack.config.js'), await import('webpack')];
  };

  getWebpack().then(([webpackConfig, webpack]) => {
    const compiler = webpack.default(webpackConfig.default);

    koaWebpack({
      compiler,
      devMiddleware: {
        logLevel: 'silent',
        publicPath: '/dist/web',
        writeToDisk(filePath) {
          return (
            /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath)
          );
        }
      }
    }).then(middleware => {
      app.use(middleware);
    });
  });
}

const router = new Router();

routes.map(route => {
  router[route.method](route.path, renderReactApp);
});

// custom error handler routing
app.use(async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;
    if (ctx.status === 404) {
      // TODO: update for generic client errors
      await renderReactApp(ctx);
    } else {
      // TODO: update for generic server errors
      await renderReactApp(ctx);
    }
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaStatic(path.join(__dirname, '../../public')));

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
