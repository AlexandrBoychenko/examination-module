import React from 'react';
import { setLocalStorage } from '../helpers'

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeTextInput = this.handleChangeTextInput.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right.toLowerCase());
    }

    handleChangeTextInput(e) {
        this.props.context.onAnswerChangeTextInput(e.target.value, this.props.id, 'TextInput')
    };

    render() {
        return(
            <input type="text"
                   name="answer"
                   placeholder="Введите ваш ответ здесь"
                   onChange={this.handleChangeTextInput}>
            </input>
        )
    }
}

export default TextInput
