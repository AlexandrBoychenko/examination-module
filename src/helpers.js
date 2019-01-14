import questions from './questions';

const questionsNumber = questions.length;

const getLocalData = (item) => {
    return JSON.parse(localStorage.getItem(item));
};

const setLocalStorage = (item, data) => {
    return localStorage.setItem(item, JSON.stringify(data));
};

const getResultArray = (resultState) => {
    let answersRadio = getRightAnswer(resultState.answersRadio);
    let answersCheckbox = getRightCheckboxes(resultState.answersCheckbox);
    let answersTextInput = getRightAnswer(resultState.answersTextInput);
    let answersSelect = getRightAnswer(resultState.answersSelect);

    return [].concat(answersRadio, answersCheckbox, answersTextInput, answersSelect);
};

const getRightAnswer = (results) => {
    return results.filter((item) => {
        return item.value === getLocalData(item.id);
    })
};

const getRightCheckboxes = (results) => {
    return results.filter((item) => {
        return compareTwoArrays(item.value, getLocalData(item.id));
    })
};

const compareTwoArrays = (array01, array02) => {
    return array01.length === array02.length && array01.every((value) =>{
                return ~array02.indexOf(value);
            }
        )
};

export {questionsNumber, getLocalData, getResultArray, setLocalStorage};