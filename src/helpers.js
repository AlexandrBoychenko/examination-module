import questions from './questions';

const questionsNumber = questions.length;

const getLocalData = (item) => {
    return JSON.parse(localStorage.getItem(item));
};

const setLocalStorage = (item, data) => {
    return localStorage.setItem(item, JSON.stringify(data));
};

const getResultArray = (resultState) => {
    let {Radio, Checkbox, TextInput, Select} = resultState;
    let results = [].concat(Radio, Checkbox, TextInput, Select);
    return getBooleans(results);
};

const getBooleans = (results) => {
    return results.map((item) => {
        if (Array.isArray(item.value)) {
            return compareTwoArrays(item.value, getLocalData(item.id))
        }
        return item.value === getLocalData(item.id);
    })
};

const compareTwoArrays = (array01, array02) => {
    return array01.length === array02.length && array01.every((value) =>{
                return ~array02.indexOf(value);
            }
        )
};

const returnCurrentValue = (boolean, value) => {
    let resultValue = '';
    if (typeof value === 'boolean' ) {
        resultValue = false;
    }
    return boolean ? value : resultValue
};

export {questionsNumber, getLocalData, getResultArray, setLocalStorage, getBooleans, returnCurrentValue};