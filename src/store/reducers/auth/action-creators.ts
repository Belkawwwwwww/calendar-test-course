//экшн креатор - это просто функция, которая принимет какой-то аргумент и возращает объект - сам экшн
//у этого экшена есть какой-то тип и какой-то payload
//сделали экш креатор, который аргументом принимает пользователя и в экшн в качесвте payload этого пользователя прокидывает
//для каждого экшена создаем по такому экшн креатору
//с синхронными экшн креаторами которые как-то изменяют state закончили
//реализуем асинхронный экш креатор, который будет овтечать за логику логина
//аргументами эта функция будет принеимать юзернейм и пароль - строки
//поскольку мы будем использовать redux thunk нам необходимо из этой функции вернуть новую функцию
//которая аргументом принимает диспатч и саму логику будем описывать внутри возращаемой функции
//создаем функцию с помощью кот из приложения будем выходить
//начинаем с логинаЖ нужно показать индикатор загрузки, что логин проходит и запрос на сервер улетел
//поэтому диспатчим экш креатор setisloadind и передаем туда значение тру
//т е на данном этапе какой-то индикатор появляется
//также обрабатываем случай, когда появилась ошибка, передаем в диспатч экшн креатор seterror и туда сообщение
//далее получаем пользовтаелей, которые находятся в user json
//для этого воспользуемся аксиос методом гет и как юрл передаем туда путь до файла

//найдем польхователя в массиве date
//когда мы используем аксио в качесвте дженерика указываем что date - это массив типа IUser
//Нам понадобится функция find и с помощью нее будем искать пользователя у которого юзернейм будет равен тому что мы ввели в форму
//И сразу проверяем чтобы у этого пользователя был такой же пароль
//Следующим этапом нужно убедиться что функция find нам что-то вернула и просто в условии проверяем
// Если в условии mockUsers что-то находится, то пользователь ввел корректные данные
//В обратном случае информация с ошибкой
//Если пользователь авторизовался Эту информацию необходимо где-то хранить, поэтому в localstorege в случае если пользователь авторизовался будем добавлять некоторый флаг auth и его username
//Помимо local storage необходимо добавлять флаг auth в состояние вызываем экшнкреатор сетаус туда передаем значение тру
//И также необходимо поместить информацию о пользователе
//Для этого у нас также есть экшнкреатор сетуюзер
//Туда передаем найденного из массива mockUsers пользователя
//- Случай с ошибкой, у нас есть также экшнкреатор сетерор
// - После всех этих манипуляций нам необходимо убрать операцию загрузки
// - Для этого опрокидываем экшнкреатор сетизлоадинг и туда передаем false

//Теперь реализуем logout
// Необходимо из localeStorage удалить флаг auth
//И также необходимо удалить username пользователя
// Необходимо обнулить состояние
// Для этого сначала вызываем функцию setUser туда передаем пустой объект типа IUser
// И тоже самое делаем для флага isAuth только туда передаем значение false
//Для того, чтобы редиректнуло на страницу с логином

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