import Immutable from 'seamless-immutable';

export default function fetchInitialState (initialState = {}) {
    try {
        const storedState = JSON.parse(
            localStorage.getItem('state'),
        );
        if (storedState) {
            return Immutable(storedState);
        }
    } catch (e) {
        console.log('ERROR');
    }

    // fallthrough: return initial state
    return {
        ...initialState,
        context: Immutable({}),
    };
}
