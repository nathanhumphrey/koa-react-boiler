# Koa React Boiler

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

Isomorphic SSR Exploration Project - Boilerplate to get up and running quickly with Koa and React.

## Limitations

Note, this project is not intended to be used in production as is. It is being developed as an exploratory exercise for implementing isomorphic JavaScript applications via Koa and React. At this time, the project provides ~~only basic~~ support for server-side rendering and development of a React application served via Koa (the original purpose of the project). Future plans to fortify the project include (but are not limited to):

- ~~Routing~~ <span style="color:lightgreen">✓</span> (via [react-router](https://reacttraining.com/react-router/))
- ~~Unit testing~~ <span style="color:lightgreen">✓</span> (via [jest](https://jestjs.io/) and [enzyme](https://airbnb.io/enzyme/))
- ~~Code splitting~~ <span style="color:lightgreen">✓</span> (via [loadable components](https://github.com/gregberge/loadable-components))
- ~~SSR route initial data loading~~ <span style="color:red">✗</span> I've thought about this and reviewed a few implementations. I don't think it's necessary; true, data fetching from within the react component will require a second request but only when the viewed 'page' was the initial one requested by the client. Adding the additional code to support the initial data request seems like a lot of debt to add for minimal gain.

## Installation and Execution

Clone this repo, install the dependencies, and start the server in development mode:

- `$ git clone https://github.com/nathanhumphrey/koa-react-boiler.git`
- `$ cd koa-react-boiler`
- `$ npm i`
- `$ npm run dev` to start the server in development mode [will open a browser tab]

There are also scripts to build and run in production as well:

- `$ npm run build`
- `$ npm start`

## Development

The structure of the project is as follows:

```bash
project/
  |- src/
      |- app/
          |- components/
                     |- Page
                     |- ...
          |- pages/
                |- NoMatch.js
                |- ...
          |- App.js
          |- routes.js
      |- client/
             |- index-node.js
             |- index-web.js
      |- server/
            |- index.js
            |- render-react-app.js
```

### project/src/app

This directory contains all code for the main application; code is shared between the client and the server.

#### routes.js

This file is responsible for defining all required routes for the application. See the file for documentation on how to define a route and several examples. The `routes.js` file is important as it is read by not only the `App` but also the server.

#### App.js

`App.js` is responsible for application-wide routing and is the parent of all application pages and components. Routes are read from `routes.js` and [<Route>](https://reacttraining.com/react-router/web/api/Route) components are mapped to each individual route. This file imports each individual page as a [loadable component](https://loadable-components.com/). There is one static route included, which maps any non-matched path (`*`) to the `pages.NoMatch` page.

When a new page is created, be sure to include the required route in `routes.js` in order for the page to be accessible both server-side and on the client.

#### components/Page

The `Page` component is used as a simple top-level export for pages in the application. Feel free to modify as required.

#### pages/

This directory contains all pages in the application. Define new pages in this directory and export them as unnamed defaults (a limitation of dynamic imports). There are several examples already in this directory:

- `home.js` sample user-defined page
- `about.js` sample user-defined page
- `404.js` currently required NoMatch page (can be removed but must also be removed from `App.js`)

### project/src/client

This directory contains `index-node.js` and `index-web.js`, which are the entry points for building the server and client bundles respectively. You shouldn't have to alter these files.

### project/src/server

This directory contains the server (`index.js`) and SSR module (`render-react-app.js`). The `index.js` file defines configuration settings for both development and production and also defines all routes for the application via the `routes.js` file. The `render-react-app.js` file does exactly what it sounds like, renders the application to HTML to be served by Koa. Currently, `render-react-app.js` defines react and reactDom as CDN scripts for the application, but this could always be undone.

## License

This respository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
