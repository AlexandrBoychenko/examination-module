import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import './style/index.css';
import './style/default.css';
import './style/radio.css';
import './style/checkboxes.css';
import './style/select.css';
import { HashRouter, Route, Switch } from 'react-router-dom';


const App = () => (
    <Switch>
        <Route exact path='/' component={Examine}/>
        <Route path='/result/:number' component={Result}/>
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

class Result extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            examCount: 0,
            questionsCount: 0
        }
    }
    componentDidMount() {
        let resultState = JSON.parse(localStorage.getItem(this.props.match.params.number));
        let examCount = 0;
        let questionsCount = 0;

        let examSummary = {
            question01: resultState['answer01'] === localStorage.getItem('answer01'),
            question02: this.compareWithRightAnswer(resultState['answer02'], JSON.parse(localStorage.getItem('answer02'))),
            question03: resultState['answer03'] === localStorage.getItem('answer03'),
            question04: resultState['answer04'] === localStorage.getItem('answer04'),
            question05: resultState['answer05'] === JSON.parse(localStorage.getItem('answer05'))
        };

        for (let key in examSummary) {
            questionsCount++;
            if (examSummary[key]) {
                examCount++
             }
        }
        this.setState({questionsCount: questionsCount});
        this.setState({examCount: examCount});
    }

    compareWithRightAnswer(array01, array02) {
        return array01.length === array02.length && array01.every(
            function(value, index) {
                return value === array02[index];
            }
        )
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
                <Route render={({history}) => (
                    <button
                        className="btn"
                        onClick={(e) => {
                            e.preventDefault();
                            history.push(`/`);
                        }}>
                        Пройти экзамен заново
                    </button>
                )}/>
            </div>
        )
    }
};

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
            id: '',
            answer01: '',
            answer02: [],
            answer03: '',
            answer04: '',
            answer05: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        let lastId = localStorage.getItem('lastId');
        if (lastId) {
            this.setState({id: +lastId + 1});
            localStorage.setItem('lastId', +lastId + 1);
        } else {
            this.setState({id: 1});
            localStorage.setItem('lastId', 1);
        }
    }

    onAnswerChangeRadio(value, name, right) {
        if (name === "answer01") {
            this.setState({answer01: value});
        } else {
            this.setState({answer05: value});
        }

    }

    onAnswerChangeCheckbox(value, right) {
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

    setStorage() {
        localStorage.setItem(this.state.id, JSON.stringify(this.state));
    }

    render() {
        let stateId = this.state.id;
        let setStorage = this.setStorage.bind(this);
        let state = this.state;

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
                                right={8}
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
                        value={'Какая из планет солнечной системы имеет наибольший объем?'}
                    />
                    <div className="question-body">
                        <AnswersTexInput
                            id="answer03"
                            context={this}
                            right="Юпитер"
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
                            id="answer04"
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
                            right="Да"
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
                                for (let key in state) {
                                    if (!state[key]
                                        && key !== "allAreAnswered"
                                        && key !== "isOpen"
                                    ) {
                                        allAreAnswered = false;
                                    }
                                }

                                if (allAreAnswered) {
                                    setStorage();
                                    history.push(`/result/${stateId}`);
                                } else {
                                    this.toggleModal();
                                }
                        }}>
                        Ответить
                    </button>
                )} />
                <Route render={({history}) => (

                    <Modal show={this.state.isOpen}
                           onClose={this.toggleModal}
                           onSubmit={() => {
                               setStorage();
                               history.push(`/result/${stateId}`);
                           }}>
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

    componentDidMount() {
        this.props.context.onAnswerChangeSelect(this.props.items[0]);
        localStorage.setItem(this.props.id, this.props.right);
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
    }

    componentDidMount() {
        localStorage.setItem(this.props.id, JSON.stringify(this.props.right));
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
                );
            default :
                return;
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

    componentDidMount() {
        localStorage.setItem(this.props.id, this.props.right);
    }

    handleChangeText(e) {
        this.props.context.onAnswerChangeText(e.target.value)
    };

    render() {
        return(
            <input type="text"
                name="answer"
                placeholder="Введите ваш ответ здесь"
                onChange={this.handleChangeText}>
            </input>
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
    <HashRouter>
        <App />
    </HashRouter>
    ), document.getElementById('root'));
