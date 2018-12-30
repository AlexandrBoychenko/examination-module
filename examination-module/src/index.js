import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import './style/index.css';
import './style/default.css';
import './style/radio.css';
import './style/checkboxes.css';
import './style/select.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


const App = () => (
    <Switch>
        <Route exact path='/' component={Examine}/>
        <Route path='/result' component={Result}/>
    </Switch>
);

class Examine extends React.Component {

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

class Result extends React.Component {
    render() {
        return (
            <h3>Here's result</h3>
        )
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
            isOpen: false,
            answer01: '',
            answer02: [],
            answer03: '',
            answer04: true,
            answer05: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    onAnswerChangeRadio(value, name) {
        if (name === "answer01") {
            this.setState({answer01: value});
        } else {
            this.setState({answer05: value});
        }

    }

    onAnswerChangeCheckbox(value) {
        let newAnswers = this.state.answer02.slice();

        if (!~this.state.answer02.indexOf(value)) {
            newAnswers.push(value);
            this.setState({answer02: newAnswers});
        } else {
            let valueIndex = newAnswers.indexOf(value);
            newAnswers.splice(valueIndex, 1);
            this.setState({answer02: newAnswers});
        }
    }

    onAnswerChangeText(value) {
        this.setState({answer03: value});
    }

    onAnswerChangeSelect(value) {
        this.setState({answer04: value});
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    openNewPage(e) {
        e.preventDefault();

        //alert('New page will be here');
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
                                id="answer01"
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
                                id="answer02"
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
                            id="answer03"
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
                            id="question04"
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
                            id="answer05"
                            items={["Да", "Нет"]}
                            type="radio"
                            context={this}
                        />
                    </div>
                </div>
                <Route render={({history}) => (
                    <button
                        className="btn"
                        onClick={(e) => {
                                e.preventDefault();

                                let allAreAnswered = true;
                                for (let key in this.state) {
                                    if (!this.state[key] && key !== "allAreAnswered" && key !== "isOpen") {
                                        allAreAnswered = false;
                                    }
                                }
                                allAreAnswered ? history.push('/result') : this.toggleModal();
                        }}>
                        Ответить
                    </button>
                )} />
                <Route render={({history}) => (
                    <Modal show={this.state.isOpen}
                           onClose={this.toggleModal}
                           onSubmit={() => {history.push('/result')}}>
                    </Modal>
                )} />
            </div>
        )
    }
}

class AnswersSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    handleChangeSelect(e) {
        this.props.context.onAnswerChangeSelect(e.target.value)
    }

    renderItems() {
        return this.props.items.map((item) => {
            return <option key={item} value={item}>{item}</option>
        });
    }

    render() {
        return(
            <div className="select-style">
                <select onChange={this.handleChangeSelect}>
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
        this.state = {
            componentId: 0
        }
    }

    handleChangeRadio(e) {
        this.props.context.onAnswerChangeRadio(e.target.value, e.target.name);
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
                    <li key={item} >
                        <label className="container">{item}
                            <input
                                type="radio"
                                name={this.props.id}
                                value={item}
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
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    handleChangeText(e) {
        this.props.context.onAnswerChangeText(e.target.value)
    };

    render() {
        return(
            <textarea
                name="answer"
                id=""
                cols="30"
                rows="10"
                placeholder="Введите ваш ответ здесь"
                onChange={this.handleChangeText}>
            </textarea>
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


ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ), document.getElementById('root'));
