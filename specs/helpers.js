import { HashRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { shape } from 'prop-types';

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

export function shallowWrap(node) {
    return shallow(node, createContext());
}
