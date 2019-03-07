
const initialState = {
    displaysAdBanner: true,
    adBannerEvent: 'keyboard',
    hideContactRequests: false
}

function options(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'AD_BANNER':
            if (action.value.event === 'reset') {
                nextState = {
                    ...state,
                    displaysAdBanner: true,
                    adBannerEvent: 'keyboard',
                }
                // If called from a screen (meaning ads will not be displayed on this screen)
            } else if (action.value.event === 'screen' || action.value.event === null) {
                nextState = {
                    ...state,
                    displaysAdBanner: action.value.value,
                    adBannerEvent: action.value.event
                }
                // Else if called from keyboard open/close event AND user is not in a screen where ads are hidden
            } else if (action.value.event === 'keyboard' && state.adBannerEvent !== 'screen') {
                nextState = {
                    ...state,
                    displaysAdBanner: action.value.value,
                    adBannerEvent: action.value.event
                }
            }
            return nextState || state

        case 'HIDE_CONTACT_REQUESTS_SWITCH':
            nextState = {
                ...state,
                hideContactRequests: action.value
            }
            return nextState || state

        case 'RESET_OPTIONS':
            return initialState

        default:
            return state
    }
}

export default options