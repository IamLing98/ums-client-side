import React, { useState, useEffect } from "react";
import { Table, Button, Steps, Input, Select, message } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CalendarOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap";
import EducationProgram from "./EducationProgram";
import SubjectSubmitted from "./SubjectSubmitted";
import { connect } from "react-redux";
import "react-table/react-table.css";
import { NavLink } from "react-router-dom";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";
import axios from "axios";

const { Step } = Steps;

const { Option } = Select;

const StepOne = (props) => {
  const [subjectList, setSubjectList] = useState([]);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [step, setStep] = useState(0);

  const [subjectId, setSubjectId] = useState(null);

  const [subjectName, setSubjectName] = useState(null);

  const [educationProgramList, setEducationProgramList] = useState([]);

  const [educationProgramId, setEducationProgramId] = useState(undefined);

  const [showEducationProgramModal, setShowEducationProgramModal] = useState(
    false
  );

  const [showSubjectSubmittedModal, setShowSubjectSubmittedModal] = useState(
    false
  );

  const [submittedList, setSubmittedList] = useState([]);

  const handleSubmitSubject = (values) => {
    values.termId = props.selectedItem.id;
    axios
      .post("/subjectsRegistration", values)
      .then((res) => {
        message.success("Thành công!!!", 2.5);
        getListSubjectSubmitted();
      })
      .catch((err) => message.error(err.response.data.message, 2.5));
  };

  const handleDeleteSubjectSubmmited = (values) => {
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

  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
      width: "20%",
      align: "center",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      width: "70%",
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "subjectName",
      render: (text, record) => {
        return (
          <span style={{ textAlign: "center" }}>
            <Button onClick={() => handleSubmitSubject(record)} type="primary">
              {" "}
              <LoginOutlined />
              Đăng ký{" "}
            </Button>
          </span>
        );
      },
    },
  ];

  const getListSubjectSubmitted = () => {
    axios
      .get("/subjectsRegistration/" + props.selectedItem.id)
      .then((res) => {
        setSubmittedList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/subjects")
      .then((res) => {
        setSubjectList(res.data);
        getListSubjectSubmitted();
      })
      .catch((err) => console.log(err));

    axios
      .get("/education-programs")
      .then((res) => {
        setEducationProgramList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="mb-0 p-3 border-bottom  -btn">
        <br />
        <Row>
          <Col sm="2">
            <Input
              placeholder="Mã học phần"
              suffix={<CalendarOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
            />
          </Col>
          <Col sm="2">
            <Input
              placeholder="Tên học phần"
              suffix={<CalendarOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
            />
          </Col>
          <Col sm="2">
            <Select
              style={{ width: "100%" }}
              placeholder="Chương trình đào tạo"
            >
              {educationProgramList.map((item) => (
                <Option
                  value={item.educationProgramId}
                  key={item.educationProgramId}
                >
                  {item.educationProgramName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col sm="6" className="text-right">
            <Button
              type="primary"
              style={{ background: "red", borderColor: "yellow" }}
              onClick={() => setShowSubjectSubmittedModal(true)}
            >
              {" "}
              <EyeOutlined /> Đã đăng ký
            </Button>{" "}
            <Button
              type="primary"
              onClick={() => setShowEducationProgramModal(true)}
            >
              <EyeOutlined /> Xem CTDT
            </Button>
          </Col>
        </Row>

        <br />
      </div>
      <CardBody>
        <Table columns={columns} dataSource={subjectList} rowKey="subjectId" />
      </CardBody>
      <EducationProgram
        isModalVisible={showEducationProgramModal}
        setShowEducationProgramModal={setShowEducationProgramModal}
      />
      <SubjectSubmitted
        isModalVisible={showSubjectSubmittedModal}
        setShowSubjectSubmittedModal={setShowSubjectSubmittedModal}
        submittedList={submittedList}
        handleDeleteSubjectSubmmited={handleDeleteSubjectSubmmited}
      />
    </>
  );
};

export default StepOne;
