import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { PageHeader } from "antd";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

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

  const [loading, setLoading] = useState(true);

  const [record, setRecord] = useState(null);

  const employeeInfo = useSelector((state) => state.authReducer.user);

  const onFinish = (values) => {
    let newValue = {
      username: values.studentId,
      password: values.password,
    };
    axios
      .put(`/users`, newValue)
      .then((response) => message.success("Thay đổi mật khẩu thành công!!!"))
      .catch((err) => message.error("Có lỗi xảy ra!!!"));
  };
  useEffect(() => {
    if (employeeInfo) {
      console.log(employeeInfo);
      setRecord(employeeInfo);
      setLoading(false);
    }
  }, [employeeInfo]);

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
            onFinish={onFinish}
          >
            <Row gutter={[16, 24]}>
              <Col md="2"></Col>
              <Col md="7">
                <Form.Item
                  name="studentId"
                  label="Tài khoản"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu!!!" }]}
                >
                  <Input
                    disabled
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Tài khoản đăng nhập..."
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu!!!" }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mật khẩu..."
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Nhập lại mật khẩu"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên giảng viên!!!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("Mật khẩu nhập lại không trùng!"),
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Nhập lại mật khẩu..."
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Button htmlType="submit" type="primary">
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
