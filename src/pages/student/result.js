import React, { useState, useEffect } from "react";
import { Table, Button } from "antd"; 
import { SearchOutlined } from '@ant-design/icons';
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap";
import { connect } from "react-redux";
import "react-table/react-table.css";
import { NavLink } from "react-router-dom";

import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";
import axios from "axios";

const columns = [
  {
    title: "Mã học phần",
    dataIndex: "subjectId",
  },
  {
    title: "Tên học phần",
    dataIndex: "subjectName",
  },
  {
    title: "Đánh giá",
    dataIndex: "subjectName", 
    render: (text, record) => {
        return <span>A</span>
      },
  },
  {
    title: "Thao tác",
    dataIndex: "subjectName",
    render: (text, record) => {
      return <span><Button type="primary">Xem chi tiết</Button></span>
    },
  },
];
const Result = (props) => {
  const [subjectList, setSubjectList] = useState([]);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys)
  };

  const rowSelection = {
    selectedRowKeys,
    onChange:e =>  onSelectChange(e),
  };

  useEffect(() => {
    axios
      .get("/subjects")
      .then((res) => {
        setSubjectList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col sm="6">
              <i className="mdi mdi-border-right mr-2"></i>Kết quả học tập
            </Col>
            <Col sm="6" className="text-right">
              <Button 
              >
                Xem CTDT
              </Button>
            </Col>
          </Row>
        </CardTitle>
        <CardBody>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={subjectList}
            rowKey="subjectId"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Result;
