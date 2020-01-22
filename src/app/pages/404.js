import React from 'react';
import { useLocation } from 'react-router-dom';

const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h1>404!</h1>
      <p>
        The page looking for could not be found -
        <code>{location.pathname}</code>
      </p>
    </div>
  );
};

export { NoMatch };
