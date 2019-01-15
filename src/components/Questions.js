import React from 'react';
import Modal from './Modal';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Select from './Select';
import TextInput from './TextInput';
import questions from '../questions';
import { questionsNumber, getResultArray } from '../helpers';
import { Route } from 'react-router-dom';

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAreAnswered: false,
            isOpen: false,
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

    onAnswerChangeRadio(value, id) {
        if (!isNaN(value)) {
            value = +value;
        }

        let answers = this.state.Radio.slice();
        if (answers.length) {
            answers.forEach((item, index) => {
                if (item.id === id) {
                    answers.splice(index, 1);
                }
            })
        }
        answers.push({id, value});
        this.setState({Radio: answers});
    }

    onAnswerChangeCheckbox(value, id) {
        let answers = this.state.Checkbox.slice();

        if (!answers.length) {
            let values = [];
            values.push(value);
            answers.push({id, value: values});
            this.setState({Checkbox: answers});
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
            this.setState({Checkbox: answers});
        }
    }

    onAnswerChangeText(value, id) {
        let answers = this.state.TextInput.slice();
        this.removePreviousAnswer(answers, id);
        answers.push({id, value: value.toLowerCase()});
        this.setState({TextInput: answers});
    }

    onAnswerChangeSelect(value, id) {
        let answers = this.state.Select.slice();
        this.removePreviousAnswer(answers, id);
        answers.push({id, value});
        this.setState({Select: answers});
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
                    <h2>{item.value}</h2>
                    <div className="question-body">
                        {this.returnQuestionByType(item)}
                    </div>
                </div>
            )
        });
    }

    handleRoute() {
        this.setStorage();
        return `/result/${this.state.id}`;
    };

    handleAnswers() {
        let results = getResultArray(this.state);
        return (results.length < questionsNumber) ? this.toggleModal(): true;
    }

    render() {
        return (
            <div className="questions">
                {this.renderQuestions()}
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
