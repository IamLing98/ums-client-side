import React from "react";
import Result from "../pages/student/Result";
import StudyPlan from "../pages/student/StudyPlan";
import Schedule from "../pages/teacher/Schedule";

function App() {
  return <div>asdasd</div>;
}
export const ThemeRoutesTeacher = [
  {
    navlabel: true,
    name: "Personal",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    path: "/dashboards/classic",
    name: "Tin Tức",
    icon: "mdi mdi-newspaper",
    component: Result,
  },
  {
    path: "/teacher/schedule",
    name: "Lịch Giảng Dạy",
    icon: "mdi mdi-timer",
    component: Schedule,
  },
  {
    path: "/teacher/class",
    name: "Lớp Phụ Trách",
    icon: "mdi mdi-account-multiple",
    component: Result,
  },
  {
    path: "/teacher/salary",
    name: "Bảng Lương Hàng Tháng",
    icon: "mdi mdi-table",
    component: Result,
  },
  {
    path: "/teacher/profile",
    name: "Hồ Sơ Cá Nhân",
    icon: "mdi mdi-information-outline",
    component: StudyPlan,
  },
  {
    path: "/teacher/report",
    name: "Xin Giấy Xác Nhận",
    icon: "mdi mdi-clipboard-check",
    component: App,
  },
  {
    path: "/",
    pathTo: "/dashboards/classic",
    name: "Dashboard",
    redirect: true,
  },
];
