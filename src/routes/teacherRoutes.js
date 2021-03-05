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
    name: "Chương Trình Đào Tạo",
    icon: "mdi mdi-loop",
    component: Result,
  },
  {
    path: "/students/subjectSubmit",
    name: "Đăng Ký Học Tập",
    icon: "mdi mdi-account-circle",
    component: StudyPlan,
  },
  {
    path: "/students/schedule",
    name: "Thời Khoá Biểu",
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
