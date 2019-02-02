
const initialState = {
    displaysAdBanner: true
}

function options(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'AD_BANNER':
            // If statement = if keyboard opens and closes inside of a screen where ads are disabled
            if (!(state.displaysAdBanner === false && action.value === false)) {
                nextState = {
                    ...state,
                    displaysAdBanner: action.value
                }
            }
            return nextState || state

        default:
            return state
    }
}

export default options