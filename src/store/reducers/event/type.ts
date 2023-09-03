import {IUser} from "../../../models/IUsers";
import {IEvent} from "../../../models/IEvent";

//Начинаем с типизации этого редюсера
//Создаем интерфейс, Добавляем поле - это поле типа IUser и это массив
//Это гости, потому что в рамках eventState - это гости, кот приглашают на события
//В этом же состоянии мы будем хранить сам массив эвентов, кот будут создавать пользователи
//Далее создадим перечисления в кот будем хранить типы экшенов
//Два типа:
//Для того, чтобы добавить пользователей в это состояние
//И для того, чтобы добавить событие в это состояние
//Теперь для каждого экшена создадим по интерфейсу
//В качестве payload мы ожидаем массив пользователей
//И для второго экшена тоже создаем интерфейс
//И здесь будем ожидать массив эвентов
//Сразу создадим тип, который будет обобщать эти два интерфейса
export interface EventState {
    guests: IUser[];
    events: IEvent[];
}

export enum EventActionEnum {
    SET_GUEST = "SET_GUEST",
    SET_EVENTS = "SET_EVENTS"
}

export interface SetGuestsAction {
    type: EventActionEnum.SET_GUEST;
    payload: IUser[]
}

export interface SetEventsAction {
    type: EventActionEnum.SET_EVENTS;
    payload: IEvent[]
}

export type EventAction =
    SetGuestsAction |
    SetEventsAction
