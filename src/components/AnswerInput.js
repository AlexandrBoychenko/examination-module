import React from 'react';

class AnswerInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    componentDidMount() {
        localStorage.setItem(this.props.id, JSON.stringify(this.props.right));
    }

    handleChangeRadio(e) {
        this.props.context.onAnswerChangeRadio(e.target.value, e.target.name);
    }

    handleChangeCheckbox(e) {
        this.props.context.onAnswerChangeCheckbox(e.target.value);
    }

    renderItems() {
        return this.props.items.map((item) => {
            return this.renderByType(item)
        });
    }

    renderByType(item) {
        switch(this.props.type) {
            case 'radio':
                this.className = 'radio-list';
                return (
                    <li key={item} >
                        <label className="container">{item}
                            <input
                                type="radio"
                                name={this.props.id}
                                value={item}
                                onChange={this.handleChangeRadio}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </li>
                );
            case 'checkbox':
                this.className = 'checkbox-list';
                return (
                    <li key={item}>
                        <label className="container container-checkbox">{item}
                            <input type="checkbox" name="answer" value={item}
                                   onChange={this.handleChangeCheckbox}
                            />
                            <span className="checkmark-checkbox"></span>
                        </label>
                    </li>
                );
            default :
                return;
        }
    }

    render() {
        return (
            <ul className={this.className}>
                {this.renderItems()}
            </ul>
        )
    }
}

export default AnswerInput;
