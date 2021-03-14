import React, { useState, useEffect } from "react";
import { Form, Select, Input, DatePicker, Button } from "antd";
import { PageHeader } from "antd";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

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

export const Profile = (props) => {
  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  const [form] = Form.useForm();

  const [ethnicList, setEthnicList] = useState([]);

  const [provinceList, setProvinceList] = useState([]);

  const studentInfo = useSelector((state) => state.authReducer.user);

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
    getEthnicList();
    getProvinceList();
  }, []);

  useEffect(() => {
    if (studentInfo) {
      let student = { ...studentInfo };
      student.dateBirth = moment(student.dateBirth);
      setStudent(student);
      setLoading(false);
    }
  }, [JSON.stringify(studentInfo)]);

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
            onFieldsChange={(changedFields, allFields) => {
              console.log(changedFields);
            }}
            preserve={false}
            onValuesChange={(changedValues, allValues) => {}}
            initialValues={{ ...student }}
          >
            <Row gutter={[16, 24]}>
              <Col span={12}> 
                <Form.Item
                  name="fullName"
                  label="Họ Và Tên"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng chọn cấp đào tạo!!!" }]}
                >
                  <Input placeholder="Họ và tên sinh viên..." />
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
                  <Select allowClear style={{ width: "100%" }} placeholder="Dân tộc...">
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
                  <Select allowClear style={{ width: "100%" }} placeholder="Quê quán...">
                    {provinceList.map((item, index) => {
                      return (
                        <Option key={index + `provinceOpts`} value={item.label}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="contactAddress"
                  label="Địa Chỉ Thường Trú"
                  hasFeedback
                  rules={[
                    {
                      required: false,
                      message: "Vui lòng nhập địa chỉ thường trú!!!",
                    },
                  ]}
                >
                  <Input placeholder="Địa chỉ thường trú..." />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Số Điện Thoại"
                  hasFeedback
                  rules={[
                    {
                      required: false,
                      message: "Vui lòng nhập số điện thoại!!!",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại..." />
                </Form.Item>
                <Form.Item
                  name="fatherName"
                  label="Họ Và Tên Bố"
                  hasFeedback
                  rules={[{ required: false, message: "Vui lòng nhập họ và tên bố!!!" }]}
                >
                  <Input placeholder="Họ và tên bố..." />
                </Form.Item>
                <Form.Item
                  name="fatherDateBirth"
                  label="Năm sinh bố"
                  hasFeedback
                  rules={[
                    {
                      required: false,
                      message: "Vui lòng nhập năm sinh của bố!!!",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Năm sinh của bố..." />
                </Form.Item>
                <Form.Item
                  name="motherName"
                  label="Họ Và Tên Mẹ"
                  hasFeedback
                  rules={[{ required: false, message: "Vui lòng nhập họ và tên mẹ!!!" }]}
                >
                  <Input placeholder="Họ và tên mẹ..." />
                </Form.Item>
                <Form.Item
                  name="motherDateBirth"
                  label="Năm sinh mẹ"
                  hasFeedback
                  rules={[
                    {
                      required: false,
                      message: "Vui lòng nhập năm sinh của mẹ!!!",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Năm sinh của mẹ..." />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary">Cập nhật</Button>
            </Row>
          </Form>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default Profile;
