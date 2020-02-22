import produce from 'immer';

export function keyMirror(obj) {
    const output = {};

    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(output, key)) {
            output[key] = key;
        }
    }

    return output;
}

export function handleActions(actionsMap, defaultState) {
    return (state = defaultState, { type, ...rest } = {}) =>
        produce(state, (draft) => {
            const action = actionsMap[type];
            let newState;

            if (action) {
                newState = action(draft, rest);
            }

            if (newState) {
                return newState;
            }

            return draft;
        });
}