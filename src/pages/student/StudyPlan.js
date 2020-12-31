import React, { useEffect, useState } from "react";
import { List, Avatar, Button } from "antd";
import { Card, CardTitle, Row, Col, CardBody } from "reactstrap";
import View from "../../components/StudyPlan/Views";
import MakePlanSteps from "../../components/StudyPlan/Steps";
import { EyeOutlined } from "@ant-design/icons";
import axios from "../../api/index";

const SubjectSumit = (props) => {
  const [termList, setTermList] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const extractTermList = (termList = []) => { 
    termList.forEach(function (item) {
      item.title = "Học kỳ " + item.term + " năm " + item.year;
      if (item.status === 1) {
        item.description = "Đang diễn ra";
      } else if (item.status === 2) {
        item.description = "Học kỳ sắp tới";
      } else {
        item.description = "Đã kết thúc";
      }
    });
    return termList;
  };

  useEffect(() => {
    axios
      .get("/terms")
      .then((res) => {
        setTermList(extractTermList(res));
      })
      .catch((err) => console.log(err));
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

  if (selectedItem === null) {
    return (
      <div>
        <Card>
          <CardTitle className="mb-0 p-3 border-bottom bg-light">
            <Row>
              <Col sm="6">
                <i className="mdi mdi-border-right mr-2"></i>Danh sách học kỳ
              </Col>
            </Row>
          </CardTitle>
          <CardBody>
            <List
              itemLayout="horizontal"
              dataSource={termList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      key="list-loadmore-edit"
                      onClick={() => setSelectedItem(item)}
                    >
                      
                      <EyeOutlined />
                      Xem 
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://image.flaticon.com/icons/png/512/2191/2191186.png" />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
  else if(selectedItem){  
    if(selectedItem.status === 2) { 
      return <MakePlanSteps selectedItem={selectedItem} setSelectedItem={setSelectedItem}></MakePlanSteps>
    }
    else return <View setSelectedItem={setSelectedItem}></View>
  }
  else return <></>;
};

export default SubjectSumit;
