/**
 * @fileoverview Defines the 404 not found error page for the application.
 */
import React from 'react';
import { Page } from '../components/Page';
import { useLocation } from 'react-router-dom';

/**
 * Component for displaying a 404 not found page
 * @example
 * return (
 *  <NoMatch />
 * )
 */
const NoMatch = () => {
  let location = useLocation();

  return (
    <Page>
      <div>
        <h1>404, Bruh!</h1>
        <p>
          The page looking for could not be found -
          <code>{location.pathname}</code>
        </p>
      </div>
    </Page>
  );
};

export default NoMatch;
