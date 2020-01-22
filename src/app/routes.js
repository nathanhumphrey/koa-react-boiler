/*
 * Define application routes here. All routes must support the following:
 *
 * - title - the value to use in navigation display
 * - path -  the URL path for the route
 * - method - the HTTP method for handling the route
 * - page - the application page to serve for the route (see app/pages)
 * - key - required key property for mapped list components, should be unique among pages
 * - nav - boolean to determine if the route should be included in navigation (default true)
 * - [exact] - boolean to determine if an exact match is required (left here for developer to decide)
 * - [loadData] - if initial data are required, provide method to fetch here
 */

import * as pages from './pages';

const siteTitle = 'Koa React App - ';

const routes = [
  {
    title: `${siteTitle} Home`,
    linkText: 'Home',
    path: '/',
    method: 'get',
    page: pages.Home,
    key: '/',
    exact: true,
    nav: true,
    loadData: () => 'some data'
  },
  {
    title: `${siteTitle} About`,
    linkText: 'About',
    path: '/about',
    method: 'get',
    page: pages.About,
    nav: true,
    key: '/about'
  },
  {
    title: `${siteTitle} 404`,
    linkText: '404',
    path: '*',
    method: 'get',
    page: pages.NoMatch,
    key: '/404',
    nav: false
  }
];
export { routes };
