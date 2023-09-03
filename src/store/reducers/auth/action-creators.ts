import {IUser} from "../../../models/IUsers";
import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./type";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionsEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload}),
        login: (username: string, password: string) => async (dispatch: AppDispatch) => {
            try{
                dispatch(AuthActionCreators.setIsLoading(true));
                setTimeout(async () => {
                    const response = await UserService.getUsers()
                    const mockUsers = response.data.find(user => user.username === username && user.password === password)
                    if (mockUsers) {
                        localStorage.setItem('auth', 'true');
                        localStorage.setItem('username', mockUsers.username);
                        dispatch(AuthActionCreators.setUser(mockUsers));
                        dispatch(AuthActionCreators.setIsAuth(true))

                    } else {
                        dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
                    }
                    dispatch(AuthActionCreators.setIsLoading(false))
                }, 1000)


            } catch (e) {
                dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
            }
        },
    logout: () => async (dispatch: AppDispatch) => {
         localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}
