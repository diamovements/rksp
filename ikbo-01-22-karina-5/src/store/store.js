// store/store.js
import { createStore } from 'redux';

const initialState = {
    accepted: false,
    confirmed: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_ACCEPT':
            return { ...state, accepted: !state.accepted };
        case 'CONFIRM_AGREEMENT':
            return { ...state, confirmed: true };
        default:
            return state;
    }
}

// ВАЖНО: экспортируй результат вызова createStore
const store = createStore(reducer);

export default store;
