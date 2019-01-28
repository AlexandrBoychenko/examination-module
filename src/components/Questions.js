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
            Radio: [],
            Checkbox: [],
            TextInput: [],
            Select: []
        };
        this.baseState = this.state;
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        this.setLastId();
        this.setMarkForRight();
    }

    loadPreviousState() {
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
        let answers = this.getPastAnswers();
        return this.getObjectFromArray(answers, type);
    }

    getObjectFromArray(answers, type) {
        let resultObject = {};
        if(answers) {
            answers[type].forEach((answer) => {
                resultObject[answer.id] = answer.value;
            });
        }
        return resultObject;
    }

    setMarkForRight() {
        let pastAnswers = this.getPastAnswers();
        for (let key in pastAnswers) {
            if (Array.isArray(pastAnswers[key]) && key !== 'isRight') {
                pastAnswers[key].forEach((answer) => {
                    setTimeout(() => {this.toggleRight(pastAnswers[key], answer.id)}, 0);
                })
            }
        }
    }

    getPastAnswers() {
        let pastId = getLocalData("currentId");
        return getLocalData(pastId);
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
        let answersObject = this.getObjectFromArray(this.state, type);

        if (!(id in answersObject) ) {
            this.handleNewCheckboxId(answers, value, id, type);
        } else {
            answers = this.handleCheckboxValues(answers, value, id);
        }
        this.handleUserAnswers(answers, id, type);
    }

    handleNewCheckboxId(answers, value, id, type) {
        let values = [];
        values.push(value);
        answers.push({id, value: values});
        this.setState({[type]: answers});
    }

    handleCheckboxValues(answers, value, id) {
        answers.forEach((item, index) => {
            let clickedElements = item.value.slice();
            if (item.id === id) {
                if (!~clickedElements.indexOf(value)) {
                    clickedElements.push(value);
                } else {
                    clickedElements.splice(clickedElements.indexOf(value), 1);
                }
                answers[index].value = clickedElements;
            }
        });
        return answers;
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
        let setHandling = new Promise((resolve) => {
            this.setState({[type]: answers});
            this.toggleRight(answers, id);
            resolve();
        });

        setHandling.then(() => {
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
            pastValues: this.setPropsFromStorage(question.type),
            parentState: this.getObjectFromArray(this.state, question.type)
        }
    }

    returnQuestionByType(question) {
        const props = this.setProps(question);
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
        this.setState({...this.baseState, id: this.state.id}, () => {
            document.querySelector('.exam').reset();
        });

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
                                    history.push(`/result/${+this.state.id}`);
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
