import React, { useEffect, useState } from "react";
import {  PageHeader } from "antd";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import MakePlanSteps from "../../components/StudyPlan/Steps";
// import axios from "axios";
// import Calendar from "../../components/Schedule/calendar";

const News = (props) => {
  

  const [selectedItem, setSelectedItem] = useState(null); 

  useEffect(() => {

  }, []);

  if (selectedItem === null) {
    return (
      <div>
        <Card>
          <CardTitle className="mb-0  border-bottom bg-light">
            <PageHeader className="site-page-header" title={"Tin tức"} style={{ height: "56px" }}></PageHeader>
          </CardTitle>
          <CardBody>
            <Row>
              <Col md={12}> 
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

export default News;
