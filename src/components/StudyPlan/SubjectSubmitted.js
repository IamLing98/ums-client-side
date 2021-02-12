import React, { useEffect  } from "react";
import { Modal, Button,  Table } from "antd"; 

const SubjectSubmitted = (props) => {
  const handleOk = () => {
    props.setShowSSModal(false);
  };

  const handleCancel = () => {
    props.setShowSSModal(false);
  };

  useEffect(() => {}, [props.isModalVisible]);
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
      title: "Thao tác",
      dataIndex: "numberOfSeats",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                // handleSubmitSubjectClass(record);
              }}
            >
              Huỷ
            </Button>
          </>
          // <Button
          //   type="primary"
          //   style={{ width: "105px", background: "#E65539" }}
          // >
          //   <CloseSquareOutlined /> Huỷ
          // </Button> }
        );
      },
    },
  ];
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
        maskClosable={false}
      > 
          <Table
            size="small"
            columns={columns}
            pagination={false}
            dataSource={props.submittedList}
            rowKey="subjectClassId"
            bordered
            style={{minHeight:"300px"}}
          /> 
      </Modal>
    </>
  );
};

export default SubjectSubmitted;
