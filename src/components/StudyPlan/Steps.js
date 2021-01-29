import React, { useState, useEffect } from "react";
import { Tabs, Button, message, Menu, PageHeader } from "antd";
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap";
import {
  CloseOutlined,
  EyeOutlined,
  RollbackOutlined,
  FundOutlined,
  AppstoreOutlined,
  MailOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import "react-table/react-table.css";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";
import SubjectSubmitted from "./SubjectSubmitted";
import EducationProgram from "./EducationProgram";
import SubjectClassSubmitted from "./SubjectClassSubmitted";
import axios from "axios";

const { SubMenu } = Menu;

const { TabPane } = Tabs;

const PlanSteps = (props) => {
  const [showSSModal, setShowSSModal] = useState(false);

  const [educationProgramList, setEducationProgramList] = useState([]);

  const [showEducationProgramModal, setShowEducationProgramModal] = useState(
    false
  );
  const [submittedList, setSubmittedList] = useState([]);

  const [scsList, setSCSList] = useState([]);

  const [showSSCListModal, setShowSCSListModal] = useState(false);

  const [term, setTerm] = useState(null);

  const getListSubjectSubmitted = () => {
    axios
      .get("/subjectsRegistration/" + props.selectedItem.id)
      .then((res) => {
        setSubmittedList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getListSubjectClassSubmitted = () => {
    axios
      .get("/subjectClassRegistration/" + props.selectedItem.id)
      .then((res) => {
        setSCSList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getTermDetail = () => {
    axios
      .get("/terms/" + props.selectedItem.id)
      .then((res) => {
        setTerm(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSS = (values) => {
    axios
      .delete(
        "/subjectsRegistration/" +
          values.subjectId +
          "/" +
          props.selectedItem.id
      )
      .then((res) => {
        message.success("Đã xoá!!!", 2.5);
        getListSubjectSubmitted();
      })
      .catch((err) => message.success("Thất bại!!!", 2.5));
  };

  const getEducationProgram = () => {
    axios
      .get("/education-programs")
      .then((res) => {
        setEducationProgramList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListSubjectSubmitted();
    getEducationProgram();
    getTermDetail();
    getListSubjectClassSubmitted();
  }, []);

  return (
    <div>
      <Card>
        <CardTitle className="mb-0  border-bottom bg-light">
          <PageHeader
            className="site-page-header"
            onBack={() => props.setSelectedItem(null)}
            title={`Kế hoạch học tập kỳ ${props.selectedItem.term} năm ${props.selectedItem.year} `}
            extra={
              <Menu
                onClick={(value) => console.log(value)}
                selectedKeys={[1]}
                mode="horizontal"
              >
                <Menu.Item
                  key="mail"
                  onClick={() => setShowSSModal(true)}
                  icon={<MailOutlined />}
                >
                  Kế hoạch HT
                </Menu.Item>
                <Menu.Item
                  key="app"
                  onClick={() => setShowSCSListModal(true)}
                  icon={<AppstoreOutlined />}
                >
                  Lớp HP đã đăng ký
                </Menu.Item>
                <Menu.Item
                  key="alipay"
                  onClick={() => setShowEducationProgramModal(true)}
                  icon={<FundOutlined />}
                >
                  Chương trình đào tạo
                </Menu.Item>
              </Menu>
            }
          ></PageHeader>
        </CardTitle>
        <Tabs defaultActiveKey="2" type="card" size={"small"}>
          <TabPane tab="Đăng ký kế hoạch học tập" key="1">
            <StepOne
              selectedItem={props.selectedItem}
              getListSubjectSubmitted={getListSubjectSubmitted}
              submittedList={submittedList}
            />
          </TabPane>
          <TabPane tab="Đăng ký lớp học phần" key="2">
            <StepTwo
              term={term}
              submittedList={scsList}
              getListSubjectClassSubmitted={getListSubjectClassSubmitted}
            />
          </TabPane>
          <TabPane tab="Đăng ký điều chỉnh" key="3">
            {/* <StepThree   term={term} getTermDetail={getTermDetail} /> */}
          </TabPane>
        </Tabs>
      </Card>
      <SubjectSubmitted
        visible={showSSModal}
        setShowSSModal={setShowSSModal}
        submittedList={submittedList}
        handleDeleteSS={handleDeleteSS}
      />
      <SubjectClassSubmitted
        visible={showSSCListModal}
        setShowSCSListModal={setShowSCSListModal}
        scsList={scsList}
        getListSubjectClassSubmitted={getListSubjectClassSubmitted}
        // handleDeleteSS={handleDeleteSS}
      />
      <EducationProgram
        isModalVisible={showEducationProgramModal}
        setShowEducationProgramModal={setShowEducationProgramModal}
        educationProgramList={educationProgramList}
      />
    </div>
  );
};

export default PlanSteps;
