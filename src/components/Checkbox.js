import React from 'react';
import { setLocalStorage } from '../helpers'

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
    }

    handleChangeCheckbox(e) {
        this.props.context.onAnswerChangeCheckbox(e.target.value, this.props.id, 'Checkbox');
    }

    renderItems() {
        return this.props.items.map((item) => {
            return this.renderInput(item)
        });
    }

    renderInput(item) {
        this.className = 'checkbox-list';
        return (
            <li key={item}>
                <label className="container container-checkbox">{item}
                    <input type="checkbox" name="answer" value={item}
                           onChange={this.handleChangeCheckbox}
                    />
                    <span className="check-mark-checkbox"></span>
                </label>
            </li>
        )
    }

    render() {
        return (
            <ul className={this.className}>
                {this.renderItems()}
            </ul>
        )
    }
}

export default Checkbox;