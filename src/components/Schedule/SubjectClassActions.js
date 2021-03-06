import React, { useEffect, useState } from "react";
import { Space, Button, Tooltip, Modal, Table } from "antd";
import { Row, Col } from "reactstrap";
import { DeliveredProcedureOutlined, ImportOutlined, RetweetOutlined, PrinterOutlined } from "@ant-design/icons";
import FileSaver from "file-saver";
import axios from "axios";

const SubjectClassActions = (props) => {
  const [subjectClass, setSubjectClass] = useState(null);

  useEffect(() => {
    if (props.visible) {
      console.log(props.visible);
      setSubjectClass(props.visible);
    }
  }, [JSON.stringify(props.visible)]);

  const handleOk = () => {
    props.setShowSubjectClassActions(false);
  };

  const handleCancel = () => {
    props.setShowSubjectClassActions(false);
  };

  const saveFile = (fileName) => { 
    FileSaver.saveAs(process.env.REACT_APP_API_URL + `/downloadFile/${fileName}`, "MyClassList.xlsx");
  };

  const handleCreateSubjectClassListExcel = (values) => {
    let excelData = {
      map: {
        subjectClassId: values.subjectClassId,
        subjectId: values.subject.subjectId,
        subjectName: values.subject.subjectName,
        term: values.term.term,
        year: values.term.year,
        teacherName: values.teacherName,
      },
      list: values.studentList.map((student, index) => {
        return {
          number: index,
          ...student,
          sex: student.sex === 1 ? "Nam" : "Nữ",
        };
      }),
    };
    console.log("excelData: ", excelData);
    axios
      .post(`/documents/excel?id=2`, excelData)
      .then((response) => {
        console.log(response.data);
        saveFile(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const educationData = [
    {
      title: "Mã lớp học phần:",
      values: subjectClass ? subjectClass.subjectClassId : "",
    },
    {
      title: "Mã học phần:",
      values: subjectClass ? subjectClass.subject.subjectId : "",
    },
    {
      title: "Tên học phần:",
      values: subjectClass ? subjectClass.subject.subjectName : "",
    },
    {
      title: "Số lượng sinh viên:",
      values: subjectClass ? subjectClass.studentList.length : "",
    },
  ];

  const educationColumn = [
    {
      title: "Danh mục",
      dataIndex: "title",
      render: (text, record) => {
        return <strong style={{ fontWeight: "700" }}>{text}</strong>;
      },
      width: "50%",
    },
    {
      title: "Giá trị",
      dataIndex: "values",
    },
  ];

  return (
    <Modal
      title="Thao tác"
      visible={props.visible}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      width="50%"
      okText="Đóng"
      maskClosable={false}
      footer={false}
    >
      <Row>
        <Col md={12} style={{ marginBottom: " 24px" }}>
          <Table
            size="small"
            bordered
            rowKey="title"
            showHeader={false}
            pagination={false}
            columns={educationColumn}
            dataSource={educationData ? educationData : []}
          />
        </Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Space size={30}>
          <Tooltip placement="topLeft" title="Báo bù">
            <Button
              style={{ width: "100px", height: "100px", lineHeight: "0", fontSize: "50px", backgroundColor: "#E8910D" }}
              size="large"
            >
              <RetweetOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title="Nhập điểm giữa kỳ">
            <Button
              style={{ width: "100px", height: "100px", lineHeight: "0", fontSize: "50px", backgroundColor: "#2098D1" }}
              size="large"
            >
              <ImportOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title="Nhập điểm cuối kỳ">
            <Button
              style={{ width: "100px", height: "100px", lineHeight: "0", fontSize: "50px", backgroundColor: "#2DBF64" }}
              size="large"
            >
              <DeliveredProcedureOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title="Tải danh sách lớp">
            <Button
              style={{ width: "100px", height: "100px", lineHeight: "0", fontSize: "50px", backgroundColor: "#44CCEB" }}
              size="large"
              onClick={() => handleCreateSubjectClassListExcel(subjectClass)}
            >
              <PrinterOutlined />
            </Button>
          </Tooltip>
        </Space>
      </Row>
    </Modal>
  );
};

export default SubjectClassActions;
