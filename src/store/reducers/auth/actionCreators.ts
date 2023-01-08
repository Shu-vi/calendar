import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";
import {authSlice} from "./authSlice";


export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.setIsLoading(true));
        const response = await UserService.getUsers();
        const mockUser = response.data.find(user => user.username === username && user.password === password);
        if (mockUser) {
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', mockUser.username);
            dispatch(authSlice.actions.setUser(mockUser));
            dispatch(authSlice.actions.setAuth(true));
        } else {
            dispatch(authSlice.actions.setError('Некорректный логин или пароль'))
        }
        dispatch(authSlice.actions.setIsLoading(false));
    } catch (e) {
        dispatch(authSlice.actions.setError('Произошла ошибка при логине'));
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(authSlice.actions.setUser({} as IUser));
    dispatch(authSlice.actions.setAuth(false));
}