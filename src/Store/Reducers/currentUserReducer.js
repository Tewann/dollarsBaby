// Store/Reducers/currentUserReducer.js

const initialState = {
    userProfilPicture: null,
    registrationToken: null,
    name: null,
    email: null,
    termsOfServiceStatus: 'declined',
    notificationspermissionsdeclined: false,
    appVersion: '1.2.0'
}

function getCurrentUserInformations(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'UPDATE_VERSION':
            nextState = {
                ...state,
                appVersion: action.value
            }
            return nextState || state

        case 'UPDATE_PROFIL_PICTURE':
            nextState = {
                ...state,
                userProfilPicture: action.value
            }
            return nextState || state

        case "TOKEN_MODIFICATION":
            nextState = {
                ...state,
                registrationToken: action.value
            }
            return nextState || state

        case "SET_CURRENT_USER_NAME":
            nextState = {
                ...state,
                name: action.value
            }
            return nextState || state

        case "SET_CURRENT_USER_EMAIL":
            nextState = {
                ...state,
                email: action.value
            }
            return nextState || state

        case "RESET_USER":
            return initialState;

        case "TOS_ACCEPTED":
            nextState = {
                ...state,
                termsOfServiceStatus: 'accepted'
            }
            return nextState || state

        case "NOTIFICATIONS_DECLINED":
            nextState = {
                ...state,
                notificationspermissionsdeclined: true
            }
            return nextState || state
        case "RESET_TOS":
            nextState = {
                ...state,
                termsOfServiceStatus: 'declined'
            }
            return nextState || state

        default:
            return state
    }
}

export default getCurrentUserInformations