import React from 'react';

const ExamTitle = (props) => {
    return (
        <div className="titles">
            <h1>{props.title}</h1>
            <h2>Тема: {props.topic}</h2>
        </div>
    )
};

export default ExamTitle;