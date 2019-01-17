import React from 'react';

const Mark = (props) => {
    if(!props.show) {
        return null;
    }
    return (
        <div className="right-answer">
            <div className="right-title">Верно</div>
            <img src={require("../img/right.png")} alt="" className="img-right"/>
        </div>
    )
};

export default Mark;