//типизируем state и все экшены с которыми будем работать
//также будет экшен который будет имзенять это значение на false и на true - SetAuthState
//чтобы не хардкодить тип экшена, созаддим перечисление в котором будем эти типы хранить authActionsenum
//также необходимо сделать некоторый ообщающий тип, кот все интерфейсы в себя будет объединять authAction
//Поле user типа IUser
//Булеан поле isLoading
//Отвечает за индикацию загрузки
//Также поле error в котором при неуспешном логине будем хранить текстовую ошибку
//для измения для каждого из полей интерфейса
//создаем по соотвествующему типу экшена в перечислении
//и создаем по интерфейсу, для каждого экшена
//далее обобщаем эти типы в AuthAction
//
import {IUser} from "../../../models/IUsers";

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}

export enum AuthActionsEnum {
    SET_AUTH = "SET_AUTH",
    SET_ERROR = "SET_ERROR",
    SET_USER = "SET_USER",
    SET_IS_LOADING = "SET_IS_LOADING"
}

export interface SetAuthAction {
    type: AuthActionsEnum.SET_AUTH;
    payload: boolean;
}

export interface SetErrorAction {
    type: AuthActionsEnum.SET_ERROR;
    payload: string;
}

export interface SetUserAction {
    type: AuthActionsEnum.SET_USER;
    payload: IUser;
}

export interface SetIsLoadingAction {
    type: AuthActionsEnum.SET_IS_LOADING;
    payload: boolean;
}

export type AuthAction =
    SetAuthAction |
    SetUserAction |
    SetErrorAction |
    SetIsLoadingAction

