import React, { useEffect, useState } from "react";
import { Divider, Select, PageHeader } from "antd";
import { Card, CardTitle, CardBody } from "reactstrap";
import axios from "axios";
import { Row, Col } from "reactstrap";
import ResultTable from "../../components/Result/Result";
import EducationProgram from "../../components/Result/EducationProgramDetail";
import { useSelector } from "react-redux";

const Result = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const [result, setResult] = useState();

  const [loading, setLoading] = useState(true);

  const [subjectList, setSubjectList] = useState([]);

  const [studentSubjectList, setStudentSubjectList] = useState([]);

  const [CPA, setCPA] = useState();

  const [selectedTerm, setSelectedTerm] = useState(null);

  const userInfo = useSelector((state) => state.authReducer.user);
  console.log("userInfo:", userInfo);

  const getResult = (studentId) => {
    axios
      .get(`/results/details/${studentId}`)
      .then((res) => {
        let { data } = res;
        setResult(res.data);
        setStudentSubjectList(res.data.educationProgramDTO.studentSubjects);
        let CPA = 0.0;
        for (var i = 0; i < data.resultDTOs.length; i++) {
          let term = data.resultDTOs[i];
          CPA += term.GPA;
        }
        CPA = CPA / data.resultDTOs.length;
        setCPA(CPA);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getResult(userInfo.studentId);
  }, []);

  if (!loading) {
    return (
      <div>
        <Card>
          <CardTitle className="mb-0  border-bottom bg-light">
            <PageHeader
              className="site-page-header"
              title={"Kết quả học tập"}
              style={{ height: "56px" }}
            ></PageHeader>
          </CardTitle>
          <CardBody>
            <Row>
              <Col md={12}>
                <Divider orientation="center">Chương trình đào tạo</Divider>
                <EducationProgram
                  CPA={CPA}
                  educationProgram={result.educationProgramDTO}
                />
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
                onChange={(value) => {
                  if (value) {
                    let term = result.resultDTOs.find((item) => item.term.id === value);
                    setSubjectList(term.subjectClassRegistrationList);
                    setSelectedTerm(term);
                  } else {
                    setSubjectList(studentSubjectList);

                    setSelectedTerm(null);
                  }
                  setSelectedItem(value);
                }}
              >
                <Select.Option value={null} key={"termOptsSchedulenull"}>
                  Xem toàn bộ chương trình
                </Select.Option>
                {result.resultDTOs.map((term, index) => {
                  return (
                    <Select.Option value={term.term.id} key={"termOptsSchedule" + index}>
                      {"Học kỳ " + term.term.term + " năm " + term.term.year}
                    </Select.Option>
                  );
                })}
              </Select>
            </Row>
            <ResultTable
              selectedItem={selectedItem}
              selectedTerm={selectedTerm}
              data={subjectList}
            />
          </CardBody>
        </Card>
      </div>
    );
  } else return <></>;
};

export default Result;
