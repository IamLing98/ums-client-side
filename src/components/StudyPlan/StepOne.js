import React, { useState, useEffect } from "react";
import { Table, Button, Steps, Spin, Select, message } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CalendarOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap";
import EducationProgram from "./EducationProgram";
import { connect } from "react-redux";
import "react-table/react-table.css";
import { NavLink } from "react-router-dom";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";
import axios from "axios";

const { Option } = Select;

const StepOne = (props) => {
  const [subjectList, setSubjectList] = useState([]);

  const handleSubmitSubject = (values) => {
    let obj = {};
    obj.termId = props.selectedItem.id;
    obj.subjectId = values.subjectId;
    axios
      .post("/subjectsRegistration", obj)
      .then((res) => {
        message.success("Thành công!!!", 2.5);
        props.getListSubjectSubmitted();
      })
      .catch((err) => message.error(err.response.data.message, 2.5));
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
        console.log(record);
        return (
          <span style={{ textAlign: "center" }}>
            <Button
              disabled={
                record.submitted === false && props.selectedItem.progress === 12
                  ? false
                  : true
              }
              onClick={() => handleSubmitSubject(record)}
              type="primary"
            >
              {" "}
              <LoginOutlined />
              Đăng ký{" "}
            </Button>
          </span>
        );
      },
    },
  ];
  useEffect(() => {
    axios
      .get("/subjects")
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].submitted = false;
        }
        setSubjectList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let newList = [];
    for (var i = 0; i < subjectList.length; i++) {
      newList.push(subjectList[i]);
      newList[i].submitted = false;
    }
    for (var i = 0; i < props.submittedList.length; i++) {
      for (var j = 0; j < newList.length; j++) {
        if (props.submittedList[i].subjectId === newList[j].subjectId) {
          newList[i].submitted = true;
        }
      }
    }
    setSubjectList(newList);
  }, [props.submittedList]);
  return (
    <>
      <CardBody>
      <Spin tip="Không diễn ra..." spinning={props.selectedItem.progress === 12 ? false : true}>
      <Table
          size="small"
          pagination={{ size: "default" }}
          columns={columns}
          dataSource={subjectList}
          rowKey="subjectId"
        />
        </Spin>
         
      </CardBody>
    </>
  );
};

export default StepOne;
