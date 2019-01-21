import React from 'react';
import Modal from './Modal';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Select from './Select';
import TextInput from './TextInput';
import Mark from './Mark';
import questions from '../questions';
import { questionsNumber, getResultArray, getBooleans, getLocalData } from '../helpers';
import { Route } from 'react-router-dom';

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            isOpen: false,
            isRight: [],
            pastValues: {},
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

    loadPreviousState() {
        console.log(this.state.id);
        let prevState = getLocalData(this.state.id);
        if (prevState) {
            this.setState({...this.state,
                Radio: prevState['Radio'],
                Checkbox: prevState['Checkbox'],
                TextInput: prevState['TextInput'],
                Select: prevState['Select']
            });
        }
    }

    setLastId() {
        let currentId = localStorage.getItem('currentId');
        if (!currentId) {
            localStorage.setItem('currentId', this.state.id);
        } else {
            this.setState({id: currentId}, this.loadPreviousState);
        }
    }

    setPropsFromStorage(type) {
        let pastId = getLocalData("currentId");
        let answers = getLocalData(pastId);
        let resultObject = {};
        if(answers) {
            let pastAnswers = {...answers};
            pastAnswers[type].forEach((answer) => {
                resultObject[answer.id] = answer.value;
            });
            return resultObject;
        }
    }

    changeLastId() {
        let currentId = this.state.id;
        let nextId;
        nextId = +currentId + 1;
        localStorage.setItem('currentId', nextId);
        this.setState({id: nextId});
    }

    onAnswerChangeRadio(value, id, type) {
        if (!isNaN(value)) {
            value = +value;
        }
        let answers = this.state[type].slice();
        this.removePreviousAnswer(answers, id);
        this.addNewAnswer(answers, id, value, type);
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
        this.addNewAnswer(answers, id, value, type);
    }

    onAnswerChangeSelect(value, id, type) {
        let answers = this.state[type].slice();
        this.removePreviousAnswer(answers, id);
        this.addNewAnswer(answers, id, value, type);
    }

    handleUserAnswers(answers, id, type) {
        let sateHandling = new Promise((resolve) => {
            this.setState({[type]: answers});
            this.toggleRight(answers, id);
            resolve();
            throw new Error('The state is not set');
        });

        sateHandling.then(() => {
            this.setStorage();
        }).catch((error) => {return error})
    }

    addNewAnswer(answers, id, value, type) {
        answers.push({id, value: value});
        return this.handleUserAnswers(answers, id, type);
    }

    removePreviousAnswer(answers, id) {
        for(let i = 0; i < answers.length; i++) {
            if (answers[i].id === id) {
                answers.splice(i, 1);
                return
            }
        }
    }

    toggleModal() {
        this.setState({isOpen: !this.state.isOpen});
    };

    setStorage() {
        localStorage.setItem(this.state.id + '', JSON.stringify(this.state));
    }

    setProps(question) {
        return {
            id: question.id,
            items: question.items,
            right: question.right,
            context: this,
            pastValues: this.setPropsFromStorage(question.type)
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

    changeBorder(boolean) {
        return boolean ? 'green-border' : 'blue-border'
    }

    renderQuestions() {
        return questions.map((item, index) => {
            let showIsRight = this.showIsRight(item.id);
            return (
                <div key={item.id} className={'question ' + this.changeBorder(showIsRight)}>
                    <h3 className="question-title">Вопрос {index + 1}</h3>
                    <Mark show={showIsRight} />
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
        let answerPos = isRight.indexOf(id);
        let currentAnswers = getBooleans(answers);
        currentAnswers.forEach((boolAnswer, index) => {
            if (answers[index].id === id) {
                if (boolAnswer) {
                    isRight.push(id)
                } else if (~answerPos){
                    isRight.splice(answerPos, 1);
                }
            }
        });
        this.setState({isRight});
    }

    handleAnswers() {
        this.changeLastId();
        this.setStorage();
        let results = getResultArray(this.state);
        return (results.length < questionsNumber) ? this.toggleModal(): true;
    }

    clearAnswers() {
        localStorage.setItem(this.state.id + '', null);
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
                                    history.push(`/result/${+this.state.id - 1}`);
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
                               history.push(`/result/${+this.state.id - 1}`);
                           }}>
                    </Modal>
                )} />
            </div>
        )
    }
}

export default Questions;
