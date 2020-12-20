import React, { useState, useEffect } from "react";
import {   Steps } from "antd"; 
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap"; 
import "react-table/react-table.css"; 
import StepOne from '../../components/subjectSubmit/stepOne';
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css"; 
const { Step } = Steps; 
const SubjectSumit = (props) => { 

  const [step, setStep] = useState(0);
  
   useEffect(()=>{

  },[])

  return (
    <div>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col sm="6">
              <i className="mdi mdi-border-right mr-2"></i>Đăng ký học phần
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Steps
                type="navigation"
                size="small"
                current={step}
                onChange={(step) => setStep(step)}
                className="site-navigation-steps"
              >
                <Step
                  title="Giai đoạn 1"
                  subTitle="15/10/2020"
                  status="finish"
                  description="Đăng ký học phần."
                />
                <Step
                  title="Giai đoạn 2"
                  subTitle="18/10/2020"
                  status="process"
                  description="Đăng ký lớp học phần."
                />
                <Step
                  title="Giai đoạn 3"
                  subTitle="21/10/2020"
                  status="wait"
                  description="Đăng ký chỉnh sửa."
                />
              </Steps>
            </Col>
          </Row>
        </CardTitle>

        {
            step === 0 && 
            <StepOne></StepOne>
        }
      </Card>
    </div>
  );
};

export default SubjectSumit;
