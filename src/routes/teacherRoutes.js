import React from 'react';
import Result from "../pages/student/Result";
import StudyPlan from "../pages/student/StudyPlan";
import Schedule from "../pages/student/Schedule";

function App(){
	return<div>asdasd</div>
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
    icon: "mdi mdi-view-dashboard",
    component: Result,
  },
  {
    path: "/dashboards/claims",
    name: "Lịch Giảng Dạy",
    icon: "mdi mdi-loop",
    component: Result,
  },
  {
    path: "/students/result",
    name: "Quá Trình Làm Việc",
    icon: "mdi mdi-pencil-box-outline",
    component: Result,
  },
  {
    path: "/students/subjectSubmit",
    name: "Hồ Sơ Cá Nhân",
    icon: "mdi mdi-account-circle",
    component: StudyPlan,
  },
  {
    path: "/students/schedule",
    name: "Xin Giấy Xác Nhận",
    icon: "mdi mdi-contacts",
    component: Schedule,
  },
  {
    path: "/students/result",
    name: "Kết Quả Học Tập",
    icon: "mdi mdi-pencil-box-outline",
    component: Result,
  },
  {
    path: "/dashboards/policies",
    name: "Sửa Lý Lịch",
    icon: "mdi mdi-file-document",
    component: App,
  }, 
  {
    path: "/",
    pathTo: "/dashboards/classic",
    name: "Dashboard",
    redirect: true,
  },
];
