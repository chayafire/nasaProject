import produce from 'immer';

const initialState = {

    user: {
        id: "",
        name: "",
        email: "",
        password: "",
        Images: []

    },
}


export default produce((state, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            state.user.id = action.payload;
            break;
        case 'SET_USER_NAME':
            state.user.name = action.payload;
            break;
        case 'SET_USER_EMAIL':
            state.user.email = action.payload;
            break;
        case 'SET_USER_PASSWORD':
            state.user.password = action.payload;
            break;
        case 'SET_USER_IMAGES':
            state.user.Images = action.payload;
            break;


        default:
            return state

    }
}, initialState)
