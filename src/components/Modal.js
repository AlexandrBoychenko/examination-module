import React from 'react';
import '../style/modal.css'

class Modal extends React.Component {
    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop">
                <div className="modal">
                    <div className="modalText">
                        Каждый не отвеченный ответ считается неправильным, Вы уверены что хотите продолжить?
                    </div>
                    <div className="btn-footer">
                        <button type="button" className="btn btn-inline" onClick={this.props.onSubmit}>
                            Ok
                        </button>
                        <button className="btn btn-inline" onClick={this.props.onClose}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;