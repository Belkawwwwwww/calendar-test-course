//создаем константу и с помощью функции createStore ее инициализируем
//первым параметром она принимает некоторый редюсер, создаем этот редюсер
//и с помощью функции combineReducers
//аругментом передаем объект, в котором в последующем будут редюсеры
//этот редюсер мы передаем в функцию createStore
//и подклчаем middleware
//он будет один - это redux-thunk, импортируем его и передаем в функцию applyMiddleware
//так как мы работаем с TS необходимо store типизировать(знать с каким типами мы будем работать)
//получаем тип нашего состояния, а само состояние мы дотаем с помощью функции getState
//получаем тип диспатча
//импортируем сюда все редюсеры
//при создании корневого редюсера в функцию combineReducer мы передаем тот объект который импортировали
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import reducers from './reducers'

const rootReducer = combineReducers(reducers)

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState> //получаем типизацию store.getState
export type AppDispatch = typeof store.dispatch; //получаем типизацию store.dispatch