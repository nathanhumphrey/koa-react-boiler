/*
 * Define application routes here. All routes must support the following:
 *
 * - linkText - the value to use in navigation display
 * - path -  the URL path for the route
 * - method - the HTTP method for handling the route
 * - page - string name for the application page to serve for the route (see app/pages)
 * - key - required key property for mapped list components, should be unique among pages
 * - nav - boolean to determine if the route should be included in navigation (default true)
 * - [title] - the value to use for the document.title
 * - [exact] - boolean to determine if an exact match is required (left here for developer to decide)
 * - [loadData] - if initial data are required, provide method to fetch here
 */
const siteTitle = 'Koa React App - ';

const routes = [
  {
    title: `${siteTitle} Home`,
    linkText: 'Home',
    path: '/',
    method: 'get',
    page: 'Home',
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
    page: 'About',
    nav: true,
    key: '/about'
  }
];
export { routes };
