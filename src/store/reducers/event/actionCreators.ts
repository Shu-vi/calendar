import {IEvent} from "../../../models/IEvent";
import {EventActionEnum, ISetEventsAction, ISetGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
    setEvents: (payload: IEvent[]): ISetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    setGuests: (payload: IUser[]): ISetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const guests = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(guests.data));
        } catch (e) {
            console.log(e);
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json));
        } catch (e) {
            console.log(e);
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            const currentUsersEvents = json.filter((e: IEvent) => e.author === username || e.guest === username);
            dispatch(EventActionCreators.setEvents(currentUsersEvents));
        } catch (e) {
            console.log(e);
        }
    }
}