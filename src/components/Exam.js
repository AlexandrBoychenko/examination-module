import React from 'react';
import Questions from './Questions';
import ExamTitle from './ExamTitle'

const Exam = () => {
    return (
        <div className="exam-wrapper">
            <form className="exam">
                <ExamTitle
                    title="Экзаменационный модуль"
                    topic="Астрономия"
                />
                <Questions />
            </form>
        </div>
    );
};

export default Exam;
