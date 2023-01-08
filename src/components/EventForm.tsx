import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {formatDate} from "../utils/date";
import {Dayjs} from "dayjs";
import {useAppSelector} from "../hooks/redux";

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        guest: '',
        date: '',
        description: '',
        author: ''
    } as IEvent);
    const {user} = useAppSelector(state => state.authReducer);
    const [form] = Form.useForm();

    const selectDate = (date: Dayjs | null): void => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())});
        }
    }

    function addEvent(e: IEvent) {
        props.submit({...event, description: e.description, guest: e.guest, author: user.username});
        form.resetFields();
    }

    return (
        <Form onFinish={addEvent} form={form}>

            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required()]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}>
                <DatePicker onChange={selectDate}/>
            </Form.Item>

            <Form.Item
                label="Выберите гостя"
                name="guest"
                rules={[rules.required()]}
            >
                <Select
                    options={
                        props.guests.map(guest => (
                            {
                                label: guest.username,
                                value: guest.username
                            }
                        ))
                    }
                />
            </Form.Item>

            <Form.Item wrapperCol={{offset: 17}}>
                <Button type="primary" htmlType="submit">
                    Добавить
                </Button>
            </Form.Item>

        </Form>
    );
};

export default EventForm;