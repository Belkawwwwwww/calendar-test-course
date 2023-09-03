import {IUser} from "../../../models/IUsers";
import {IEvent} from "../../../models/IEvent";

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
