import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Spin, message, Tag, Input, Space } from "antd";
import { LoginOutlined, ClockCircleOutlined, SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { CardBody } from "reactstrap";
import "react-table/react-table.css";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";
import axios from "axios";
import moment from "moment";
import Highlighter from "react-highlight-words";

const StepOne = (props) => {
  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const getColumnSearchProps = (values) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm theo ${values.columnName}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, values.dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, values.dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }} icon={<ClearOutlined />}>
            Xoá
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[values.dataIndex] ? record[values.dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === values.dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
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
      ...getColumnSearchProps({
        dataIndex: "subjectId",
        columnName: "mã học phần",
      }),
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
    },
    {
      title: "Số tín chỉ",
      dataIndex: "eachSubject",
      align: "center",
    },
    {
      title: "Thao tác",
      align: "center",
      width: "10%",
      dataIndex: "subjectName",
      render: (text, record) => {
        return (
          <span style={{ textAlign: "center" }}>
            <Button disabled={record.submitted === true} onClick={() => handleSubmitSubject(record)} type="primary">
              <LoginOutlined />
              Đăng ký
            </Button>
          </span>
        );
      },
    },
  ];

  const toFullDateMoment = (value) => {
    return moment(value).format("hh:mm' DD/MM/YYYY");
  };
  useEffect(() => {
    let newList = [];
    var i;
    for (i = 0; i < props.subjectList.length; i++) {
      newList.push(props.subjectList[i]);
      newList[i].submitted = false;
    }
    for (i = 0; i < newList.length; i++) {
      for (var j = 0; j < props.submittedList.length; j++) {
        if (newList[i].subjectId === props.submittedList[j].subjectId) {
          newList[i].submitted = true;
        }
      }
    }
    props.setSubjectList([...newList]);
  }, [JSON.stringify(props.submittedList), JSON.stringify(props.subjectList)]);
  return (
    <>
      <CardBody>
        <Spin
          tip={
            props.term
              ? props.term.progress < 12
                ? "Chưa mở đăng ký học phần"
                : props.term.progress > 12
                ? `Đã đóng đăng ký học phần lúc: ${toFullDateMoment(props.term.subjectSubmittingEndDate)}`
                : ""
              : ""
          }
          spinning={props.term ? (props.term.progress === 12 ? false : true) : true}
          size="large"
        >
          <Tag
            style={{ fontSize: "14px", lineHeight: "32px", marginBottom: "20px" }}
            icon={<ClockCircleOutlined />}
            color="default"
          >
            <strong>
              Bắt đầu: {toFullDateMoment(props.term ? props.term.subjectSubmittingStartDate : "")}. Kết thúc:{" "}
              {toFullDateMoment(props.term ? props.term.subjectSubmittingEndDate : "")}
            </strong>
          </Tag>
          <Table
            size="small"
            pagination={{ size: "default" }}
            columns={columns}
            dataSource={props.subjectList}
            rowKey="subjectId"
          />
        </Spin>
      </CardBody>
    </>
  );
};

export default StepOne;
