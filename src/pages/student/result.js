import React, { useEffect, useState } from "react";
import { Divider, Avatar, Button, Select, PageHeader } from "antd";
import { Card, CardTitle, CardBody } from "reactstrap";
import MakePlanSteps from "../../components/StudyPlan/Steps";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Row, Col } from "reactstrap";
import ResultTable from "../../components/Result/Result";
import EducationProgram from "../../components/Result/EducationProgramDetail";

const Result = (props) => {
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
            <PageHeader className="site-page-header" title={"Kết quả học tập"} style={{ height: "56px" }}></PageHeader>
          </CardTitle>
          <CardBody>
            <Row>
              <Col md={12}>
                <Divider orientation="center">Chương trình đào tạo</Divider>
                <EducationProgram />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Divider orientation="center">Kết quả học tập</Divider>
              </Col>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Select
                style={{ width: "20%" }}
                placeholder="Học kỳ..."
                value={selectedItem}
                onChange={(value) => setSelectedItem(value)}
              >
                <Select.Option value={null} key={"termOptsSchedulenull"}>
                  Xem toàn bộ chương trình
                </Select.Option>
                {termList.map((term, index) => {
                  return (
                    <Select.Option value={term.id} key={"termOptsSchedule" + index}>
                      {"Học kỳ " + term.term + " năm " + term.year}
                    </Select.Option>
                  );
                })}
              </Select>
            </Row>
            <ResultTable />
          </CardBody>
        </Card>
      </div>
    );
  } else if (selectedItem) {
    return <MakePlanSteps selectedItem={selectedItem} setSelectedItem={setSelectedItem}></MakePlanSteps>;
  } else return <></>;
};

export default Result;
