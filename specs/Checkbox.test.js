import React from 'react';
import Checkbox from '../src/Components/Checkbox';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


describe('Checkbox', () => {
    const testCheckboxProps = {
        id: "question02",
        items: [
            "Имеет хвост",
            "Вращается вокруг солнца",
            "Состоит из газа и пыли",
            "Существует только во внутренней области солнечной системы",
            "Не имеет ядра"
        ],
        right: [
            "Имеет хвост",
            "Вращается вокруг солнца",
        ],
        context: {onAnswerChangeCheckbox: () => {}},
        pastValues: {},
        parentState: {}
    };

    const onChange = jest.fn(),
        props = {
            ...testCheckboxProps,
            onChange
        };
    const wrapper = mount(<Checkbox {...props} />);
    const CheckboxInputComponent = wrapper.find("input").first();

    test('It should be render correctly', () => {
        const component = renderer.create(<Checkbox {...testCheckboxProps} />);
        let treeHTML = component.toJSON();
        expect(treeHTML).toMatchSnapshot();
    });

    test('it should have correct props types for each input', () => {
        const wrapper = mount(<Checkbox {...testCheckboxProps} />);
        const CheckboxProps = wrapper.find("input").first().props();

        expect(CheckboxProps.type).toEqual('checkbox');
        expect(CheckboxProps.name).toEqual(wrapper.props().id);
        expect(CheckboxProps.value).toEqual(expect.any(String));
        expect(CheckboxProps.checked).toEqual("");
        expect(CheckboxProps.onChange).toEqual(expect.any(Function));
    });

    test("check the onChange callback", () => {
        CheckboxInputComponent.simulate("change", {target: {"value": props.items[0]}});
        expect(wrapper.state().checked).toEqual([CheckboxInputComponent.props().value]);
    });

    test("check the state after dual onChange callback", () => {
        CheckboxInputComponent.simulate("change", {target: {"value": props.items[0]}});
        CheckboxInputComponent.simulate("change", {target: {"value": props.items[3]}});
        CheckboxInputComponent.simulate("change", {target: {"value": ""}});
        expect(wrapper.state().checked[0]).toEqual(props.items[3]);
    });
});
