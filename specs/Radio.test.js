import React from 'react';
import Radio from '../src/Components/Radio';
import renderer from 'react-test-renderer';

test('It should be render correctly', () => {
    const component = renderer.create(
        <Radio></Radio>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.handleChangeRadio();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});