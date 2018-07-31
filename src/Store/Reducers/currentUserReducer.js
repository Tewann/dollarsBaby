// Store/Reducers/currentUserReducer.js

const initialState = {
    userProfilPicture: require('../../../images/ic_tag_faces.png')
}

function getCurrentUserInformations(state = initialState, action) {
    let nextState
    switch (action.type) {

        //Action to send Predefined Messages 
        case 'UPDATE_PROFIL_PICTURE':                   
            nextState = {
                ...state,
                userProfilPicture: action.value
            }
            return nextState || state
       
        default:
            return state
    }
}

export default getCurrentUserInformations