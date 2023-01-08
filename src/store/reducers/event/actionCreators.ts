import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";
import {eventSlice} from "./eventSlice";

export const fetchGuests = () => async (dispatch: AppDispatch) => {
    try {
        const guests = await UserService.getUsers();
        dispatch(eventSlice.actions.setGuests(guests.data));
    } catch (e) {
        console.log(e);
    }
}

export const createEvent = (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
        const events = localStorage.getItem('events') || '[]';
        const json = JSON.parse(events) as IEvent[];
        json.push(event);
        dispatch(eventSlice.actions.setEvents(json));
        localStorage.setItem('events', JSON.stringify(json));
    } catch (e) {
        console.log(e);
    }
}

export const fetchEvents = (username: string) => async (dispatch: AppDispatch) => {
    try {
        const events = localStorage.getItem('events') || '[]';
        const json = JSON.parse(events) as IEvent[];
        const currentUsersEvents = json.filter((e: IEvent) => e.author === username || e.guest === username);
        dispatch(eventSlice.actions.setEvents(currentUsersEvents));
    } catch (e) {
        console.log(e);
    }
}