/**
 * @fileoverview Defines the About page for the application.
 */
import React from 'react';
import { Page } from '../components/Page';
import { Hello } from '../components/Hello';

/**
 * Component for displaying the About page
 * @example
 * return (
 *  <About />
 * )
 */
const About = () => (
  <Page>
    <Hello hello="THE ABOUT PAGE" />
  </Page>
);

export default About;
