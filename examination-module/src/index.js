import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/default.css';
import './style/radio.css';
import './style/checkboxes.css';

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
    return <button className="btn exam-submit">Ответить</button>
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
                        value={1}
                    />
                    <QuestionText
                        value={'Сколько планет в солнечной системе?'}
                    />
                    <div className="question-body">
                        <AnswersInput
                            value={{
                                items: [7, 5, 9, 8],
                                type: "radio"
                            }}
                        />
                    </div>
                </div>
                <div className="question">
                    <QuestionTitle
                        value={2}
                    />
                    <QuestionText
                        value={'Что характерно для кометы?'}
                    />
                    <div className="question-body">
                        <AnswersInput
                            value={{
                                items: [
                                    "Имеет хвост",
                                    "Вращается вокруг солнца",
                                    "Состоит из газа и пыли",
                                    "Существует только во внутренней области солнечной системы",
                                    "Не имеет ядра"
                                ],
                                type: "checkbox"
                            }}
                        />
                    </div>
                </div>
                <div className="question">
                    <QuestionTitle
                        value={3}
                    />
                    <QuestionText
                        value={'Что такое звезда?'}
                    />
                    <div className="question-body">
                        <AnswersTexInput />
                    </div>
                </div>
            </div>
        )
    }
}

class AnswersInput extends React.Component {
    renderItems() {
        const listItems = this.props.value.items.map((item) => {
            return this.renderByType(item)
        });
        return listItems;
    }

    renderByType(item) {
        switch(this.props.type) {
            case 'radio':
                this.className = 'radio-list';
                return (
                    <li key={item}>
                        <label className="container">{item}
                            <input type="radio" name="answer" value={item}/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                )
            case 'checkbox':
                this.className = 'checkbox-list';
                return (
                    <li key={item}>
                        <label className="container container-checkbox">{item}
                            <input type="checkbox" />
                            <span className="checkmark-checkbox"></span>
                        </label>
                    </li>
                )
        }
    }

    render() {
        return (
            <ul className={this.className}>
                {this.renderItems()}
            </ul>
        )
    }
}

class AnswersTexInput extends React.Component {
    render() {
        return(
            <textarea name="answer" id="" cols="30" rows="10" placeholder="Введите ваш ответ здесь"></textarea>
        )
    } 
}

class QuestionText extends React.Component {
    render() {
        return (
            <h2>{this.props.value}</h2>
        )
    }
}

class QuestionTitle extends React.Component {
    render() {
        return (
            <h3 class="question-title">Вопрос {this.props.value}</h3>
        )
    }
}

ReactDOM.render(<Examine />, document.getElementById('root'));
