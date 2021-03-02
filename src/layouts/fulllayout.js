import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./layout-components/header/header";
import Sidebar from "./layout-components/sidebar/sidebar";
import Footer from "./layout-components/footer/footer";
import { ThemeRoutesStudent } from "../routes/studentRoutes";
import { ThemeRoutesTeacher } from "../routes/teacherRoutes";
import { ROLE } from "../redux/auth/reducer";
import WebSocketContainer from "./WebSocketContainer";
import PrivateRoute from "./PrivateRoute";
import { getStudentDetail, getTeacherDetail } from "../redux/auth/reducer";
import { getListNotifications } from "../redux//notifications/notificationActions";

const mapStateToProps = (state) => ({
  ...state,
});

class Fulllayout extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      isOpen: false,
      width: window.innerWidth,
    };

    this.props.history.listen((location, action) => {
      if (window.innerWidth < 767 && document.getElementById("main-wrapper").className.indexOf("show-sidebar") !== -1) {
        document.getElementById("main-wrapper").classList.toggle("show-sidebar");
      }
    });
  }
  
  componentDidMount() {
    window.addEventListener("load", this.updateDimensions);
    window.addEventListener("resize", this.updateDimensions);
    let { authReducer } = this.props;
    if (authReducer.isLogin) {
      this.props.getListNotifications();
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        if (user.roleDTO) {
          let { roleDTO } = user;
          if (roleDTO.roleId === 2) {
            this.props.getStudentDetail(user.ownerId);
          }
        }
      }
    } else {
      console.log("no login");
    }
  }

  updateDimensions() {
    let element = document.getElementById("main-wrapper");
    this.setState({
      width: window.innerWidth,
    });
    switch (this.props.settings.activeSidebarType) {
      case "full":
      case "iconbar":
        if (this.state.width < 1170) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
          element.classList.add("mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", this.props.settings.activeSidebarType);
          element.classList.remove("mini-sidebar");
        }
        break;

      case "overlay":
        if (this.state.width < 767) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", this.props.settings.activeSidebarType);
        }
        break;
      default:
    }
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.updateDimensions);
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/

    const { isLogin } = this.props.authReducer;

    const role = this.props.authReducer.role;
    console.log("role:", role);
    return (
      <div
        id="main-wrapper"
        dir={this.props.settings.activeDir}
        data-theme={this.props.settings.activeTheme}
        data-layout={this.props.settings.activeThemeLayout}
        data-sidebartype={this.props.settings.activeSidebarType}
        data-sidebar-position={this.props.settings.activeSidebarPos}
        data-header-position={this.props.settings.activeHeaderPos}
        data-boxed-layout={this.props.settings.activeLayout}
      >
        {/*--------------------------------------------------------------------------------*/}
        {/* Header                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Header {...this.props} />
        {/*--------------------------------------------------------------------------------*/}
        {/* Sidebar                                                                        */}
        {/*--------------------------------------------------------------------------------*/}
        <Sidebar {...this.props} routes={ThemeRoutesStudent} />
        {/*--------------------------------------------------------------------------------*/}
        {/* Page Main-Content                                                              */}
        {/*--------------------------------------------------------------------------------*/}
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            {isLogin && <WebSocketContainer />}
            <Switch>
              {role
                ? role === ROLE.STUDENT
                  ? ThemeRoutesStudent.map((prop, key) => {
                      if (prop.navlabel) {
                        return null;
                      } else if (prop.collapse) {
                        return prop.child.map((prop2, key2) => {
                          if (prop2.collapse) {
                            return prop2.subchild.map((prop3, key3) => {
                              return (
                                <PrivateRoute
                                  isLogin={isLogin}
                                  path={prop3.path}
                                  component={prop3.component}
                                  key={key3}
                                />
                              );
                            });
                          }
                          return (
                            <PrivateRoute isLogin={isLogin} path={prop2.path} component={prop2.component} key={key2} />
                          );
                        });
                      } else if (prop.redirect) {
                        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                      } else {
                        return <PrivateRoute isLogin={isLogin} path={prop.path} component={prop.component} key={key} />;
                      }
                    })
                  : role === ROLE.STUDENT
                  ? ThemeRoutesTeacher.map((prop, key) => {
                      if (prop.navlabel) {
                        return null;
                      } else if (prop.collapse) {
                        return prop.child.map((prop2, key2) => {
                          if (prop2.collapse) {
                            return prop2.subchild.map((prop3, key3) => {
                              return (
                                <PrivateRoute
                                  isLogin={isLogin}
                                  path={prop3.path}
                                  component={prop3.component}
                                  key={key3}
                                />
                              );
                            });
                          }
                          return (
                            <PrivateRoute isLogin={isLogin} path={prop2.path} component={prop2.component} key={key2} />
                          );
                        });
                      } else if (prop.redirect) {
                        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                      } else {
                        return <PrivateRoute isLogin={isLogin} path={prop.path} component={prop.component} key={key} />;
                      }
                    })
                  : ""
                : ""}
            </Switch>
          </div>
          <Footer />
        </div>
        )
      </div>
    );
  }
}
export default connect(mapStateToProps, { getListNotifications, getTeacherDetail, getStudentDetail })(Fulllayout);
