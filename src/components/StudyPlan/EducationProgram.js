import React, {useEffect, useState} from "react";
import {Modal , Button} from 'antd';
const EducationProgram = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      props.setShowEducationProgramModal(false);
    };
  
    const handleCancel = () => {
      props.setShowEducationProgramModal(false);
    };
  
    useEffect(()=>{
        setIsModalVisible(props.isModalVisible);
    },[props.isModalVisible])
    
    return (
      <> 
        <Modal title="Chương trình đào tạo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    )
};

export default EducationProgram;
