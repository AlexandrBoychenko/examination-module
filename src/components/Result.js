import React from 'react';
import questions from '../questions';

class Result extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            examResult: 0
        }
    }
    componentDidMount() {
        const resultState = getLocalData(this.props.match.params.number);

        let answersRadio = this.checkSingleValue(resultState.answersRadio);
        let answersCheckbox = this.compareCheckboxes(resultState.answersCheckbox);
        let answersTextInput = this.checkSingleValue(resultState.answersTextInput);
        let answersSelect = this.checkSingleValue(resultState.answersSelect);

        let examSummary = [].concat(answersRadio, answersCheckbox, answersTextInput, answersSelect);
        this.countResult(examSummary)
    }

    checkSingleValue(results) {
        return results.map((item) => {
            return item.value === getLocalData(item.id);
        })
    }

    compareCheckboxes(results) {
        return results.map((item) => {
            return this.compareTwoArrays(item.value, getLocalData(item.id));
        })
    }

    compareTwoArrays(array01, array02) {
        return array01.length === array02.length && array01.every((value) =>{
                    return ~array02.indexOf(value);
                }
            )
    }

    countResult(examSummary) {
        let examResult = 0;
        examSummary.forEach((answer) => {
            if (answer) {
                examResult++
            }
        });
        this.setState({examResult});
    }

    render() {
        return (
            <div className="result">
                <div className="result-text">
                    <h3>Результат экзамена</h3>
                    <div className="result-item">Количество правильных ответов: {this.state.examResult}</div>
                    <div className="result-item">Общее количество вопросов: {questions.length}</div>
                    <div className="result-item">Номер результата: {this.props.match.params.number}</div>
                </div>
                <button
                    className="btn"
                    onClick={(e) => {
                        e.preventDefault();
                        window.history.back();
                    }}>
                    Пройти экзамен заново
                </button>
            </div>
        )
    }
}

const getLocalData = (item) => {
    return JSON.parse(localStorage.getItem(item));
};

export default Result;
