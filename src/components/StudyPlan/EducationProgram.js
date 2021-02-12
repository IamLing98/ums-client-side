import React, {useEffect } from "react";
import {Modal  } from 'antd';
const EducationProgram = (props) => { 
    const handleOk = () => {
      props.setShowEducationProgramModal(false);
    };
  
    const handleCancel = () => {
      props.setShowEducationProgramModal(false);
    };
  
    useEffect(()=>{ 
    },[props.visible])
    
    return (
      <> 
        <Modal title="Chương trình đào tạo"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
        okText="Đóng"
        forceRender
        maskClosable={false}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    )
};

export default EducationProgram;
