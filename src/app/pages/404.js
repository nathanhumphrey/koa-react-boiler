import React from 'react';
import { Page } from '../components/Page';
import { useLocation } from 'react-router-dom';

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

export { NoMatch };
