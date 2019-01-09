import React from 'react';
import Modal from './Modal';
import AnswerInput from './AnswerInput';
import AnswerSelect from './AnswerSelect';
import AnswerTextInput from './AnswerTextInput';
import questions from '../questions';
import { Route } from 'react-router-dom';

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

    setStorage() {
        localStorage.setItem(this.state.id, JSON.stringify(this.state));
    }

    setProps(question) {
        return {
            key: question.id,
            id: question.id,
            items: question.items,
            right: question.right,
            type: question.type,
            context: this
        }
    }

    returnQuestionByType(question) {
        let props = this.setProps(question);
        switch (question.component) {
            case 'AnswerInput':
                return <AnswerInput
                    {...props}
                />;
            case 'AnswerTextInput':
                return <AnswerTextInput
                    {...props}
                />;
            case 'AnswerSelect':
                return <AnswerSelect
                    {...props}
                />;
            default:
                return;
        }
    }

    renderQuestions() {
        const questionObject = questions;

        return questionObject.map((item, index) => {
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

    render() {
        let stateId = this.state.id;
        let setStorage = this.setStorage.bind(this);
        let state = this.state;

        return (
            <div className="questions">

                {this.renderQuestions()}

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

export default Questions;
