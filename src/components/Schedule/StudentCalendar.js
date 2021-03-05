import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Tag } from "antd";

const Calendar = (props) => {
  const renderEventContent = (eventContent) => {
    console.log(eventContent);
    return (
      <>
        <Tag color="#108ee9" style={{ textAlign: "center", height: "100%" }}>
          <span>
            Thời gian: {eventContent.timeText}. Phòng: {eventContent.event._def.extendedProps.roomId}
          </span><br/>
          <span>Học phần:{eventContent.event.title}</span>
          <br />
          <span>Giảng viên: {eventContent.event._def.extendedProps.teacherName}</span>
          <br />
        </Tag>
      </>
    );
  };

  useEffect(() => {}, [props.eventList]);
  return (
    <div style={{ marginTop: "15px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "",
          center: "",
          right: "",
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
            default:
          }
        }}
        slotDuration="00:30:00"
        slotMinTime="07:00:00"
        slotMaxTime="18:00:00"
        //end custom
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        initialEvents={props.eventList} // alternatively, use the `events` setting to fetch from a feed
        eventContent={renderEventContent} // custom render function
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
