import React from 'react';

class AnswerTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    componentDidMount() {
        localStorage.setItem(this.props.id, JSON.stringify(this.props.right.toLowerCase()));
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

export default AnswerTextInput
