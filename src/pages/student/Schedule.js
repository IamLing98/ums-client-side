import React, { useEffect, useState } from "react";
import { List, Avatar, Button, Select, PageHeader } from "antd";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import MakePlanSteps from "../../components/StudyPlan/Steps";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { timeNumberTable } from "../../components/StudyPlan/util";
import Calendar from "../../components/Schedule/Calendar";

//new Date that is start of Week
var startOfWeek = moment().startOf("week").toDate();

let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}

let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const Schedule = (props) => {
  const [termList, setTermList] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [eventList, setEventList] = useState([]);

  const [totalSubjectClassSubmitted, setTotalSubjectClassSubmitted] = useState(0);

  const [scsList, setSCSList] = useState([]);

  const [loading, setLoading] = useState(true);

  const extractTermList = (termList = []) => {
    termList.forEach(function (item) {
      if (item.status === 3) setSelectedItem(item.id);
    });
    return termList;
  };

  const processSubjectClassList = (subjectClassList) => {
    let events = [
      {
        id: createEventId(),
        title: "All-day event",
        start: todayStr,
      },
    ];
    subjectClassList.forEach((subjectClass, index) => {
      let hourOfDay = parseInt(subjectClass.hourOfDay);
      let duration = parseInt(subjectClass.duration);
      let start = moment(startOfWeek).add(subjectClass.dayOfWeek, "days").format("YYYY-MM-DD") + " ";
      let end = start;
      let startTimeSlot = timeNumberTable[hourOfDay - 1].start;
      let endTimeSlot = timeNumberTable[hourOfDay + duration - 1].end;
      start += `${startTimeSlot.hour}:${startTimeSlot.min}:${startTimeSlot.s}`;
      end += `${endTimeSlot.hour}:${endTimeSlot.min}:${endTimeSlot.s}`;
      console.log(start, end);
      let newEvent = {
        id: index,
        title: subjectClass.subjectName,
        start: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
        end: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
      };
      events.push(newEvent);
    });
    return events;
  };

  const getListSubjectClassSubmitted = () => {
    axios
      .get("/subjectClassRegistration/20202?status=1")
      .then((res) => {
        let { data } = res;
        setSCSList(data.listSubjectClass);
        setTotalSubjectClassSubmitted(data.totalSubjectClass);
        let events = processSubjectClassList(data.listSubjectClass);
        console.log("events:", events);
        setEventList([...events]);
        setLoading(false);
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
    getListSubjectClassSubmitted();
  }, []);

  useEffect(() => {
    console.log("eventsLisT:", eventList);
  }, [eventList]);

  if (loading) {
    return <div>Empty</div>;
  } else {
    if (selectedItem) {
      return (
        <div>
          <Card>
            <CardTitle className="mb-0  border-bottom bg-light">
              <PageHeader className="site-page-header" title={"Thời khoá biểu"} style={{ height: "56px" }}></PageHeader>
            </CardTitle>
            <CardBody>
              <Row>
                <Col md={12}>
                  <Select style={{ width: "20%" }} placeholder="Học kỳ..." value={selectedItem}>
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
    } else return <></>;
  }
};

export default Schedule;
