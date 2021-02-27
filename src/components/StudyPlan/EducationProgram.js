import React, { useState, useEffect } from "react";
import { Modal, Table, Divider, Select } from "antd";
import { Row, Col } from "reactstrap";

const EducationProgram = (props) => {
  const [educationProgram, setEducationProgram] = useState(null);

  const [currentTerm, setCurrentTerm] = useState(1);

  const [listSubjectWithTerm, setListSubjectWithTerm] = useState([]);

  const [subjectDataSource, setSubjectDataSource] = useState([]);

  const handleOk = () => {
    props.setShowEducationProgramModal(false);
  };

  const handleCancel = () => {
    props.setShowEducationProgramModal(false);
  };

  const educationData = [
    {
      title: "Mã chương trình đào tạo:",
      values: educationProgram ? educationProgram.educationProgramId : "",
    },
    {
      title: "Tên chương trình đào tạo:",
      values: educationProgram ? educationProgram.educationProgramName : "",
    },
    {
      title: "Tổng số tín chỉ:",
      values: educationProgram ? educationProgram.totalEachSubject : "",
    },
    {
      title: "Số học kỳ:",
      values: educationProgram ? educationProgram.totalTerm : "",
    },
  ];

  const educationColumn = [
    {
      title: "Danh mục",
      dataIndex: "title",
      render: (text, record) => {
        return <strong style={{ fontWeight: "700" }}>{text}</strong>;
      },
    },
    {
      title: "Giá trị",
      dataIndex: "values",
    },
  ];

  const subjectListColumn = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
      align: "center",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
    },
    {
      title: "Số tín chỉ",
      dataIndex: "eachSubject",
      align: "center",
    },
  ];

  useEffect(() => {
    if (props.educationProgram) {
      setEducationProgram(props.educationProgram);
      let newListSj = [];
      for (var i = 1; i <= props.educationProgram.totalTerm; i++) {
        let listSubject = [];
        for (var j = 0; j < props.educationProgram.subjectList.length; j++) {
          if (props.educationProgram.subjectList[j].term === i) {
            listSubject.push({ ...props.educationProgram.subjectList[j] });
          }
        }
        newListSj.push(listSubject);
      }
      console.log(newListSj);
      setListSubjectWithTerm(newListSj);
    }
  }, [props.educationProgram]);

  return (
    <>
      <Modal
        title="Chương trình đào tạo"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="70%"
        okText="Đóng"
        forceRender
        maskClosable={false}
        footer={
          <>
            <div style={{ width: "100%", padding: "0 7px", textAlign: "left", fontSize: "16px" }}></div>
          </>
        }
      >
        <Row>
          <Col md={12} style={{ display: "block" }}>
            <Divider orientation="left">Thông tin chương trình đào tạo</Divider>
            <Table
              bordered
              rowKey="title"
              showHeader={false}
              pagination={false}
              columns={educationColumn}
              dataSource={educationData ? educationData : []}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ display: "block" }}>
            <Divider orientation="left">Danh mục học phần</Divider>
            <Row style={{ marginBottom: "15px" }}>
              <Col>
                <Select
                  placeholder="Kỳ học..."
                  value={currentTerm}
                  onChange={(term) => {
                    setCurrentTerm(term);
                    console.log("datasource: ", listSubjectWithTerm[term - 1]);
                    setSubjectDataSource(listSubjectWithTerm[term - 1]);
                  }}
                  style={{ width: "50%" }}
                >
                  {listSubjectWithTerm.map((term, index) => (
                    <Select.Option key={"termListasdsa" + index} value={index + 1}>
                      Học kỳ: {index + 1}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Table
              bordered
              rowKey="subjectId"
              columns={subjectListColumn}
              pagination={false}
              dataSource={[...subjectDataSource]}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default EducationProgram;
