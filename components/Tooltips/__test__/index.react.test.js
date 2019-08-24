import React from 'react';
import renderer from 'react-test-renderer';
import Tooltip from '../index';

test('Link changes the class when hovered', () => {
  const component = renderer.create(<Tooltip tips="http://www.facebook.com" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
