import React from 'react';
import { setLocalStorage } from '../helpers'

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: []
        };
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
        this.setPastValueToState();
        console.log(this.props.pastValues);
    }

    setPastValueToState() {
        let pastValue = this.props.pastValues && this.props.pastValues.values;
        this.setState({values: pastValue})
    }

    handleChangeRadio(e) {
        let pastValues;
        if (this.state.values) {
            pastValues = this.state.values.slice();
            pastValues.forEach((pastValue) => {
                if (pastValue.id === this.props.id) {
                    pastValue.value = e.currentTarget.value;
                }
            });

        } else {
            pastValues = e.currentTarget.value;
        }

        this.setState({
            values: pastValues
        });

        this.props.context.onAnswerChangeRadio(e.target.values, this.props.id, 'Radio');
    }
    
    renderItems() {
        return this.props.items.map((item, index) => {
            return this.renderInput(item, index)
        });
    }

    renderInput(item, index) {
        this.className = 'radio-list';
        return (
            <li key={item} >
                <label className="container">{item}
                    <input
                        type="radio"
                        name={this.props.id}
                        value={item}
                        checked={item.toString() === this.state && this.state.values[index]}
                        onChange={this.handleChangeRadio}
                    />
                    <span className="check-mark"></span>
                </label>
            </li>
        );            
    }

    render() {
        return (
            <ul className={this.className}>
                {this.renderItems()}
            </ul>
        )
    }
}

export default Radio;
