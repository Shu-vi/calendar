import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Dayjs} from "dayjs";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    const dateCellRender = (value: Dayjs) => {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(e => e.date === formatedDate);
        return (
            <div>
                {
                    currentDayEvents.map((e, i) => {
                        return <div key={i} style={{color: '#AA2772', fontSize: 16}}>{e.description}</div>
                    })
                }
            </div>
        );
    };
    return (
        <Calendar dateCellRender={dateCellRender}/>
    );
};

export default EventCalendar;