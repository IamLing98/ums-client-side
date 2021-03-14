import React, { useEffect, useState } from "react";
import { PageHeader, Spin } from "antd";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import ClassList from "../../components/Class";

const Class = (props) => {
  const employeeInfo = useSelector((state) => state.authReducer.user);

  const [loading, setLoading] = useState(true);

  const [yearClass, setYearClass] = useState(null);

  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(employeeInfo);
    if (employeeInfo) {
      let yearClass = employeeInfo.yearClassDTO;
      setYearClass(yearClass);
      setTitle(
        `Lớp  ${yearClass.classId} - ${yearClass.className}. Sĩ số: ${yearClass.studentDTOList.length} sinh viên `,
      );
      setLoading(false);
    }
  }, [employeeInfo]);

  if (loading) {
    return <Spin spinning={loading}> </Spin>;
  } else {
    return (
      <Card>
        <CardTitle className="mb-0  border-bottom bg-light">
          <PageHeader
            className="site-page-header"
            title={title}
            style={{ height: "56px" }}
          ></PageHeader>
        </CardTitle>
        <CardBody>
          <Row>
            <Col md={12}>
              {/* <Select
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
                </Select> */}
            </Col>
          </Row>
          <ClassList data={yearClass.studentDTOList} />
        </CardBody>
      </Card>
    );
  }
};

export default Class;
