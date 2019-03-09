
const initialState = {
    soundsDownloaded: []
}

export const soundsDownloadedReducer = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case "ADD_SOUND_TO_STATE":
            const soundToAdd = {
                sound: action.value.sound,
                downloadUrl: action.value.downloadUrl
            }
            nextState = {
                ...state,
                soundsDownloaded: [
                    ...state.soundsDownloaded,
                    soundToAdd
                ]
            }
            return nextState || state

        case "REMOVE_SOUND_TO_STATE":
            const index = state.soundsDownloaded.findIndex(item => item.sound === action.value.sound);
            if (index !== -1) {
                state.soundsDownloaded.splice(index, 1)
            }
            return state

        case "RESET_SOUNDS":
            return initialState;

        default:
            return state
    }
}

export default soundsDownloadedReducer
