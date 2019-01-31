import React from 'react';
import Radio from '../src/Components/Radio';
import { mount } from 'enzyme';


test('it should have correct props types for input', () => {
    const wrapper = mount(<Radio {...testRadioProps} />);
    const RadioProps = wrapper.find("input").first().props();

    expect(RadioProps.type).toEqual('radio');
    expect(RadioProps.name).toEqual(wrapper.props().id);
    expect(RadioProps.value).toEqual(expect.any(Number || String));
    expect(RadioProps.checked).toEqual(false);
    expect(RadioProps.onChange).toEqual(expect.any(Function));
});

test("check the onChange callback", () => {
    const onChange = jest.fn(),
        props = {
            ...testRadioProps,
            onChange
        };
    const wrapper = mount(<Radio {...props} />);
    const RadioInputComponent = wrapper.find("input").first();
    RadioInputComponent.simulate("change", {target: {"value": props.items[0]}});
    expect(wrapper.state().checked).toBe(RadioInputComponent.props().value);
});


const testRadioProps = {
    id: "question01",
    items: [7, 5, 9, 8],
    right: 8,
    context: {onAnswerChangeRadio: () => {}},
    pastValues: {},
    parentState: {}
};