import React, { useState, useEffect } from "react";
import { Table  } from "antd"; 

const Result = (props) => {
  const [subjectList, setSubjectList] = useState([]);

  const columns = [
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
    {
      title: "Điểm hệ 10",
      dataIndex: "eachSubject",
      align: "center",
    },
    {
      title: "Điểm hệ 4",
      dataIndex: "eachSubject",
      align: "center",
    },
    {
      title: "Điểm chữ",
      dataIndex: "eachSubject",
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "eachSubject",
      align: "center",
    },
  ];

  useEffect(() => {}, [props.educationProgram]);

  return (
    <div style={{ marginTop: "15px" }}>
      <Table bordered rowKey="title" pagination={{ pageSize: 10 }} columns={columns} dataSource={subjectList} />
    </div>
  );
};

export default Result;
