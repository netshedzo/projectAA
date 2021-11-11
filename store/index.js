import { combineReducers } from "redux";
import mainReducer from "./reducers/main.reducer";


export default combineReducers({
    main: mainReducer 
})