import { combineReducers } from "redux";
import mainReducer from "./reducers/main.reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['scores']
  };

export const rootReducer =  combineReducers({
    main: persistReducer(persistConfig, mainReducer) 
})

export const store = createStore(rootReducer);
export const persistor = persistStore(store);