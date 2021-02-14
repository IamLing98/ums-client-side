import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import moment from "moment";

const columns = [
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
    title: "Thời gian",
    dataIndex: "date",
    align: "center",
    render: (text, record) => {
      return <span>{moment(record.date).format("hh:mm DD/MM/YYYY")}</span>;
    },
  },
];
const SubjectSubmitted = (props) => {
  const [columnsState, setColumnsState] = useState([...columns]);

  const handleOk = () => {
    props.setShowSSModal(false);
  };

  const handleCancel = () => {
    props.setShowSSModal(false);
  };

  useEffect(() => {
    if (props.term) {
      if (props.term.progress === 12) {
        let newCl = [...columnsState]; 
        newCl.push({
          title: "Thao tác",
          dataIndex: "numberOfSeats",
          align: "center",
          render: (text, record) => {
            return (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    props.handleDeleteSS(record);
                  }}
                  style={{ background: "#E65539", width: "105px" }}
                >
                  <CloseSquareOutlined /> Xoá
                </Button>
              </>
            );
          },
        });
        setColumnsState([...newCl]); 
      }
    }
  }, [props.isModalVisible, props.term]);

  return (
    <>
      <Modal
        title="Học phần đã đăng ký"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="70%"
        okText="Đóng"
        forceRender
        footer={
          <>
            <div style={{ width: "100%", padding: "0 7px", textAlign: "left", fontSize: "16px" }}>
              <strong>Tổng số tín chỉ: {props.totalSubjectSubmitted}</strong>{" "}
            </div>
          </>
        }
        maskClosable={false}
      >
        <Table
          size="small"
          columns={columnsState}
          pagination={false}
          dataSource={props.submittedList}
          rowKey="subjectId"
          bordered
          style={{ minHeight: "300px" }}
        />
      </Modal>
    </>
  );
};

export default SubjectSubmitted;
