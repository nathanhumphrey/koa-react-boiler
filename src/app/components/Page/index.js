/**
 * @fileoverview Defines the Page component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from '../Nav';
import { routes } from '../../routes';

/**
 * Component that provides page structure for all pages in the application. By default,
 * the `Page` component includes a Nav with defined routes. The `Page` children will
 * be rendered in a `<main>` element.
 *
 * The structure of the rendered page is as follows:
 * ```
 * <div className="page container">
 *   <header>
 *     <Nav />
 *   </header>
 *   <main>
 *     <!-- children rendered here -->
 *   </main>
 * </div>
 * ```
 * @see Nav
 * @see routes
 * @example
 * const displayText = 'A message to display.'
 * return (
 *  <Page>
 *    {displayText}
 *  </Page>
 * )
 */
const Page = ({ children }) => {
  return (
    <div className="page container">
      <header>
        <Nav routes={routes} />
      </header>
      <main>{children}</main>
    </div>
  );
};

Page.propTypes = {
  /** children props for this component */
  children: PropTypes.node
};

export { Page };
