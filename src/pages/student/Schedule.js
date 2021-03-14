import React, { useEffect, useState } from "react";
import { Select, PageHeader, Spin } from "antd";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import moment from "moment";
import { timeNumberTable } from "../../components/StudyPlan/util";
import Calendar from "../../components/Schedule/StudentCalendar";

//new Date that is start of Week
var startOfWeek = moment().startOf("week").toDate();

let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}

const Schedule = (props) => {
  const [termList, setTermList] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [eventList, setEventList] = useState([]);

  const [loading, setLoading] = useState(true);

  const extractTermList = (termList = []) => {
    termList.forEach(function (item) {
      if (item.status === 3) setSelectedItem(item.id);
    });
    return termList;
  };

  const processSubjectClassList = (subjectClassList) => {
    let events = [];
    subjectClassList.forEach((subjectClass, index) => {
      let hourOfDay = parseInt(subjectClass.hourOfDay);
      let duration = parseInt(subjectClass.duration);
      let start =
        moment(startOfWeek).add(subjectClass.dayOfWeek, "days").format("YYYY-MM-DD") +
        " ";
      let end = start;
      let startTimeSlot = timeNumberTable[hourOfDay - 1].start;
      let endTimeSlot = timeNumberTable[hourOfDay + duration - 2].end;
      start += `${startTimeSlot.hour}:${startTimeSlot.min}:${startTimeSlot.s}`;
      end += `${endTimeSlot.hour}:${endTimeSlot.min}:${endTimeSlot.s}`;
      console.log(start, end);
      let newEvent = {
        id: index,
        title: subjectClass.subjectName,
        start: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
        end: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
        roomId: subjectClass.roomId,
        teacherName: subjectClass.teacherName,
      };
      events.push(newEvent);
    });
    setTimeout(() => setLoading(false), 500);
    return events;
  };

  const getListSubjectClassSubmitted = () => {
    setLoading(true);
    axios
      .get(`/subjectClassRegistration/${selectedItem}?status=1`)
      .then((res) => {
        let { data } = res;
        let events = processSubjectClassList(data.listSubjectClass);
        console.log("events:", events);
        setEventList([...events]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/terms")
      .then((res) => {
        setTermList(extractTermList(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getListSubjectClassSubmitted(selectedItem);
    if (selectedItem) {
      getListSubjectClassSubmitted(selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    console.log("eventsLisT:", eventList);
  }, [JSON.stringify(eventList)]);

  if (loading || !selectedItem) {
    return <Spin spinning={loading}> </Spin>;
  } else {
    if (selectedItem) {
      return (
        <div>
          <Card>
            <CardTitle className="mb-0  border-bottom bg-light">
              <PageHeader
                className="site-page-header"
                title={"Thời khoá biểu"}
                style={{ height: "56px" }}
              ></PageHeader>
            </CardTitle>
            <CardBody>
              <Row>
                <Col md={12}>
                  <Select
                    style={{ width: "20%" }}
                    placeholder="Học kỳ..."
                    value={selectedItem}
                    onChange={(value) => setSelectedItem(value)}
                  >
                    {termList.map((term, index) => {
                      return (
                        <Select.Option value={term.id} key={"termOptsSchedule" + index}>
                          {"Học kỳ " + term.term + " năm " + term.year}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
              </Row>
              <Calendar eventList={eventList} />
            </CardBody>
          </Card>
        </div>
      );
    } else return <>k co gi</>;
  }
};

export default Schedule;
