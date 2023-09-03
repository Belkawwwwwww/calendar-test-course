//Экспортируем функцию по дефолту
//Ее мы называем authReducer и это будет непосредственно сам редюсер
//Редюсер параметрами принимает некоторый State и action
//указываем тот обощающий тип который мы сдеали для экшена initialState AuthAction
// Также редюсер всегда должен возражать состояние
// редюсер - это функция
// поэтому в качестве возвращаемого значения мы также указываем AuthState потому что редюсер всегда должен возвращать состояние этого типа
//создаем кейс, с типом из перечисления, и отсюда возращаем состояние, но уже с измененным полем auth6 которое мы получаем из экшена
//Также сразу создаем объект, кот будет хранить дефолтное значение состояние этого редюсера - значение по умолчанию
//у него указываем тип authState
// И здесь будет одно значение пока что
//- создадим конструкцию switch кейс, которая в зависимости от типа экшена
// будет возращать разное состояние
//Сразу делаем дефолтный кейс, который просто возвращает неизменное состояние

//добавляем поля нехватабщие и инициализируем их
//эрор по умолчанию пустая строка, излоадинг фолс, а юзер это пустой объект типа IUser
//cледущющий этап - каждый из этих экшенов нужно обработать
//в зависимсоти от типа создаем кейс
//во всех кейса мы возрашаем предыдущее состояние, которое мы получаем из payload
//в случае когда мы устанавливаем какую-то ошибку isLoading становится фолс
//
import {AuthAction, AuthActionsEnum, AuthState} from "./type";
import {IUser} from "../../../models/IUsers";

const initialState: AuthState = {
    isAuth: false,
    error: '',
    isLoading: false,
    user: {} as IUser
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionsEnum.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false}
        case AuthActionsEnum.SET_USER:
            return {...state, user: action.payload}
        case AuthActionsEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case AuthActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state;
    }
}