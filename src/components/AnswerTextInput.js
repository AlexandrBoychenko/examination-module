import React from 'react';
import { setLocalStorage } from '../helpers'

class AnswerTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right.toLowerCase());
    }

    handleChangeText(e) {
        this.props.context.onAnswerChangeText(e.target.value, this.props.id)
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
