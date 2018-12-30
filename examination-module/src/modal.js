import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '10%'
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            margin: '0 auto',
            padding: 30
        };

        const modalText = {
            minHeight: '100px',
            paddingTop: '5%'
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    {this.props.children}

                    <div className="modalText" style={modalText}>
                        Каждый не отвеченный ответ считается неправильным, Вы уверены что хотите продолжить?
                    </div>
                    <div className="btn-footer">
                        <button className="btn btn-inline" onClick={this.props.onSubmit}>
                            Ok
                        </button>
                        <button className="btn btn-inline" onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;