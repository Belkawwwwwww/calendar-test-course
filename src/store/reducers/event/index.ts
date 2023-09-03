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
