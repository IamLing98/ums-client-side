import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Row } from "reactstrap";

const EducationProgramDetail = (props) => {
  const [educationProgram, setEducationProgram] = useState(null);

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
    {
      title: "CPA:",
      values: props.CPA ? props.CPA : "",
    },
  ];

  const educationColumn = [
    {
      title: "Danh mục",
      dataIndex: "title",
      render: (text, record) => {
        return <strong style={{ fontWeight: "700" }}>{text}</strong>;
      },
      width:"50%"
    },
    {
      title: "Giá trị",
      dataIndex: "values",
    },
  ];

  useEffect(() => {
    if (props.educationProgram) {
      setEducationProgram(props.educationProgram)
    }
  }, [props.educationProgram]);

  return (
    <Row style={{display:"block"}}  >
      <Table
        bordered
        rowKey="title"
        size="small"
        style={{maxWidth:"50%", margin:"0 auto"}}
        showHeader={false}
        pagination={false}
        columns={educationColumn}
        dataSource={educationData ? educationData : []}
      />
    </Row>
  );
};

export default EducationProgramDetail;
