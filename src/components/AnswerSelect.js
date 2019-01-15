import React from 'react';
import { setLocalStorage } from '../helpers'

class AnswerSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    componentDidMount() {
        setLocalStorage(this.props.id, this.props.right);
    }

    handleChangeSelect(e) {
        this.props.context.onAnswerChangeSelect(e.target.value, this.props.id)
    }

    renderItems() {
        return this.props.items.map((item) => {
            return <option key={item} value={item}>{item}</option>
        });
    }

    render() {
        return(
            <div className="select-style">
                <select onChange={this.handleChangeSelect}>
                    <option value=''>Выберите ответ</option>
                    {this.renderItems()}
                </select>
            </div>
        )
    }
}

export default AnswerSelect;
