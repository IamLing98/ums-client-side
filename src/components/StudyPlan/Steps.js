import React, { useState, useEffect } from "react";
import { Steps, Button, message } from "antd";
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap";
import { CloseOutlined } from "@ant-design/icons";
import "react-table/react-table.css";
import StepOne from "./StepOne";
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";

const { Step } = Steps;

const data = [
  {
    title: "Đăng ký học phần",
    description: "s",
    status: "s",
  },
  {
    title: "Đăng ký lớp học phần",
    description: "",
    status: "",
  },
  {
    title: "Đăng ký điều chỉnh",
    status: "",
    description: "",
  },
];

const PlanSteps = (props) => {
  const [step, setStep] = useState(0);

  const [steps, setSteps] = useState(data);

  const updateFieldChanged = (name, index, value)  => {
    let newArr = steps.map((item, i) => {
      if (index == i) {
        return { ...item, [name]:  value };
      } else {
        return item;
      }
    });
    setSteps(newArr);
  };

  useEffect(() => {
    console.log(props.selectedItem);
    const {selectedItem} = props;
    if(selectedItem.progress === 11){
      updateFieldChanged("status", 0, "process");
    }
    if(selectedItem.progress === 13){
      updateFieldChanged("status", 0, "finish");
    }
  }, []);

  return (
    <div>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col sm="6">
              <i className="mdi mdi-border-right mr-2"></i>Kế hoạch học tập
            </Col>
            <Col sm="6" className="col text-right">
              <Button
                type="primary"
                style={{ backgroundColor: "red" }}
                onClick={() => props.setSelectedItem(null)}
              >
                <CloseOutlined />
              </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="12">
              <Steps
                size="small"
                current={step}
                className="site-navigation-steps"
              >
                {steps.map((item) => (
                  <Step
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                  />
                ))}
              </Steps>
            </Col>
          </Row>
        </CardTitle>

        <div className="steps-content">{step === 0 && <StepOne></StepOne>}</div>
      </Card>
    </div>
  );
};

export default PlanSteps;
