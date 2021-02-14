import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Modal } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import "react-table/react-table.css";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";
import { daysOfWeek } from "./util";
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
    title: "Đợt đăng ký",
    dataIndex: "progressSubmitted",
    align: "center",
    render: (text, record) => {
      if (text === 21) {
        return <span>Đăng ký chính thức</span>;
      } else {
        return <span>Đăng ký điều chỉnh</span>;
      }
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    align: "center",
    render: (text, record) => {
      if (text === 1) {
        return <Tag color="green">Thành công</Tag>;
      } else {
        return <Tag color="#f50">Đã huỷ</Tag>;
      }
    },
  },
];

const SubjectClassSubmitted = (props) => {
  const [colState, setColState] = useState([...columns]);

  const extractProgress = (value) => {
    if (props.term) {
      if (props.term.progress === 21) {
        return false;
      } else if (props.term.progress === 31) {
        if (value === 21) return true;
        else return false;
      }
    }
  };
  useEffect(() => {
    if (props.term) {
      if (props.term.progress === 21) {
        let newCols = [...colState];
        newCols.push({
          title: "Thao tác",
          dataIndex: "numberOfSeats",
          align: "center",
          render: (text, record) => {
            return (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    props.handleDeleteSCS(record);
                  }}
                  style={{ background: "#E65539", width: "105px" }}
                  disabled={extractProgress(record.progressSubmitted)}
                >
                  <CloseSquareOutlined /> Huỷ
                </Button>
              </>
            );
          },
        });
        setColState([...newCols]);
      }
    }
  }, [props.term]);

  const handleOk = () => {
    props.setShowSCSListModal(false);
  };

  const handleCancel = () => {
    props.setShowSCSListModal(false);
  };

  return (
    <>
      <Modal
        title="Lớp học phần đã đăng ký"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="70%"
        okText="Đóng"
        maskClosable={false}
        footer={
          <>
            <div style={{ width: "100%", padding: "0 7px", textAlign: "left", fontSize: "16px" }}>
              <strong>Tổng số tín chỉ: {props.totalSubjectClassSubmitted}</strong>{" "}
            </div>
          </>
        }
      >
        <Table
          size="small"
          columns={colState}
          pagination={false}
          dataSource={props.scsList}
          rowKey="subjectClassId"
          bordered
          style={{ minHeight: "300px" }}
        />
      </Modal>
    </>
  );
};

export default SubjectClassSubmitted;
