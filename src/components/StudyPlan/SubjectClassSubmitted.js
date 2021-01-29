import React, { useState, useEffect } from "react";
import { Table, Button, Steps, Input, Select, message, Modal } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CalendarOutlined,
  CloseSquareOutlined,
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
import { timeTable, daysOfWeek } from "./util";

const { Option } = Select;

const SubjectClassSubmitted = (props) => {
  useEffect(() => {
    // if (props.term) {
    //   getSchedule(props.term.activeSchedule);
    // }
  }, [props.term]);

  const columns = [
    {
      title: "Mã lớp",
      dataIndex: "subjectClassId",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Mã Học phần",
      dataIndex: "subjectId",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Tên Học Phần",
      dataIndex: "subjectName",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Số Tín",
      dataIndex: "eachSubject",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Kíp",
      dataIndex: "createdDate",
      align: "center",
      render: (text, record) => {
        if (record.hourOfDay > 5) {
          return <span>Buổi chiều</span>;
        } else return <span>Buổi sáng</span>;
      },
    },
    {
      title: "Thời Gian",
      dataIndex: "createdDate",
      align: "center",
      render: (text, record) => (
        <span>
          {daysOfWeek[record.dayOfWeek]} (
          {record.hourOfDay + "-" + (record.duration + record.hourOfDay - 1)})
        </span>
      ),
    },
    {
      title: "Phòng",
      dataIndex: "roomId",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Max",
      dataIndex: "numberOfSeats",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },

    {
      title: "ĐK",
      dataIndex: "currentOfSubmittingNumber",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "numberOfSeats",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                // handleSubmitSubjectClass(record);
              }}
            >
              <LoginOutlined /> Đăng ký
            </Button>
          </>
          // <Button
          //   type="primary"
          //   style={{ width: "105px", background: "#E65539" }}
          // >
          //   <CloseSquareOutlined /> Huỷ
          // </Button> }
        );
      },
    },
  ];

  const handleOk = () => {
    props.setShowSCSListModal(false);
  };

  const handleCancel = () => {
    props.setShowSCSListModal(false);
  };

  return (
    <>
      <Modal
        title="Học phần đã đăng ký"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
        okText="Đóng"
        maskClosable={false}
      >
        <Table
          size="small"
          columns={columns}
          pagination={{ size: "default" }}
          dataSource={props.scsList}
          rowKey="subjectClassId"
          bordered
        />
      </Modal>
    </>
  );
};

export default SubjectClassSubmitted;
