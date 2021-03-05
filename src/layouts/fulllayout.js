import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {  Switch, Redirect } from "react-router-dom";
import Header from "./layout-components/header/header";
import Sidebar from "./layout-components/sidebar/sidebar";
import Footer from "./layout-components/footer/footer";
import { ThemeRoutesStudent } from "../routes/studentRoutes";
import { ThemeRoutesTeacher } from "../routes/teacherRoutes";
import WebSocketContainer from "./WebSocketContainer";
import PrivateRoute from "./PrivateRoute";
import { getUserDetail } from "../redux/auth/reducer";
import { getListNotifications } from "../redux//notifications/notificationActions";
import { ROLE } from "../redux/auth/reducer";

const mapStateToProps = (state) => ({
  ...state,
});

const FullLayout = (props) => { 

  const [width, setWidth] = useState(window.innerWidth);

  props.history.listen((location, action) => {
    if (window.innerWidth < 767 && document.getElementById("main-wrapper").className.indexOf("show-sidebar") !== -1) {
      document.getElementById("main-wrapper").classList.toggle("show-sidebar");
    }
  });
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook, Applies when loading or resizing App                           */
  /*--------------------------------------------------------------------------------*/
  useEffect(() => {
    window.addEventListener("load", updateDimensions);
    window.addEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (props.authReducer.isLogin) {
      console.log("login");
      props.getUserDetail();
      props.getListNotifications()
    }
  }, [props.authReducer.isLogin]);
  /*--------------------------------------------------------------------------------*/
  /*Function that handles sidebar, changes when resizing App                        */
  /*--------------------------------------------------------------------------------*/
  const updateDimensions = () => {
    let element = document.getElementById("main-wrapper");
    setWidth(window.innerWidth);
    switch (props.settings.activeSidebarType) {
      case "full":
      case "iconbar":
        if (width < 1170) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
          element.classList.add("mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", props.settings.activeSidebarType);
          element.classList.remove("mini-sidebar");
        }
        break;

      case "overlay":
        if (width < 767) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", props.settings.activeSidebarType);
        }
        break;
      default:
    }
  };
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook                                                                 */
  /*--------------------------------------------------------------------------------*/
  useEffect(() => {
    return () => {
      window.removeEventListener("load", updateDimensions);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  /*--------------------------------------------------------------------------------*/
  /* Theme Setting && Layout Options wiil be Change From Here                       */
  /*--------------------------------------------------------------------------------*/

  const { isLogin } = props.authReducer;

  const role = props.authReducer.role;

  console.log("role:", role);

  if (!isLogin) {
    return <Redirect to="/authentication/login" />;
  }
  return (
    <div
      id="main-wrapper"
      dir={props.settings.activeDir}
      data-theme={props.settings.activeTheme}
      data-layout={props.settings.activeThemeLayout}
      data-sidebartype={props.settings.activeSidebarType}
      data-sidebar-position={props.settings.activeSidebarPos}
      data-header-position={props.settings.activeHeaderPos}
      data-boxed-layout={props.settings.activeLayout}
    >
      {/*--------------------------------------------------------------------------------*/}
      {/* Header                                                                         */}
      {/*--------------------------------------------------------------------------------*/}
      <Header {...props} />
      {/*--------------------------------------------------------------------------------*/}
      {/* Sidebar                                                                        */}
      {/*--------------------------------------------------------------------------------*/}
      <Sidebar
        {...props}
        routes={
          role ? (role === ROLE.STUDENT ? ThemeRoutesStudent : role === ROLE.TEACHER ? ThemeRoutesTeacher : []) : []
        }
      />
      {/*--------------------------------------------------------------------------------*/}
      {/* Page Main-Content                                                              */}
      {/*--------------------------------------------------------------------------------*/}
      {props.location.pathname === "/admin/companysetup" ? (
        <div className="companysetup-mainwrapper">
          <div className="page-wrapper d-block maincontent-wrapper">
            <div className="page-content container-fluid">
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
                              <PrivateRoute
                                isLogin={isLogin}
                                path={prop2.path}
                                component={prop2.component}
                                key={key2}
                              />
                            );
                          });
                        } else if (prop.redirect) {
                          return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                        } else {
                          return (
                            <PrivateRoute isLogin={isLogin} path={prop.path} component={prop.component} key={key} />
                          );
                        }
                      })
                    : role === ROLE.TEACHER
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
                              <PrivateRoute
                                isLogin={isLogin}
                                path={prop2.path}
                                component={prop2.component}
                                key={key2}
                              />
                            );
                          });
                        } else if (prop.redirect) {
                          return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                        } else {
                          return (
                            <PrivateRoute isLogin={isLogin} path={prop.path} component={prop.component} key={key} />
                          );
                        }
                      })
                    : ""
                  : ""}
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      ) : (
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
                  : role === ROLE.TEACHER
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
      )}
    </div>
  );
};
export default connect(mapStateToProps, { getUserDetail, getListNotifications })(FullLayout);
