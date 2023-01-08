import {IUser} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEvent} from "../../../models/IEvent";

export interface IEventState {
    guests: IUser[];
    events: IEvent[];
};

const initialState: IEventState = {
    events: [],
    guests: []
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents(state, action: PayloadAction<IEvent[]>){
            state.events = action.payload;
        },
        setGuests(state, action: PayloadAction<IUser[]>){
            state.guests = action.payload;
        }
    }
})

export default eventSlice.reducer;