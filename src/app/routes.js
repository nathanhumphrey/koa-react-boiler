/*
 * Define application routes here. All routes must support the following:
 *
 * - title - the value to use in navigation display
 * - path -  the URL path for the route
 * - method - the HTTP method for handling the route
 * - page - the application page to serve for the route (see app/pages)
 * - key - required key property for mapped list components, should be unique among pages
 * - [exact] - boolean to determine if an exact match is required (left here for developer to decide)
 * - [loadData] - if initial data are required, provide method to fetch here
 */

import { Index } from './pages/index';
import { About } from './pages/about';
import { Service } from './pages/service';

const routes = [
  {
    title: 'Home',
    path: '/',
    method: 'get',
    page: Index,
    key: '/',
    exact: true,
    loadData: () => 'some data'
  },
  {
    title: 'About',
    path: '/about',
    method: 'get',
    page: About,
    key: '/about'
  },
  {
    title: 'Service',
    path: '/service',
    method: 'get',
    page: Service,
    key: '/service'
  }
];
export { routes };
