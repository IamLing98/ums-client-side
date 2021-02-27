import React, { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  CustomInput,
  FormGroup,
  Form,
  Row,
  Col,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/reducer";
import img1 from "../../assets/images/logo-icon.png";
import img2 from "../../assets/images/background/login-register.jpg";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom center",
};

const Login = (props) => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const [formValues, setFormValues] = useState({
    username: null,
    password: null,
  });
  const onSubmit = () => {
    var formData = new FormData();
    formData.append("username", formValues.username);
    formData.append("password", formValues.password);
    dispatch(login(formData));
  };

  const handleClickForgotPassword = () => {};

  useEffect(() => {
    if (isLogin) {
      props.history.push("/");
      console.log("Is login");
    }
  }, [isLogin]);
  return (
    <div className="">
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={sidebarBackground}>
        <div className="auth-box on-sidebar">
          <div id="loginform">
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" />
              </span>
              <h5 className="font-medium mb-3">Đăng nhập</h5>
            </div>
            <Row>
              <Col xs="12">
                <Form className="mt-3">
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      values={formValues.username}
                      onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
                      placeholder="Tài khoản"
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-pencil"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      values={formValues.password}
                      onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                      placeholder="Mật khẩu"
                      required
                    />
                  </InputGroup>
                  <div className="d-flex no-block align-items-center mb-3">
                    <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Remember Me" />
                    <div className="ml-auto">
                      <a
                        href="#recoverform"
                        id="to-recover"
                        onClick={() => handleClickForgotPassword()}
                        className="forgot text-dark float-right"
                      >
                        <i className="fa fa-lock mr-1"></i> Quên mật khẩu?
                      </a>
                    </div>
                  </div>
                  <Row className="mb-3">
                    <Col xs="12">
                      <Button color="primary" size="lg" onClick={() => onSubmit()} block>
                        Đăng nhập
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
          <div id="recoverform">
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" />
              </span>
              <h5 className="font-medium mb-3">Recover Password</h5>
              <span>Enter your Email and instructions will be sent to you!</span>
            </div>
            <Row className="mt-3">
              <Col xs="12">
                <Form action="/dashbaord">
                  <FormGroup>
                    <Input type="text" name="uname" bsSize="lg" id="Name" placeholder="Username" required />
                  </FormGroup>
                  <Row className="mt-3">
                    <Col xs="12">
                      <Button color="danger" size="lg" type="submit" block>
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
