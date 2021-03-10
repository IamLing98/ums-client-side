import React, { useEffect } from "react";
import { Modal } from "antd";
import { Row, Col } from "reactstrap";

function confirm() {
  Modal.confirm({
    title: "Confirm",
    icon: <ExclamationCircleOutlined />,
    content: <div>as</div>,
    okText: "确认",
    cancelText: "取消",
  });
}

const ImportExcel = (props) => {
  useEffect(() => {
    if (props.term) {
      if (props.term.status === 3 || props.term.progress === 22) {
        let newCl = [...columns];
        newCl.pop();
        setCl([...newCl]);
      } else setCl([...columns]);
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
      {confirm()}
    </>
  );
};

export default ImportExcel;
