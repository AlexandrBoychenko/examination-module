import React from 'react';
import { setLocalStorage } from '../helpers'

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value:''
        };
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
        this.setState({value: '7'});
    }

    handleChangeRadio(e) {
        this.setState({
            value: e.currentTarget.value
        });
        this.props.context.onAnswerChangeRadio(e.target.value, this.props.id, 'Radio');
    }
    
    renderItems() {
        return this.props.items.map((item) => {
            return this.renderInput(item)
        });
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
                        checked={this.state.value === item.toString()}
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
