import React from 'react';
import Radio from '../src/Components/Radio';
import Checkbox from '../src/Components/Checkbox';
import TextInput from '../src/Components/TextInput';
import Select from '../src/Components/Select';
import renderer from 'react-test-renderer';
import questions from '../src/questions';


const getComponentExpression = (questionType) => {
    let pastValues;
    let parentState = pastValues = {};
    let prevTypes = [];
    for (let i = 0; i <= questions.length; i++) {
        if (questions[i].type === questionType) {
            prevTypes.push(questions[i].type);
            return setProps({
                ...questions[i],
                pastValues,
                parentState
            })
        }
    }
};

const setProps = (props) => {
    switch(props.type) {
        case 'Radio': return <Radio {...props} />;
        case 'Checkbox': return <Checkbox {...props} />;
        case 'TextInput': return <TextInput {...props} />;
        case 'Select': return <Select {...props} />;
        default: return null
    }
};

const types = ['Radio', 'Checkbox', 'TextInput', 'Select'];

test('It should be render correctly', () => {
    types.forEach((questionTypes) => {
        const component = renderer.create(
            getComponentExpression(questionTypes)
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});

