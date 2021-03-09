import React, { useEffect, useState } from "react";
import { Space, Button, Tooltip, Modal, Table, Upload, message, Spin } from "antd";
import { Row, Col } from "reactstrap";
import {
  DeliveredProcedureOutlined,
  ImportOutlined,
  RetweetOutlined,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FileSaver from "file-saver";
import axios from "axios";
import moment from "moment";

const SubjectClassActions = (props) => {
  const [subjectClass, setSubjectClass] = useState(null);

  const [showModalImport, setShowModalImport] = useState(false);

  const [fileList, setFileList] = useState(null);

  const [loading, setLoading] = useState(false);

  const importModalProps = {
    onRemove: (file) => {
      setFileList(null);
    },
    beforeUpload: (file) => {
      console.log(file.type);
      let fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      setFileList(file);
      if (file.type !== fileType) {
        message.error(`${file.name} is not a spread sheet file`);
      }
      return false;
    },
  };

  const handleUpload = () => {
    console.log(fileList);
    const formData = new FormData();
    formData.append("file", fileList);

    // You can use any AJAX library you like
    setLoading(true);
    axios
      .post(`/uploadFile`, formData)
      .then((response) => {
        console.log(response.data);
        let { data } = response;
        let subjectClassReg = { ...subjectClass };
        subjectClassReg.fileName = data.fileName;
        axios
          .put(
            `/subjectClasses/${subjectClass.subjectClassId}?actionType=UPDATE_MID_TERM_GRADE`,
            subjectClassReg,
          )
          .then((res) => {
            message.success("Cập nhật thành công: ", res.data.subjectClassId);
            props.getSchedule(props.selectedItem);
          })
          .catch((error) => {
            console.log(error);
          });
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  const handleOk = () => {
    props.setShowSubjectClassActions(false);
  };

  const handleCancel = () => {
    props.setShowSubjectClassActions(false);
  };

  useEffect(() => {
    if (props.visible) {
      console.log(props.visible);
      setSubjectClass(props.visible);
    }
  }, [JSON.stringify(props.visible)]);

  const saveFile = (fileName) => {
    FileSaver.saveAs(
      process.env.REACT_APP_API_URL + `/downloadFile/${fileName}`,
      `${fileName}`,
    );
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
    {
      title: "Đã vào điểm:",
      values: subjectClass ? (subjectClass.hasGrade ? "Đã vào điểm" : "Chưa") : "Chưa",
    },
    {
      title: "Ngày vào điểm:",
      values: subjectClass
        ? subjectClass.gradeImportTime
          ? moment(subjectClass.gradeImportTime).format("HH:MM DD.MM.YYYY")
          : ""
        : "",
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
    <Spin spinning={loading}>
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
                style={{
                  width: "100px",
                  height: "100px",
                  lineHeight: "0",
                  fontSize: "50px",
                  backgroundColor: "#E8910D",
                }}
                size="large"
              >
                <RetweetOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="topLeft" title="Nhập điểm">
              <Button
                style={{
                  width: "100px",
                  height: "100px",
                  lineHeight: "0",
                  fontSize: "50px",
                  backgroundColor: "#2098D1",
                }}
                onClick={() => setShowModalImport(true)}
                size="large"
              >
                <ImportOutlined />
              </Button>
            </Tooltip> 
            <Tooltip placement="topLeft" title="Tải danh sách lớp">
              <Button
                style={{
                  width: "100px",
                  height: "100px",
                  lineHeight: "0",
                  fontSize: "50px",
                  backgroundColor: "#44CCEB",
                }}
                size="large"
                onClick={() => handleCreateSubjectClassListExcel(subjectClass)}
              >
                <PrinterOutlined />
              </Button>
            </Tooltip>
          </Space>
        </Row>
        <Row>
          <Modal
            visible={showModalImport}
            centered
            onCancel={() => setShowModalImport(false)}
            footer={
              <div>
                <Button
                  disabled={!fileList}
                  onClick={() => handleUpload()}
                  type="primary"
                >
                  Tải lên
                </Button>
              </div>
            }
          >
            <Upload {...importModalProps} maxCount={1}>
              <Button icon={<UploadOutlined />}>Chọn file định dạng .xls,.xlsx</Button>
            </Upload>
          </Modal>
        </Row>
      </Modal>
    </Spin>
  );
};

export default SubjectClassActions;
