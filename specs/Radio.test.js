import React from 'react';
import Radio from '../src/Components/Radio';
import renderer from 'react-test-renderer';
import questions from '../src/questions';
import { shallow } from 'enzyme';


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
    const onChange = jest.fn(),
    props = {
        ...testRadioProps,
        onChange
    },
    RadioInputComponent = shallow(<Radio {...props} />).find("input");
    let firstRadioInput = RadioInputComponent.first();
    firstRadioInput.simulate("click");
    expect(firstRadioInput.find("[checked]").exists()).toEqual(true);
});

const testRadioProps = {
    id: "question01",
    items: [7, 5, 9, 8],
    right: 8,
    context: {onAnswerChangeRadio: () => {}},
    pastValues: {},
    parentState: {}
};