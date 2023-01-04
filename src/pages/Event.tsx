import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const {guests, events} = useSelector((state: RootState) => state.eventReducer);
    const {user} = useSelector((state: RootState) => state.authReducer);
    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username);
    }, []);

    function onCancel(): void {
        setIsOpen(false);
    }

    function submitForm(event: IEvent): void {
        setIsOpen(false);
        createEvent(event);
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