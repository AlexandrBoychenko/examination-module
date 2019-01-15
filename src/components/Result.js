import React from 'react';
import { questionsNumber, getLocalData, getResultArray } from '../helpers';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examResult: 0
        }
    }
    componentDidMount() {
        const resultState = getLocalData(this.props.match.params.number);
        const examResult = getResultArray(resultState).filter((answer) => {
            return answer
        });
        this.setState({examResult: examResult.length});
    }

    render() {
        return (
            <div className="result">
                <div className="result-text">
                    <h3>Результат экзамена</h3>
                    <div className="result-item">Количество правильных ответов: {this.state.examResult}</div>
                    <div className="result-item">Общее количество вопросов: {questionsNumber}</div>
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

export default Result;
