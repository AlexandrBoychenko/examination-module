import React from 'react';
import { setLocalStorage, returnCurrentValue } from '../helpers'

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChangeTextInput = this.handleChangeTextInput.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right.toLowerCase());
        this.compareWithState();
    }

    handleChangeTextInput(e) {
        this.setState({value: e.target.value});
        this.props.context.onAnswerChangeTextInput(e.target.value, this.props.id, 'TextInput')
    };

    compareWithState() {
        let pastValues = this.props.pastValues;
        for (let key in pastValues) {
            if (key === this.props.id) {
                this.setState({value: pastValues[key]});
            }
        }
    }

    render() {
        return(
            <input type="text"
                   name="answer"
                   placeholder="Введите ваш ответ здесь"
                   value={returnCurrentValue(this.props.parentState.hasOwnProperty(this.props.id), this.state.value)}
                   onChange={this.handleChangeTextInput}
            />
        )
    }
}

export default TextInput
