import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Page } from '../Page';

configure({ adapter: new Adapter() });

// mock child(ren)
const Child = () => <div>Example text.</div>;

describe('Page component', () => {
  const component = shallow(
    <Page>
      <Child />
    </Page>
  );

  test('renders a header with Nav and main with children', () => {
    expect(component.find('header').length).toEqual(1);
    expect(component.find('header>Nav').length).toEqual(1);
    expect(
      component
        .find('main')
        .childAt(0)
        .type()
    ).toEqual(Child);
  });
});
