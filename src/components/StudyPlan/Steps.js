import React, { useState, useEffect } from "react";
import { Tabs, message, Menu, PageHeader, Spin } from "antd";
import { Card, CardTitle } from "reactstrap";
import { FundOutlined, AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import "react-table/react-table.css";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";
import SubjectSubmitted from "./SubjectSubmitted";
import EducationProgram from "./EducationProgram";
import SubjectClassSubmitted from "./SubjectClassSubmitted";
import axios from "axios";

const { TabPane } = Tabs;

const PlanSteps = (props) => {
  //subject submitted
  const [showSSModal, setShowSSModal] = useState(false);

  const [totalSubjectSubmitted, setTotalSubjectSubmitted] = useState(0);

  const [submittedList, setSubmittedList] = useState([]);

  //subjectClass submitted

  const [scsList, setSCSList] = useState([]);

  const [totalSubjectClassSubmitted, setTotalSubjectClassSubmitted] = useState(0);

  const [showSSCListModal, setShowSCSListModal] = useState(false);

  const [educationProgramList, setEducationProgramList] = useState([]);

  const [showEducationProgramModal, setShowEducationProgramModal] = useState(false);

  const [term, setTerm] = useState(null);

  const [subjectList, setSubjectList] = useState([]);

  const [defaultTab, setDefaultTab] = useState("1");

  const [loading, setLoading] = useState(true);

  const getSubjectList = () => {
    axios
      .get("/subjects")
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].submitted = false;
        }
        setSubjectList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getListSubjectSubmitted = () => {
    axios
      .get("/subjectsRegistration/" + props.selectedItem.id)
      .then((res) => {
        setSubmittedList(res.data.listSubjectSubmitted);
        setTotalSubjectSubmitted(res.data.totalSubmitted);
      })
      .catch((err) => console.log(err));
  };

  const getListSubjectClassSubmitted = () => {
    axios
      .get("/subjectClassRegistration/" + props.selectedItem.id)
      .then((res) => {
        let { data } = res;
        setSCSList(data.listSubjectClass);
        setTotalSubjectClassSubmitted(data.totalSubjectClass);
      })
      .catch((err) => console.log(err));
  };

  const setTab = (progress) => {
    console.log("progress", progress);
    if (progress > 10 && progress < 20) {
      setDefaultTab("1");
    } else if (progress > 20 && progress < 30) {
      setDefaultTab("2");
    } else if (progress > 30) {
      setDefaultTab("3");
    }
  };
  const getTermDetail = () => {
    axios
      .get("/terms/" + props.selectedItem.id)
      .then((res) => {
        setTerm(res.data);
        setTab(res.data.progress);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSS = (values) => {
    axios
      .delete("/subjectsRegistration/" + values.subjectId + "/" + props.selectedItem.id)
      .then((res) => {
        message.success("Đã huỷ!!!", 2.5);
        getListSubjectSubmitted();
      })
      .catch((err) => message.error("Thất bại!!!", 2.5));
  };

  const handleDeleteSCS = (values) => {
    console.log(values);
    axios
      .delete(`/subjectClassRegistration/${values.subjectClassId}/${term.id}`)
      .then((res) => {
        message.success("Đã huỷ!!!", 2.5);
        getListSubjectClassSubmitted();
      })
      .catch((err) => message.error("Thất bại!!!", 2.5));
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
    getSubjectList();
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
              <Menu onClick={(value) => console.log(value)} selectedKeys={[1]} mode="horizontal">
                <Menu.Item key="mail" onClick={() => setShowSSModal(true)} icon={<MailOutlined />}>
                  Kế hoạch HT
                </Menu.Item>
                <Menu.Item key="app" onClick={() => setShowSCSListModal(true)} icon={<AppstoreOutlined />}>
                  Lớp HP đã đăng ký
                </Menu.Item>
                <Menu.Item key="alipay" onClick={() => setShowEducationProgramModal(true)} icon={<FundOutlined />}>
                  Chương trình đào tạo
                </Menu.Item>
              </Menu>
            }
          ></PageHeader>
        </CardTitle>
        <Spin spinning={loading}>
          <Tabs activeKey={defaultTab} type="card" size={"small"}>
            <TabPane tab="Đăng ký kế hoạch học tập" key="1">
              <StepOne
                selectedItem={props.selectedItem}
                getListSubjectSubmitted={getListSubjectSubmitted}
                submittedList={submittedList}
                term={term}
                subjectList={subjectList}
                setSubjectList={setSubjectList}
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
              <StepThree
                term={term}
                submittedList={scsList}
                getListSubjectClassSubmitted={getListSubjectClassSubmitted}
              />
            </TabPane>
          </Tabs>
          <SubjectSubmitted
            visible={showSSModal}
            setShowSSModal={setShowSSModal}
            submittedList={submittedList}
            totalSubjectSubmitted={totalSubjectSubmitted}
            handleDeleteSS={handleDeleteSS}
            term={term}
          />
          <SubjectClassSubmitted
            visible={showSSCListModal}
            setShowSCSListModal={setShowSCSListModal}
            scsList={scsList}
            getListSubjectClassSubmitted={getListSubjectClassSubmitted}
            handleDeleteSCS={handleDeleteSCS}
            totalSubjectClassSubmitted={totalSubjectClassSubmitted}
            term={term}
          />
          <EducationProgram
            visible={showEducationProgramModal}
            setShowEducationProgramModal={setShowEducationProgramModal}
            educationProgramList={educationProgramList}
          />
        </Spin>
      </Card>
    </div>
  );
};

export default PlanSteps;
