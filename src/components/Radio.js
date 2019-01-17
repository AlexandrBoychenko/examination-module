import React from 'react';
import { setLocalStorage } from '../helpers'

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
    }

    handleChangeRadio(e) {
        this.props.context.onAnswerChangeRadio(e.target.value, this.props.id, 'Radio');
    }
    
    renderItems() {
        let valuesObject = this.getValue();
        return this.props.items.map((item) => {
            if (valuesObject) {
                let inputObjects = valuesObject.Radio;
                for (let i = 0; i < inputObjects.length; i++) {
                    if (inputObjects[i].id === this.props.id && inputObjects[i].value) {
                        return this.renderInput(inputObjects[i].value, 'checked')
                    }
                }
            }
            return this.renderInput(item)
        });
    }

    renderInput(item, checked) {
        this.className = 'radio-list';
        return (
            <li key={item} >
                <label className="container">{item}
                    <input
                        type="radio"
                        name={this.props.id}
                        value={item}
                        checked={checked}
                        onChange={this.handleChangeRadio}
                    />
                    <span className="check-mark"></span>
                </label>
            </li>
        );            
    }

    getValue() {
        let currentId = localStorage.getItem('currentId');
        return JSON.parse(localStorage.getItem(`${+currentId}`));
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
