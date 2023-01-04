import {
    AuthActionEnum,
    ISetAuthAction,
    ISetErrorAction,
    ISetIsLoadingAction,
    ISetUserAction
} from './types';
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (payload: IUser): ISetUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    setIsLoading: (payload: boolean): ISetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setAuth: (payload: boolean): ISetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload}),
    setError: (payload: string): ISetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await UserService.getUsers();
            const mockUser = response.data.find(user => user.username === username && user.password === password);
            if (mockUser) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('username', mockUser.username);
                dispatch(AuthActionCreators.setAuth(true));
                dispatch(AuthActionCreators.setUser(mockUser));
            } else {
                dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логине'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setAuth(false));
    }
}