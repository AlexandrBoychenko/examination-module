import React from 'react';

class AnswersTextInput extends React.Component {
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

export default AnswersTextInput
