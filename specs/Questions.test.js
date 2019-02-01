import React from 'react';
import Questions from '../src/components/Questions'
import { HashRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import { mountWrap } from './helpers';


describe('Questions', () => {
    const router = {
        history: new HashRouter().history,
        route: {
            location: {},
            match: {},
        },
    };

    test('It should be render correctly', () => {
        const component = mountWrap(<Questions />);
        expect(component).toMatchSnapshot();
    });
});




