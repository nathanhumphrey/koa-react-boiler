import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Hello } from '../Hello';

configure({ adapter: new Adapter() });

const name = 'Jane Doe';

describe('Hello component', () => {
  test('renders the hello prop', () => {
    const component = shallow(<Hello hello={name} />);

    expect(component.text()).toMatch(new RegExp(name));
  });
});
