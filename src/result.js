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

        let examSummary = {
            question01: resultState['answer01'] === localStorage.getItem('answer01'),
            question02: this.compareWithRightAnswer(resultState['answer02'], getLocalData('answer02')),
            question03: resultState['answer03'].toLowerCase() === localStorage.getItem('answer03').toLowerCase(),
            question04: resultState['answer04'] === localStorage.getItem('answer04'),
            question05: resultState['answer05'] === getLocalData('answer05')
        };
    this.countResult(examSummary, questionsCount, examCount)
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
        this.setState({questionsCount: questionsCount});
        this.setState({examCount: examCount});
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
