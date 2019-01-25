import React from 'react';
import Radio from '../src/Components/Radio';
import renderer from 'react-test-renderer';

test('It should be render correctly', () => {
    const props = {
        id: 1,
        items: [7, 5, 9, 8],
        right: 8,
        context: this,
        pastValues: {},
        parentState: {}
    };

    const component = renderer.create(
        <Radio {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.handleChangeRadio();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});