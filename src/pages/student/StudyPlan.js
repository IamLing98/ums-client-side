import React, { useEffect, useState } from "react";
import { List, Avatar, Button ,PageHeader} from "antd";
import { Card, CardTitle,  CardBody } from "reactstrap"; 
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

  if (selectedItem === null) {
    return (
      <div>
        <Card>
          <CardTitle className="mb-0  border-bottom bg-light">
            <PageHeader
              className="site-page-header" 
              title={"Danh sách học kỳ"} 
              style={{height:"56px"}}
            ></PageHeader>
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
                      style={{ width: "105px" }}
                      onClick={() => setSelectedItem(item)}
                    >
                      <EyeOutlined />
                      Chi tiết
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
  } else if (selectedItem) {
    return (
      <MakePlanSteps
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      ></MakePlanSteps>
    );
  } else return <></>;
};

export default SubjectSumit;
