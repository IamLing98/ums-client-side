import React from 'react';
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
	Button
} from 'reactstrap';
import img1 from '../../assets/images/logo-icon.png';
import img2 from '../../assets/images/background/login-register.jpg';

const sidebarBackground = {
	backgroundImage: "url(" + img2 + ")",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "bottom center"
};

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		var elem = document.getElementById('loginform');
		elem.style.transition = "all 2s ease-in-out";
		elem.style.display = "none";
		document.getElementById('recoverform').style.display = "block";
	}
	render() {
		return <div className="">
			{/*--------------------------------------------------------------------------------*/}
			{/*Login Cards*/}
			{/*--------------------------------------------------------------------------------*/}
			<div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={sidebarBackground}>
				<div className="auth-box on-sidebar">
					<div id="loginform">
						<div className="logo">
							<span className="db"><img src={img1} alt="logo" /></span>
							<h5 className="font-medium mb-3">Đăng nhập</h5>
						</div>
						<Row>
							<Col xs="12">
								<Form className="mt-3" id="loginform" action="/dashbaord">
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ti-user"></i>
											</InputGroupText>
										</InputGroupAddon>
										<Input type="text" placeholder="Tài khoản" required />
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ti-pencil"></i>
											</InputGroupText>
										</InputGroupAddon>
										<Input type="password" placeholder="Mật khẩu" required />
									</InputGroup>
									<div className="d-flex no-block align-items-center mb-3">
										<CustomInput type="checkbox" id="exampleCustomCheckbox" label="Remember Me" />
										<div className="ml-auto">
											<a href="#recoverform" id="to-recover" onClick={this.handleClick} className="forgot text-dark float-right"><i className="fa fa-lock mr-1"></i> Quên mật khẩu?</a>
										</div>
									</div>
									<Row className="mb-3">
										<Col xs="12">
											<Button color="primary" size="lg" type="submit" block>Đăng nhập</Button>
										</Col>
									</Row> 
								</Form>
							</Col>
						</Row>
					</div>
					<div id="recoverform">
						<div className="logo">
							<span className="db"><img src={img1} alt="logo" /></span>
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
											<Button color="danger" size="lg" type="submit" block>Reset</Button>
										</Col>
									</Row>
								</Form>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default Login;
