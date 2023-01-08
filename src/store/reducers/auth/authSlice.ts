import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";


export interface IAuthState {
    isAuth: boolean;
    user: IUser,
    isLoading: boolean,
    error: string
}

const initialState: IAuthState = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    error: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>){
            state.isAuth = action.payload;
            state.isLoading = false;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
            state.isLoading = false;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>){
            state.user = action.payload;
        }
    }
})

export default authSlice.reducer;