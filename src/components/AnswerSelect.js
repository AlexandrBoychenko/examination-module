import React from 'react';

class AnswerSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    componentDidMount() {
        this.props.context.onAnswerChangeSelect(this.props.items[0], this.props.id);
        localStorage.setItem(this.props.id, JSON.stringify(this.props.right));
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
                    {this.renderItems()}
                </select>
            </div>
        )
    }
}

export default AnswerSelect;
