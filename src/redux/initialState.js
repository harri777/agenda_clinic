import Immutable from 'seamless-immutable';

// it safe to modify the passed initialState here
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
