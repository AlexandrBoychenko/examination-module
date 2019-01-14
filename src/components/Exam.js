import React from 'react';
import Questions from './Questions';

const Exam = () => {
    return (
        <form className="Exam">
            <ExamTitle/>
            <Questions />
        </form>
    );
};

const ExamTitle = () => {
    return (
        <div className="titles">
            <h1>Экзаменационный модуль</h1>
            <h2>Тема: Астрономия</h2>
        </div>
    )
};

export default Exam;
