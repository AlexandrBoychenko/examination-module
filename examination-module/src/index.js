import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/default.css';
import './style/radio.css';

class Examine extends React.Component {

    handleSubmit(i) {

    }

    render() {
        return (
            <div className="wrapper">
                <form action="" className="examine">
                    <ExamineTitle
                        value={{
                            mainTitle: 'Экзаменационный модуль',
                            theme: 'Тема: Астрономия'
                        }}
                    />
                    <Questions />
                    <Submit
                        onClick={(i) => this.handleSubmit(i)}
                    />
                </form>
            </div>
        );
    }
}

function Submit() {
    return <button className="exam-submit">Ответить</button>
}

class ExamineTitle extends React.Component {

    render() {
        return (
            <div className="titles">
                <h1>{this.props.value.mainTitle}</h1>
                <h2>{this.props.value.theme}</h2>
            </div>
        )
    }
}

class Questions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="questions">
                <div className="question">
                    <QuestionTitle
                        value={'Вопрос 1'}
                    />
                    <QuestionText
                        value={'Сколько планет в солнечной системе?'}
                    />
                    <AnswersRadio
                        value={[7, 5, 9, 8]}
                    />
                </div>
                <div className="question">
                    <QuestionTitle
                        value={'Вопрос 2'}
                    />
                    <QuestionText
                        value={'Что характерно для кометы?'}
                    />
                    <AnswersCheckbox />
                </div>
            </div>
        )
    }
}

class AnswersRadio extends React.Component {
    renderButtons() {
        const listItems = this.props.value.map((item) => {
            return (
                <li key={item}>
                    <label className="container">{item}
                        <input type="radio" name={item} />
                        <span className="checkmark"></span>
                    </label>
                </li>
            );
        });
        return listItems;
    }

    render() {
        return (
            <ul className="radio-list">
                {this.renderButtons()}
            </ul>
        )
    }
}

class AnswersCheckbox extends React.Component {
    render() {
        return null
    }
}

class QuestionText extends React.Component {
    render() {
        return (
            <h3>{this.props.value}</h3>
        )
    }
}

function QuestionTitle() {
    return (
        <h1>Это вопрос!</h1>
    )
}

ReactDOM.render(<Examine />, document.getElementById('root'));
