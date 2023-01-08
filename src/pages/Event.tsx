import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {IEvent} from "../models/IEvent";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {createEvent, fetchEvents, fetchGuests} from '../store/reducers/event/actionCreators';

const Event: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {guests, events} = useAppSelector(state => state.eventReducer);
    const {user} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGuests());
        dispatch(fetchEvents(user.username));
    }, []);

    function onCancel(): void {
        setIsOpen(false);
    }

    function submitForm(event: IEvent): void {
        setIsOpen(false);
        dispatch(createEvent(event));
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center" style={{marginTop: '1em', marginBottom: '2em'}}>
                <Button onClick={() => setIsOpen(true)}>Добавить событие</Button>
            </Row>
            <Modal title="Добавить событие" open={isOpen} footer={null} onCancel={onCancel}>
                <EventForm submit={submitForm} guests={guests}/>
            </Modal>
        </Layout>
    );
};

export default Event;