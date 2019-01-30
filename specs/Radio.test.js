import React from 'react';
import Radio from '../src/Components/Radio';
import renderer from 'react-test-renderer';
import questions from '../src/questions';
import { shallow, mount } from 'enzyme';


/*test('It should have all properties', () => {
    questions.forEach((question) => {
        if (question.type === 'Radio') {
            expect(question).toMatchSnapshot({
                id: expect.any(String),
                value: expect.any(String),
                items: expect.any(Array),
                right: expect.anything(),
                type: expect.stringMatching('Radio')
            });
        }
    })
});*/

test("check the onChange callback", () => {
    const wrapper = mount(<Radio {...testRadioProps} />);

    const RadioInputComponent = wrapper.find("input").first();
    RadioInputComponent.simulate("change", {target: {
        value: '7'}});
    expect(RadioInputComponent.props().checked).toBe(true);
});

const testRadioProps = {
    id: "question01",
    items: [7, 5, 9, 8],
    right: 8,
    context: {onAnswerChangeRadio: () => {}},
    pastValues: {},
    parentState: {}
};