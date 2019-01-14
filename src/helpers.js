import questions from './questions';

const getLocalData = (item) => {
    return JSON.parse(localStorage.getItem(item));
};

const questionsNumber = questions.length;

const getResultArray = (resultState) => {
    let answersRadio = checkSingleValue(resultState.answersRadio);
    let answersCheckbox = compareCheckboxes(resultState.answersCheckbox);
    let answersTextInput = checkSingleValue(resultState.answersTextInput);
    let answersSelect = checkSingleValue(resultState.answersSelect);

    return [].concat(answersRadio, answersCheckbox, answersTextInput, answersSelect);
};

const checkSingleValue = (results) => {
    return results.map((item) => {
        return item.value === getLocalData(item.id);
    })
};

const compareCheckboxes = (results) => {
    return results.map((item) => {
        return compareTwoArrays(item.value, getLocalData(item.id));
    })
};

const compareTwoArrays = (array01, array02) => {
    return array01.length === array02.length && array01.every((value) =>{
                return ~array02.indexOf(value);
            }
        )
};

export {getLocalData, questionsNumber, getResultArray};