import '../actions/main.actions';
import { ADD_SCORE } from '../actions/main.actions';

const initialState = {
    scores: []
}

const mainReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_SCORE: 
        return {
            ...state,
            scores: state.scores.concat([action.payload])
        }
        default: 
        return state;
    }

};

export default mainReducer;