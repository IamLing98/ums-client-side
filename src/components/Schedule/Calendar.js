import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import moment from "moment";
import { timeNumberTable } from "../StudyPlan/util";

// buoc 1: tao 1 new date,
// buoc 2: tim ngay bat dau trong tuan tu new date ngay
// buoc 3: tu ngay nay, + voi ngay dien radio
// buoc 4 tao cac event,

//

//new Date that is start of Week
var startOfWeek = moment().startOf("week").toDate();

let eventGuid = 0;

let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  { id: 0, title: "Marketing căn bản", start: "2021-03-02T07:00:00", end: "2021-03-02T09:45:00" },
  { id: 1, title: "Phương pháp tính", start: "2021-03-05T14:25:00", end: "2021-03-05T17:20:00" },
  { id: 2, title: "Tiếng Anh cơ bản (GE 4) ", start: "2021-03-04T07:00:00", end: "2021-03-04T09:45:00" },
  { id: 3, title: "Phương pháp nghiên cứu khoa học", start: "2021-03-02T13:25:00", end: "2021-03-02T16:20:00" },
];

export function createEventId() {
  return String(eventGuid++);
}

const Calendar = (props) => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const [currentEvents, setCurrentEvents] = useState([]);

  const renderEventContent = (eventContent) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible((value) => (value = !value));
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (alert(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  useEffect(() => { 
  }, [props.eventList]);
  return (
    <div style={{ marginTop: "15px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="timeGridWeek"
        editable={true}
        //custom
        hiddenDays={[0, 6]}
        dateAlignment="week"
        dayHeaderFormat={(values) => {
          switch (values.date.day) {
            case 1:
              return ["Thứ hai"];
            case 2:
              return ["Thứ ba"];
            case 3:
              return ["Thứ tư"];
            case 4:
              return ["Thứ năm"];
            case 5:
              return ["Thứ sáu"];
          }
        }}
        slotDuration="00:30:00"
        slotMinTime="07:00:00"
        slotMaxTime="18:00:00"
        //end custom
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={props.eventList} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
    </div>
  );
};

export default Calendar;
