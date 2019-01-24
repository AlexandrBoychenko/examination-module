import React from 'react';
import { setLocalStorage, returnCurrentValue } from '../helpers'

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: []
        };
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
        this.compareWithState();
    }

    handleChangeCheckbox(e) {
        let currentValues = this.state.checked.slice();
        let targetPos = currentValues.indexOf(e.target.value);
        if (Object.keys(this.props.pastValues).length) {
            if (~targetPos) {
                currentValues.splice(targetPos, 1);
            } else {
                currentValues.push(e.target.value);
            }
        } else {
            if (currentValues.length > 1) {
                currentValues = [e.target.value];
            } else {
                currentValues.push(e.target.value)
            }
        }

        this.setState({checked: currentValues});
        this.props.context.onAnswerChangeCheckbox(e.target.value, this.props.id, 'Checkbox');
    }

    renderItems() {
        return this.props.items.map((item) => {
            return this.renderInput(item)
        });
    }

    compareWithState() {
        let arrayForChecked = [];
        let pastValues = this.props.pastValues;
            if (pastValues && pastValues[this.props.id]) {
                this.props.items.forEach((item) => {
                pastValues[this.props.id].forEach((propsItem) => {
                    if(propsItem === item) {
                        arrayForChecked.push(item.toString());
                    }
                })
            });
            this.setState({checked: arrayForChecked});
        }

    }

    isItemChecked(item) {
        return ~this.state.checked.indexOf(item.toString())
    }

    renderInput(item) {
        this.className = 'checkbox-list';
        return (
            <li key={item}>
                <label className="container container-checkbox">{item}
                    <input type="checkbox" name="answer" value={item}
                       checked={returnCurrentValue(this.props, this.isItemChecked(item))}
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
