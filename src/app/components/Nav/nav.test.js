import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Nav } from '../Nav';

configure({ adapter: new Adapter() });

// mock routes
const routes = [
  {
    linkText: 'Home',
    path: '/',
    key: '/',
    exact: true,
    nav: true
  },
  {
    linkText: 'About',
    path: '/about',
    nav: true,
    key: '/about'
  },
  {
    linkText: '404',
    path: '*',
    key: '/404',
    nav: false
  }
];

describe('Nav component', () => {
  const component = shallow(<Nav routes={routes} />);

  test('renders a single ul with li>NavLink children', () => {
    expect(component.find('ul').length).toEqual(1);
    expect(component.find('ul>li').length).toBeGreaterThan(0);
    expect(component.find('ul>li>NavLink').length).toBeGreaterThan(0);
  });

  describe('renders navigation routes', () => {
    test('only renders nav:true routes', () => {
      expect(component.find('NavLink').length).toEqual(2);
    });
    test('renders all required props for each route', () => {
      // check all routes
      component.find('li').forEach((li, idx) => {
        const nl = li.find('NavLink');

        expect(li.key()).toEqual(routes[idx].key);
        expect(nl.prop('to')).toEqual(routes[idx].path);
        expect(nl.prop('exact')).toEqual(Boolean(routes[idx].exact));
        expect(nl.text()).toEqual(routes[idx].linkText);
        expect(nl.prop('activeClassName')).toEqual('active');
      });
    });
  });
});
