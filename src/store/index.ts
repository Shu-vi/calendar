import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import eventReducer from "./reducers/event/eventSlice";

const rootReducer = combineReducers({eventReducer, authReducer});
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']