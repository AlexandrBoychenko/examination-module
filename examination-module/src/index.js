import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/default.css';
import './style/radio.css';
import './style/checkboxes.css';
import './style/select.css';

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
                </form>
            </div>
        );
    }
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
        this.state = {
            allAreAnswered: false,
            answer1: '',
            answer2: [],
            answer3: '',
            answer4: '',
            answer5: ''
        }
    }

    onAnswerChangeRadio(value) {
        this.setState({answer1: value});
    }

    onAnswerChangeCheckbox(value) {
        if (!~this.state.answer2.indexOf(value)) {
            let newAnswers = this.state.answer2.slice();
            newAnswers.push(value);
            this.setState({answer2: newAnswers});
        } else {
            this.setState({answer2: this.state.answer2.delete(value)});
        }
    }

    onAnswerChangeText(value) {
        this.setState({answer3: value});
    }

    onAnswerChangeSelect(value) {
        this.setState({answer4: value});
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
                                items={[7, 5, 9, 8]}
                                right={9}
                                type="radio"
                                context={this}
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
                                items={[
                                    "Имеет хвост",
                                    "Вращается вокруг солнца",
                                    "Состоит из газа и пыли",
                                    "Существует только во внутренней области солнечной системы",
                                    "Не имеет ядра"
                                ]}
                                right={[
                                    "Имеет хвост",
                                    "Вращается вокруг солнца",
                                ]}
                                type="checkbox"
                                context={this}
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
                        <AnswersTexInput
                            value={this.state.answer}
                            context={this}
                            onChange={this.handleUserInput}
                        />
                    </div>
                </div>
                <div className="question">
                    <QuestionTitle
                        value={4}
                    />
                    <QuestionText
                        value={'Как называется естественный спутник Земли?'}
                    />
                    <div className="question-body">
                        <AnswersSelect
                                items={[
                                    "Ганимед",
                                    "Луна",
                                    "Фобос",
                                    "Титан",
                                    "Европа"
                                ]}
                                right="Луна"
                                context={this}
                        />
                    </div>
                </div>
                <div className="question">
                    <QuestionTitle
                        value={5}
                    />
                    <QuestionText
                        value={'Достигнул ли к настоящему моменту космический аппарат Voyager-2, сконструированный "NASA"' +
                        ' пределов солнечной системы?'}
                    />
                    <div className="question-body">
                        <AnswersInput
                                items={["Да", "Нет"]}
                                type="radio"
                        />
                    </div>
                </div>
                <button type="submit" className="btn exam-submit">Ответить</button>
            </div>
        )
    }
}

class AnswersSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: false
        }
    }

    renderItems() {
        return this.props.items.map((item) => {
            return <option key={item} value={item}>{item}</option>
        });
    }

    render() {
        return(
            <div className="select-style">
                <select>
                    {this.renderItems()}
                </select>
            </div>
        )
    }
}

class AnswersInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    handleChangeRadio(e) {
        this.props.context.onAnswerChangeRadio(e.target.value);
    }

    handleChangeCheckbox(e) {
        this.props.context.onAnswerChangeCheckbox(e.target.value);
    }

    renderItems() {
        return this.props.items.map((item) => {
            return this.renderByType(item)
        });
    }

    renderByType(item) {
        switch(this.props.type) {
            case 'radio':
                this.className = 'radio-list';
                return (
                    <li key={item}>
                        <label className="container">{item}
                            <input type="radio" name="answer" value={item}
                                onChange={this.handleChangeRadio}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </li>
                );
            case 'checkbox':
                this.className = 'checkbox-list';
                return (
                    <li key={item}>
                        <label className="container container-checkbox">{item}
                            <input type="checkbox" name="answer" value={item}
                                onChange={this.handleChangeCheckbox}
                            />
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
    constructor(props) {
        super(props);
        this.state = {
            answer: false
        }
    }

    handleUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({answer: value});
    };

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
            <h3 className="question-title">Вопрос {this.props.value}</h3>
        )
    }
}


ReactDOM.render(<Examine />, document.getElementById('root'));
