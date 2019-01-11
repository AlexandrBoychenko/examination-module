import React from 'react';

class Result extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            examCount: 0,
            questionsCount: 0
        }
    }
    componentDidMount() {
        const resultState = getLocalData(this.props.match.params.number);
        let examCount = 0;
        let questionsCount = 0;

        let answersRadio = this.checkSingleValue(resultState);
        let answersCheckbox = [];
        let answersTextInput = [];
        let answersSelect = [];
        //let examSummary = [];



        let examSummary = {
            question01: resultState['answer01'] === getLocalData('answer01'),
            question02: this.compareWithRightAnswer(resultState['answer02'], getLocalData('answer02')),
            question03: resultState['answer03'] === getLocalData('answer03'),
            question04: resultState['answer04'] === getLocalData('answer04'),
            question05: resultState['answer05'] === getLocalData('answer05')
        };
    this.countResult(examSummary, questionsCount, examCount)
    }

    checkSingleValue(resultState) {
        return resultState.answersRadio.map((item) => {
            return item.stringValue === getLocalData(item.id);
        })
    }

    compareWithRightAnswer(array01, array02) {
        return array01.length === array02.length && array01.every(
                function(value, index) {
                    return value === array02[index];
                }
            )
    }

    countResult(examSummary, questionsCount, examCount) {
        for (let key in examSummary) {
            questionsCount++;
            if (examSummary[key]) {
                examCount++
            }
        }
        this.setState({questionsCount, examCount});
    }

    render() {
        return (
            <div className="result">
                <div className="result-text">
                    <h3>Результат экзамена</h3>
                    <div className="result-item">Количество правильных ответов: {this.state.examCount}</div>
                    <div className="result-item">Общее количество вопросов: {this.state.questionsCount}</div>
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
