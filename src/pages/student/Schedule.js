import React, { useEffect, useState } from "react";
import { List, Avatar, Button, Select, PageHeader } from "antd";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import MakePlanSteps from "../../components/StudyPlan/Steps";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
// import Calendar from "../../components/Schedule/calendar";

const Schedule = (props) => {
  const [termList, setTermList] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const extractTermList = (termList = []) => {
    termList.forEach(function (item) {
      item.title = "Học kỳ " + item.term + " năm " + item.year;
      if (item.status === 1) {
        item.description = "Đang diễn ra";
      } else if (item.status === 2) {
        item.description = "Học kỳ sắp tới";
      } else {
        item.description = "Đã kết thúc";
      }
    });
    return termList;
  };

  useEffect(() => {
    axios
      .get("/terms")
      .then((res) => {
        setTermList(extractTermList(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  if (selectedItem === null) {
    return (
      <div>
        <Card>
          <CardTitle className="mb-0  border-bottom bg-light">
            <PageHeader className="site-page-header" title={"Thời khoá biểu"} style={{ height: "56px" }}></PageHeader>
          </CardTitle>
          <CardBody>
            <Row>
              <Col md={12}>
                <Select style={{ width: "20%" }} placeholder="Học kỳ...">
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
            {/* <Calendar   /> */}
          </CardBody>
        </Card>
      </div>
    );
  } else if (selectedItem) {
    return <MakePlanSteps selectedItem={selectedItem} setSelectedItem={setSelectedItem}></MakePlanSteps>;
  } else return <></>;
};

export default Schedule;
