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

export const TeacherCreate = (props) => {
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
          title={"Hồ sơ cá nhân"}
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
                  name="employeeId"
                  label="Mã Giảng Viên"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!!!" }]}
                >
                  <Input disabled placeholder="Họ và tên giảng viên..." allowClear />
                </Form.Item>
                <Form.Item
                  name="fullName"
                  label="Họ Và Tên"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!!!" }]}
                >
                  <Input placeholder="Họ và tên giảng viên..." allowClear />
                </Form.Item>
                <Form.Item
                  name="sex"
                  label="Giới Tính"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng chọn giới tính!!!" }]}
                >
                  <Select allowClear style={{ width: "100%" }} placeholder="Giới tính...">
                    <Option value={0}>Nam</Option>
                    <Option value={1}>Nữ</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="dateBirth"
                  label="Ngày Sinh"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng chọn ngày sinh!!!" }]}
                >
                  <DatePicker
                    format={"YYYY/MM/DD"}
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Ngày sinh..."
                  ></DatePicker>
                </Form.Item>
                <Form.Item
                  name="ethnic"
                  label="Dân Tộc"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng chọn dân tộc!!!" }]}
                >
                  <Select
                    allowClear
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Dân tộc..."
                  >
                    {ethnicList.map((item, index) => {
                      return (
                        <Option key={index + `ethnicOpts`} value={item.label}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="identityNumber"
                  label="CMND/Căn Cước"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập CMND/Căn cước!!!" }]}
                >
                  <Input placeholder="Số CMND/Căn cước..." />
                </Form.Item>
                <Form.Item
                  name="homeTown"
                  label="Quê Quán"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập quê quán!!!" }]}
                >
                  <Select
                    allowClear
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Quê quán..."
                  >
                    {provinceList.map((item, index) => {
                      return (
                        <Option key={index + `provinceOpts`} value={item.label}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="contactAddress"
                  label="Địa Chỉ Thường Trú"
                  hasFeedback
                  rules={[
                    { required: false, message: "Vui lòng nhập địa chỉ thường trú!!!" },
                  ]}
                >
                  <Input placeholder="Địa chỉ thường trú..." />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Số Điện Thoại"
                  hasFeedback
                  rules={[{ required: false, message: "Vui lòng nhập số điện thoại!!!" }]}
                >
                  <Input placeholder="Số điện thoại..." />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  hasFeedback
                  rules={[{ required: false, message: "Vui lòng nhập số điện thoại!!!" }]}
                >
                  <Input placeholder="Số điện thoại..." />
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
export default TeacherCreate;
