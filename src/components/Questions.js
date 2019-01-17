import React from 'react';
import Modal from './Modal';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Select from './Select';
import TextInput from './TextInput';
import Mark from './Mark';
import questions from '../questions';
import { questionsNumber, getResultArray, getBooleans } from '../helpers';
import { Route } from 'react-router-dom';

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isRight: [],
            Radio: [],
            Checkbox: [],
            TextInput: [],
            Select: []
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        this.setLastId();
    }

    setLastId() {
        let lastId = localStorage.getItem('lastId');
        if (lastId) {
            this.setState({id: +lastId + 1});
            localStorage.setItem('lastId', +lastId + 1);
        } else {
            this.setState({id: 1});
            localStorage.setItem('lastId', 1);
        }
    }

    onAnswerChangeRadio(value, id, type) {
        if (!isNaN(value)) {
            value = +value;
        }
        let answers = this.state[type].slice();
        this.removePreviousAnswer(answers, id);
        this.addNewAnswer(answers, id, value, type)
    }

    onAnswerChangeCheckbox(value, id, type) {
        let answers = this.state[type].slice();

        if (!answers.length) {
            let values = [];
            values.push(value);
            answers.push({id, value: values});
            this.setState({[type]: answers});
        } else {
            answers.forEach((item, index) => {
                if (item.id === id) {
                    let elements = item.value.slice();

                    if (!~elements.indexOf(value)) {
                        elements.push(value);

                    } else {
                        let valueIndex = elements.indexOf(value);
                        elements.splice(valueIndex, 1);
                    }
                    answers[index].value = elements;
                }
            });
            this.handleUserAnswers(answers, id, type);
        }
    }

    onAnswerChangeTextInput(value, id, type) {
        value = value.toLowerCase();
        let answers = this.state[type].slice();
        this.removePreviousAnswer(answers, id);
        this.addNewAnswer(answers, id, value, type)
    }

    onAnswerChangeSelect(value, id, type) {
        let answers = this.state[type].slice();
        this.removePreviousAnswer(answers, id);
        this.addNewAnswer(answers, id, value, type)
    }

    handleUserAnswers(answers, id, type) {
        this.setState({[type]: answers});
        this.toggleRight(answers, id);
    }

    addNewAnswer(answers, id, value, type) {
        answers.push({id, value: value});
        this.handleUserAnswers(answers, id, type);
    }

    removePreviousAnswer(answers, id) {
        for(let i = 0; i < answers.length; i++) {
            if (answers[i].id === id) {
                answers.splice(0, 1);
                return
            }
        }
    }

    toggleModal() {
        this.setState({isOpen: !this.state.isOpen});
    };

    setStorage() {
        localStorage.setItem(this.state.id, JSON.stringify(this.state));
    }

    setProps(question) {
        return {
            id: question.id,
            items: question.items,
            right: question.right,
            context: this
        }
    }

    returnQuestionByType(question) {
        let props = this.setProps(question);
        switch (question.type) {
            case 'Radio':
                return <Radio {...props} />;
            case 'Checkbox':
                return <Checkbox {...props} />;
            case 'TextInput':
                return <TextInput {...props} />;
            case 'Select':
                return <Select {...props} />;
            default:
                return;
        }
    }

    renderQuestions() {
        return questions.map((item, index) => {
            return (
                <div key={item.id} className="question">
                    <h3 className="question-title">Вопрос {index + 1}</h3>
                    <Mark
                        show={this.showIsRight(item.id)} />
                    <h2>{item.value}</h2>
                    <div className="question-body">
                        {this.returnQuestionByType(item)}
                    </div>
                </div>
            )
        });
    }

    showIsRight(id) {
        let rightAnswers = this.state.isRight.slice();
        return !!(~rightAnswers.indexOf(id));
    }

    toggleRight(answers, id) {
        let isRight = this.state.isRight.slice();
        let currentAnswers = getBooleans(answers);
        currentAnswers.forEach((boolAnswer, index) => {
            if (answers[index].id === id) {
                if (boolAnswer) {
                    isRight.push(id)
                } else if (~isRight.indexOf(id)){
                    isRight.splice(isRight.indexOf(id), 1);
                }
            }
        });
        this.setState({isRight});
    }

    handleRoute() {
        this.setStorage();
        return `/result/${this.state.id}`;
    };

    handleAnswers() {
        let results = getResultArray(this.state);
        return (results.length < questionsNumber) ? this.toggleModal(): true;
    }

    clearAnswers() {
        let content = this.state;

        for (let key in content) {
            if (Array.isArray(content[key])) {
                content[key] = [];
            }
        }
        this.setState({content});

        document.querySelector('.Exam').reset();
    }

    render() {
        return (
            <div className="questions">
                {this.renderQuestions()}
                <div className="buttons">
                    <Route render={({history}) => (
                        <button
                            className="btn"
                            onClick={(e) => {
                                e.preventDefault();
                                if (this.handleAnswers()) {
                                    history.push(this.handleRoute());
                                }
                            }}>
                            Ответить
                        </button>
                    )} />
                    <button
                        className="btn"
                        onClick={(e) => {
                            e.preventDefault();
                            this.clearAnswers();
                        }}>
                        Очистить
                    </button>
                </div>
                <Route render={({history}) => (
                    <Modal show={this.state.isOpen}
                           onClose={this.toggleModal}
                           onSubmit={() => {
                               history.push(this.handleRoute());
                           }}>
                    </Modal>
                )} />
            </div>
        )
    }
}

export default Questions;
