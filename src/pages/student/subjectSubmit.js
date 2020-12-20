import React from "react";
import { List, Avatar } from "antd";
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap";

const SubjectSumit = (props) => {
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
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col sm="6">
              <i className="mdi mdi-border-right mr-2"></i>Học kỳ
            </Col>
          </Row> 
        </CardTitle>
        <CardBody>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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

export default SubjectSumit;
