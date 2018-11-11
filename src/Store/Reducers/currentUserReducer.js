// Store/Reducers/currentUserReducer.js

const initialState = {
    userProfilPicture: require('../../../images/ic_tag_faces.png'),
    registrationToken: null,
    name: null,
    email: null,
    termsOfServiceStatus: 'declined',
    notificationspermissionsdeclined: false,
}

function getCurrentUserInformations(state = initialState, action) {
    let nextState
    switch (action.type) {

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