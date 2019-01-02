import React from 'react';
import Modal from './Modal';
import AnswerInput from './AnswerInput'
import AnswerSelect from './AnswerSelect'
import AnswerTextInput from './AnswerTextInput'
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
                        <AnswerInput
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
                        <AnswerInput
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
                        <AnswerTextInput
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
                        <AnswerSelect
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
                        value={'Достигнул ли к настоящему моменту космический аппарат Voyager-2, сконструированный "NASA",' +
                        ' пределов солнечной системы?'}
                    />
                    <div className="question-body">
                        <AnswerInput
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


const QuestionText = (props) => {
    return (
        <h2>{props.value}</h2>
    )
};

const QuestionTitle = (props) => {
    return (
        <h3 className="question-title">Вопрос {props.value}</h3>
    )
};

export default Questions;
