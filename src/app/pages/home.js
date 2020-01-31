/**
 * @fileoverview Defines the Home page for the application.
 */
import React from 'react';
import { Page } from '../components/Page';
import { Hello } from '../components/Hello';

/**
 * Component for displaying the Home page
 * @example
 * return (
 *  <Home />
 * )
 */
const Home = () => {
  return (
    <Page>
      <Hello hello="THE INDEX PAGE" />
    </Page>
  );
};

export default Home;
