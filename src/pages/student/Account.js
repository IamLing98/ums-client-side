import React, { useState, useEffect } from "react";
import { Form, Select, Input, DatePicker, Divider, Button } from "antd";
import { PageHeader } from "antd";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export const Account = (props) => {
  const [form] = Form.useForm();

  const [ethnicList, setEthnicList] = useState([]);

  const [provinceList, setProvinceList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [record, setRecord] = useState(null);

  const employeeInfo = useSelector((state) => state.authReducer.user);

  const getEthnicList = () => {
    axios
      .get("/ethnics", true)
      .then((res) => {
        setEthnicList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProvinceList = (id) => {
    axios
      .get(`/provinceCities?countryId=${id}`, true)
      .then((res) => {
        setProvinceList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (employeeInfo) {
      let newRecord = { ...employeeInfo };
      newRecord.dateBirth = moment(newRecord.dateBirth);
      setRecord(newRecord);
      setLoading(false);
    }
  }, [employeeInfo]);

  useEffect(() => {
    getEthnicList();
    getProvinceList();
  }, []);
  return (
    <Card>
      <CardTitle className="mb-0  border-bottom bg-light">
        <PageHeader
          className="site-page-header"
          title="Tài khoản đăng nhập"
          style={{ height: "56px" }}
        ></PageHeader>
      </CardTitle>
      <CardBody>
        {!loading ? (
          <Form
            form={form}
            {...formItemLayout}
            initialValues={record}
            preserve={false}
            onValuesChange={(changedValues, allValues) => {}}
          >
            <Row gutter={[16, 24]}>
              <Col md="2"></Col>
              <Col md="8">
                <Divider>Thông tin cá nhân</Divider>
                <Form.Item
                  name="username"
                  label="Tài khoản"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!!!" }]}
                >
                  <Input disabled placeholder="Họ và tên giảng viên..." allowClear />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!!!" }]}
                >
                  <Input disabled placeholder="Họ và tên giảng viên..." allowClear />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Nhập lại tài khoản"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!!!" }]}
                >
                  <Input disabled placeholder="Họ và tên giảng viên..." allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => console.log(form.getFieldsValue())} type="primary">
                Cập nhật
              </Button>
            </Row>
          </Form>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};
export default Account;
