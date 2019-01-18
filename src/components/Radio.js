import React from 'react';
import { setLocalStorage } from '../helpers'

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {}
        };
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
        this.setPastValueToState();

    }

    setPastValueToState() {
        this.setState({values: this.props.pastValues}, () => {
            console.log(this.state);
        });

    }

    handleChangeRadio(e) {
        this.setState({...this.state, values: {[this.props.id]: e.target.value}});
        this.props.context.onAnswerChangeRadio(e.target.value, this.props.id, 'Radio');
    }
    
    renderItems() {
        return this.props.items.map((item) => {
            return this.renderInput(item)
        });
    }

    compareWithState(item) {
        let values = this.state.values;
        if (values !== {}) {
            return item.toString() === values[this.props.id]
        } else {
            return false
        }
    }

    renderInput(item) {
        this.className = 'radio-list';
        return (
            <li key={item} >
                <label className="container">{item}
                    <input
                        type="radio"
                        name={this.props.id}
                        value={item}
                        checked={this.compareWithState(item)}
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
