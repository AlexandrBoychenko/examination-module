import React from 'react';
import ExamTitle from './ExamTitle';
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
            <div className="result-wrapper">
                <ExamTitle
                    title="Результат экзамена"
                    topic="Астрономия"
                />
                <div className="questions">
                    <div className="question result-section">
                        <div className="question-body">
                            <div className="result-item">Количество правильных ответов: {this.state.examResult}</div>
                            <div className="result-item">Общее количество вопросов: {questionsNumber}</div>
                            <div className="result-item">Номер результата: {this.props.match.params.number}</div>
                        </div>
                        <button
                            className="btn btn-result"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.back();
                            }}>
                            Пройти экзамен заново
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Result;
