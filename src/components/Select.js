import React from 'react';
import { setLocalStorage, returnCurrentValue } from '../helpers'

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
        this.compareWithState();
    }

    handleChangeSelect(e) {
        this.setState({selected: e.target.value});
        this.props.context.onAnswerChangeSelect(e.target.value, this.props.id, 'Select')
    }

    renderItems() {
        return this.props.items.map((item) => {
            return <option
                key={item}
                value={item}
            >{item}</option>
        });
    }

    compareWithState() {
        let pastValues = this.props.pastValues;
        for (let key in pastValues) {
            if (key === this.props.id) {
                this.setState({selected: pastValues[key]});
            }
        }
    }

    render() {
        return(
            <div className="select-style">
                <select
                    value={returnCurrentValue(this.props.parentState.length, this.state.selected)}
                    onChange={this.handleChangeSelect}>
                    <option value=''>Выберите ответ</option>
                    {this.renderItems()}
                </select>
            </div>
        )
    }
}

export default Select;
