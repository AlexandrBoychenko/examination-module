import React from 'react';
import Questions from '../src/components/Questions'
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import { shape } from 'prop-types';


test('It should be render correctly', () => {
    const component = mountWrap(<Questions />);
    expect(component).toMatchSnapshot();
});

const router = {
    history: new HashRouter().history,
    route: {
        location: {},
        match: {},
    },
};

const createContext = () => ({
    context: { router },
    childContextTypes: { router: shape({}) },
});

export function mountWrap(node) {
    return mount(node, createContext());
}
