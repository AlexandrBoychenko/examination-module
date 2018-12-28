import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Examine extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <ExamineTitle />
                <Questions />
            </div>
        );
    }
}

function ExamineTitle() {
    const title = 'Экзаменационный модуль';
    const theme = 'Тема: Астрономия';
    return (
        <div className="titles">
            <h1>{title}</h1>
            <h2>{theme}</h2>
        </div>
    );
}

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.questions = [1, 2, 3, 4, 5];
    }

    renderQuestions(i) {
        return (
            <div className="question">
                <QuestionTitle />
                <div className="q-body" value={ this.questions[i] }>

                </div>;
            </div>
            )
    }


    render() {
        return (
            <div className="questions">
                <div className="question-1">
                    {this.renderQuestions(0)}
                </div>
                <div className="question-2">
                    {this.renderQuestions(1)}
                </div>
            </div>
        )
    }
}

function QuestionTitle() {
    return (
        <h1>Это вопрос!</h1>
    )
}

ReactDOM.render(<Examine />, document.getElementById('root'));
