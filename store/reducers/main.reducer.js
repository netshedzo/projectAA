import '../actions/main.actions';
import { ADD_NAME } from '../actions/main.actions';

const initialState = {
    page: '',
    name: "",
}

const mainReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_NAME: 
        return {
            ...state,
            name: action.payload
        }
        default: 
        return state;
    }

};

export default mainReducer;