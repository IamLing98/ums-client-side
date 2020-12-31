import React, { useEffect, useState } from "react";
import { Modal, Button, Alert, Space } from "antd";
const SubjectSubmitted = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    props.setShowSubjectSubmittedModal(false);
  };

  const handleCancel = () => {
    props.setShowSubjectSubmittedModal(false);
  };

  useEffect(() => {
    setIsModalVisible(props.isModalVisible);
  }, [props.isModalVisible]);

  return (
    <>
      <Modal
        title="Học phần đã đăng ký"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
        okText="Đóng"
      >
        {props.submittedList.map((item, index) => (
          <Alert
            key={item.subjectId}
            message={
              <b>
                {index +
                  1 +
                  ". Mã học phần: " +
                  item.subjectId +
                  " - " +
                  item.subjectName}
              </b>
            }
            description={""}
            type="info"
            action={
              <Space direction="horizontal">
                <Button size="small" type="primary">
                  Chi tiết
                </Button>
                <Button
                  style={{ width: "100%" }}
                  size="small"
                  danger
                  type="ghost"
                  onClick={()=>props.handleDeleteSubjectSubmmited(item)}
                >
                  Xoá
                </Button>
              </Space>
            }
          />
        ))}
      </Modal>
    </>
  );
};

export default SubjectSubmitted;
