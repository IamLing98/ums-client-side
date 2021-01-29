import React, { useState, useEffect } from "react";
import { Steps, Button, List, Avatar } from "antd";
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap";
import { CloseOutlined } from "@ant-design/icons";
import "react-table/react-table.css"; 
import "react-phone-number-input/style.css";
import "react-flags-select/css/react-flags-select.css";

const { Step } = Steps;

const Views = (props) => {
  useEffect(() => {
  }, []);

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <div>
      <Card style={{backgroundColor:"white !important"}}>
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
          <Row>
            <Col sm="12"></Col>
          </Row>
        </CardTitle>
        <CardBody>
          <List
            itemLayout="horizontal"
            dataSource={data}
            header={<b>Học phần đã đăng ký</b>}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://cdn.onlinewebfonts.com/svg/img_202644.png" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
          <List
            itemLayout="horizontal"
            dataSource={data}
            header={<b>Lớp học phần đã đăng ký</b>}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="data:image/png;base64,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" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Views;
