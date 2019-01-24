import React from 'react';
import { setLocalStorage, returnCurrentValue } from '../helpers'

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            isClicked: false
        };
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
        this.compareWithState();
    }

    /*componentDidUpdate() {
        if (!this.state.isClicked && this.state.checked) {
            this.setState({checked: false});
        }
    }*/

    handleChangeRadio(e) {
        this.setState({checked: e.target.value});
        this.props.context.onAnswerChangeRadio(e.target.value, this.props.id, 'Radio');
    }

    /*handleClick() {
        this.setState({isClicked: true});
    }*/

    renderItems() {
        return this.props.items.map((item) => {
            return this.renderInput(item)
        });
    }

    compareWithState() {
        this.props.items.forEach((item) => {
            if (this.props.pastValues && this.props.pastValues[this.props.id] === item) {
                this.setState({checked: item.toString()});
            }
        })
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
                        checked={this.props.parentState.hasOwnProperty(this.props.id) && item.toString() === this.state.checked}
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
