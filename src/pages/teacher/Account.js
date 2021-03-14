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

  const userInfo = useSelector((state) => state.authReducer.user);

  const onFinish = (values) => {
    let newValue = {
      username: values.employeeId,
      password: values.password,
      newPassword: values.newPassword,
    };
    axios
      .put(`/users`, newValue)
      .then((response) => {
        form.resetFields();
        message.success("Thay đổi mật khẩu thành công!!!");
      })
      .catch((err) => message.error("Có lỗi xảy ra!!!"));
  };
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      setRecord(userInfo);
      setLoading(false);
    }
  }, [userInfo]);

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
                  name="employeeId"
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
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mật khẩu..."
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label="Mật khẩu mới"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!!!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mật khẩu..."
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="confirmNewPassword"
                  label="Nhập lại mật khẩu"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên giảng viên!!!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("Mật khẩu nhập lại không trùng!"),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
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
