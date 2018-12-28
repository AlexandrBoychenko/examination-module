import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Examine extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <ExamineTitle />
                <div className="question">
                    {this.renderQuestions(0)}
                    <Question />
                </div>
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

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.questions = [1, 2, 3, 4, 5];
    }

    renderQuestions(i) {
        return <Question-wrap
            value={ this.questions[i] }
        />;
    }


    render() {
        return (
            <QuestionTitle />
        );
    }
}

function QuestionTitle() {

}

ReactDOM.render(<Examine />, document.getElementById('root'));
