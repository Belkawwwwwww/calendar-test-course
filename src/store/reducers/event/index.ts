//Создадим дефолтное состояние этого редюсера
//И сразу экспортируем отсюда по дефолту функцию - это будет сам редюсер
//Редюсер первым аргерментом принимает само состояние, А вторым экшн
//Создаем конструкцию switch в зависимости от типа экшена
//И сразу же обрабатываем дефектный случай
//И в нем мы просто возвращаем состояние
//Теперь созданные типы мы указываем для состояния
//И для экшена в самом редюсере
//Также в качестве возвращаемого значения в этой функции указываем eventState поскольку редюсер всегда должен возвращать состояние
//Среда разработки сразу подсказывает, что не хватает двух полей - это гости и эвенты
//Инициализируем по дефолту пустыми массивами
//Теперь в самом редюсеру в конструкции switch case
//Создадим пару кейсов для того чтобы поместить в состояние пользователя
//И чтобы поместить в состояние наше событие
//
import {EventAction, EventActionEnum, EventState} from "./type";

const initialState: EventState = {
    events: [],
    guests: []
}

export default function EventReducer(state = initialState, action: EventAction) : EventState {
    switch (action.type) {
        case EventActionEnum.SET_GUEST:
            return {...state, guests: action.payload}
        case EventActionEnum.SET_EVENTS:
            return {...state, events: action.payload}
        default:
            return state;
    }
}