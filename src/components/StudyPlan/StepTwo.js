import React, { useState, useEffect } from "react";
import { Table, Button, message, Spin, Tag } from "antd";
import { LoginOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { CardBody } from "reactstrap";
import "react-table/react-table.css";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";
import axios from "axios";
import { daysOfWeek } from "./util";
import moment from "moment";

const StepTwo = (props) => {
  const [scheduleInfo, setScheduleInfo] = useState([]);

  const getSchedule = (termId) => {
    axios
      .get(`/subjectClasses/${termId}`)
      .then((res) => {
        let submittedList = props.submittedList;
        let newList = res.data;
        console.log("submttedList:,", submittedList.length);
        console.log("sche:,", newList.length);
        for (var i = 0; i < submittedList.length; i++) {
          for (var j = 0; j < newList.length; j++) {
            if (submittedList[i].subjectId === newList[j].subjectId) {
              newList[j].submitted = true;
            }
          }
        }
        setScheduleInfo(newList);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitSubjectClass = (values) => {
    console.log(values);
    let obj = {};
    obj.subjectClassId = values.subjectClassId;
    obj.termId = props.term.id;  
    axios
      .post(`/subjectClassRegistration`, obj)
      .then((res) => {
        message.success("Đăng ký thành công");
        getSchedule(props.term.id);
        props.getListSubjectClassSubmitted();
      })
      .catch((err) => message.error(err.response.data.message, 2.5));
  };

  useEffect(() => {
    if (props.term) {
      console.log("get schedule");
      getSchedule(props.term.id);
    }
  }, [props.term]);

  useEffect(() => {
    if (props.term) {
      console.log("get schedule");
      getSchedule(props.term.id);
    }
  }, [props.submittedList]);

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
          {daysOfWeek[record.dayOfWeek]} ({record.hourOfDay + "-" + (record.duration + record.hourOfDay - 1)})
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
          <Button
            type="primary"
            onClick={() => {
              handleSubmitSubjectClass(record);
            }}
            disabled={
              record.submitted === true || record.currentOfSubmittingNumber >= record.numberOfSeats ? true : false
            }
          >
            <LoginOutlined /> {record.currentOfSubmittingNumber >= record.numberOfSeats ? "Đã đầy" : "Đăng ký"}
          </Button>
        );
      },
    },
  ];

  const toFullDateMoment = (value) => {
    return moment(value).format("hh:mm' DD/MM/YYYY");
  };

  if (props.term == null) {
    return (
      <>
        <CardBody>
          <Spin tip="Không diễn ra..." spinning={true}></Spin>
        </CardBody>
      </>
    );
  }
  return (
    <>
      <CardBody>
        <Spin
          tip={
            props.term
              ? props.term.progress < 21
                ? "Chưa mở đăng ký lớp học phần"
                : props.term.progress > 21
                ? `Đã kết thúc đăng ký học phần ${toFullDateMoment(props.term.subjectCLassSubmittingEndDate)}`
                : ""
              : ""
          }
          spinning={props.term.progress === 21 ? false : true}
        >
          <Tag
            style={{ fontSize: "14px", lineHeight: "32px", marginBottom: "20px" }}
            icon={<ClockCircleOutlined />}
            color="default"
          >
            <strong>
              Bắt đầu: {toFullDateMoment(props.term ? props.term.subjectClassSubmittingStartDate : "")}. Kết thúc:{" "}
              {toFullDateMoment(props.term ? props.term.subjectCLassSubmittingEndDate : "")}
            </strong>
          </Tag>
          <Table
            size="small"
            columns={columns}
            pagination={{ size: "default" }}
            dataSource={scheduleInfo}
            rowKey="subjectClassId"
          />
        </Spin>
      </CardBody>
    </>
  );
};

export default StepTwo;
