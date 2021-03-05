import React from "react";
import { connect } from "react-redux";
import {
  Nav,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import * as data from "./data";

import { Badge } from "antd";
/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../../assets/images/logo-icon.png";
import profilephoto from "../../../assets/images/users/1.jpg";
import pduLogo from "../../../assets/images/pdu-logo.png";
import { logout } from "../../../redux/auth/reducer";
import "./style.scss";
import { BellOutlined } from "@ant-design/icons";
import moment from "moment";
import parse from "html-react-parser";
import { ROLE } from "../../../redux/auth/reducer";

const mapStateToProps = (state) => ({
  ...state,
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.showMobilemenu = this.showMobilemenu.bind(this);
    this.sidebarHandler = this.sidebarHandler.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  /*--------------------------------------------------------------------------------*/
  /*To open NAVBAR in MOBILE VIEW                                                   */
  /*--------------------------------------------------------------------------------*/
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  /*--------------------------------------------------------------------------------*/
  /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
  /*--------------------------------------------------------------------------------*/
  showMobilemenu() {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  }
  sidebarHandler = () => {
    let element = document.getElementById("main-wrapper");
    switch (this.props.settings.activeSidebarType) {
      case "full":
      case "iconbar":
        element.classList.toggle("mini-sidebar");
        if (element.classList.contains("mini-sidebar")) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", this.props.settings.activeSidebarType);
        }
        break;
      case "overlay":
      case "mini-sidebar":
        element.classList.toggle("full");
        if (element.classList.contains("full")) {
          element.setAttribute("data-sidebartype", "full");
        } else {
          element.setAttribute("data-sidebartype", this.props.settings.activeSidebarType);
        }
        break;
      default:
    }
  };

  /*--------------------------------------------------------------------------------*/
  /*Verifies if routeName is the one active (in browser input)                      */
  /*--------------------------------------------------------------------------------*/
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentDidMount() {}

  render() {
    const { notificationReducer } = this.props;
    const { isLogin } = this.props.authReducer;
    const { role } = this.props.authReducer;
    const { user } = this.props.authReducer;
    return (
      <header className="topbar navbarbg" data-navbarbg={this.props.settings.activeNavbarBg}>
        {isLogin && (
          <Navbar
            className={
              "top-navbar " + (this.props.settings.activeNavbarBg === "skin6" ? "navbar-light" : "navbar-dark")
            }
            expand="md"
          >
            <div className="navbar-header" id="logobg" data-logobg={this.props.settings.activeLogoBg}>
              {/*--------------------------------------------------------------------------------*/}
              {/* Mobile View Toggler  [visible only after 768px screen]                         */}
              {/*--------------------------------------------------------------------------------*/}
              <span className="nav-toggler d-block d-md-none" onClick={this.showMobilemenu}>
                <i className="ti-menu ti-close" />
              </span>
              {/*--------------------------------------------------------------------------------*/}
              {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
              {/*--------------------------------------------------------------------------------*/}
              <NavbarBrand href="/">
                <b className="logo-icon" style={{ marginLeft: "15px" }}>
                  <img src={logodarkicon} alt="homepage" className="dark-logo" />
                  {/* <img src="https://sotaytuyensinh.vn/wp-content/uploads/2019/05/Diem-chuan-dai-hoc-phuong-dong.png" alt="homepage" className="dark-logo" /> */}
                  <img src={pduLogo} alt="homepage" className="light-logo" style={{ width: "120px", height: "50px" }} />
                </b>
                <span className="logo-text">
                  {/* <img src={logodarktext} alt="homepage" className="dark-logo" /> */}
                  <img
                    src={"https://sotaytuyensinh.vn/wp-content/uploads/2019/05/Diem-chuan-dai-hoc-phuong-dong.png"}
                    alt="homepage"
                    className="dark-logo"
                  />
                  {/* <img
									src={pduLogo}
									className="light-logo"
									alt="homepage"
									style={{width:"91px", height:"18px"}}
								/> */}
                  {/* <span className="light-logo" style={{fontWeight:"900"}}>PDU</span> */}
                </span>
              </NavbarBrand>
              {/*--------------------------------------------------------------------------------*/}
              {/* Mobile View Toggler  [visible only after 768px screen]                         */}
              {/*--------------------------------------------------------------------------------*/}
              <span className="topbartoggler d-block d-md-none" onClick={this.toggle}>
                <i className="ti-more" />
              </span>
            </div>
            <Collapse
              className="navbarbg"
              isOpen={this.state.isOpen}
              navbar
              data-navbarbg={this.props.settings.activeNavbarBg}
            >
              <Nav className="float-left" navbar>
                {/*--------------------------------------------------------------------------------*/}
                {/*--------------------------------------------------------------------------------*/}
                {/* Start Create New Dropdown                                                      */}
                {/*--------------------------------------------------------------------------------*/}
                {/* <UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav>
									Create New <i className="fa fa-angle-down" />
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem className={this.activeRoute("/admin/addClient/iClient")}>
										<NavLink to={"/admin/addClient/iClient"} >
											Individual Client
										</NavLink>
									</DropdownItem>
									<DropdownItem className={this.activeRoute("/admin/addClient/cClient")}>
										<NavLink to={"/admin/addClient/cClient"} >
											Corporate Client
										</NavLink>
									</DropdownItem>
									<DropdownItem className={this.activeRoute("/dashboards/quotes")}>
										<NavLink to={"/dashboards/quotes"} >
											Quote
										</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown> */}
                {/*--------------------------------------------------------------------------------*/}
                {/* End Create New Dropdown                                                        */}
                {/*--------------------------------------------------------------------------------*/}
              </Nav>
              <Nav className="ml-auto float-right" navbar>
                {/*--------------------------------------------------------------------------------*/}
                {/* Start Notifications Dropdown                                                   */}
                {/*--------------------------------------------------------------------------------*/}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{ textAlign: "center" }}>
                    <Badge count={notificationReducer.notReadNumber}>
                      <BellOutlined style={{ fontSize: "27px", color: "white" }} />
                    </Badge>
                  </DropdownToggle>
                  <DropdownMenu right className="mailbox">
                    <span className="with-arrow">
                      <span className="bg-primary" />
                    </span>
                    <div className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2">
                      <div className="">
                        <h4 className="mb-0">Thông báo</h4>
                        <p className="mb-0">{notificationReducer.notReadNumber} thông báo mới</p>
                      </div>
                    </div>
                    <div style={{ maxHeight: "300px" }} className="message-center notifications">
                      {/*<!-- Message -->*/}
                      {notificationReducer.nofiticationsList.map((notification, index) => {
                        return (
                          <span href="" className="message-item" key={index}>
                            {/* <span className={"btn btn-circle btn-" + notification.iconbg}>
                            <i className={notification.iconclass} />
                          </span> */}
                            <div className="mail-contnet">
                              <h5 className="message-title">{notification.title}</h5>
                              <span className="mail-desc">{parse(notification.content)}</span>
                              <span className="time">
                                {moment(notification.createdDate).format("hh:mm DD/MM/YYYY")}
                              </span>
                            </div>
                          </span>
                        );
                      })}
                    </div>
                    <a className="nav-link text-center mb-1 text-dark" href=";">
                      <strong>Check all notifications</strong> <i className="fa fa-angle-right" />
                    </a>
                  </DropdownMenu>
                </UncontrolledDropdown>
                {/*--------------------------------------------------------------------------------*/}
                {/* End Notifications Dropdown                                                     */}
                {/*--------------------------------------------------------------------------------*/}
                {/*--------------------------------------------------------------------------------*/}
                {/* Start Profile Dropdown                                                         */}
                {/*--------------------------------------------------------------------------------*/}
                {role && user ? (
                  role === ROLE.STUDENT ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className="pro-pic">
                        <img src={profilephoto} alt="user" className="rounded-circle" width="31" />
                      </DropdownToggle>
                      <DropdownMenu right className="user-dd">
                        <span className="with-arrow">
                          <span className="bg-primary" />
                        </span>
                        <div className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2">
                          <div className="">
                            <img src={profilephoto} alt="user" className="rounded-circle" width="60" />
                          </div>
                          <div className="ml-2">
                            <h4 className="mb-0">{user.fullName}</h4>
                            <p className=" mb-0">{user.email}</p>
                          </div>
                        </div>
                        <DropdownItem>
                          <i className="ti-user mr-1 ml-1" /> Tài khoản sinh viên
                        </DropdownItem>

                        <DropdownItem divider />
                        {/* <DropdownItem>
                     <i className="ti-settings mr-1 ml-1" />
                     <NavLink to={"/admin/companysetup"} >
                       Company Setup
                     </NavLink>
                             </DropdownItem> */}
                        <DropdownItem divider />
                        <DropdownItem
                          onClick={() => {
                            this.props.logout();
                          }}
                        >
                          <i className="fa fa-power-off mr-1 ml-1" /> Đăng xuất
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className="pro-pic">
                        <img src={profilephoto} alt="user" className="rounded-circle" width="31" />
                      </DropdownToggle>
                      <DropdownMenu right className="user-dd">
                        <span className="with-arrow">
                          <span className="bg-primary" />
                        </span>
                        <div className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2">
                          <div className="">
                            <img src={profilephoto} alt="user" className="rounded-circle" width="60" />
                          </div>
                          <div className="ml-2">
                            <h4 className="mb-0">{user.fullName}</h4>
                            <p className=" mb-0">{user.email}</p>
                          </div>
                        </div>
                        <DropdownItem>
                          <i className="ti-user mr-1 ml-1" /> Tài khoản giảng viên
                        </DropdownItem>

                        <DropdownItem divider />
                        {/* <DropdownItem>
										<i className="ti-settings mr-1 ml-1" />
										<NavLink to={"/admin/companysetup"} >
											Company Setup
										</NavLink>
                  					</DropdownItem> */}
                        <DropdownItem divider />
                        <DropdownItem
                          onClick={() => {
                            this.props.logout();
                          }}
                        >
                          <i className="fa fa-power-off mr-1 ml-1" /> Đăng xuất
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )
                ) : (
                  " "
                )}
                {/*--------------------------------------------------------------------------------*/}
                {/* End Profile Dropdown                                                           */}
                {/*--------------------------------------------------------------------------------*/}
              </Nav>
            </Collapse>
          </Navbar>
        )}
      </header>
    );
  }
}
export default connect(mapStateToProps, { logout })(Header);
