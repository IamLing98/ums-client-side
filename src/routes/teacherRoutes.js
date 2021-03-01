import React from 'react';
const Empty = props => {
	return(
		<div>Empty</div>
	)
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
    component: Empty,
  },
  {
    path: "/dashboards/claims",
    name: "Chương Trình Đào Tạo",
    icon: "mdi mdi-loop",
    component: Empty,
  },
  {
    path: "/students/subjectSubmit",
    name: "Đăng Ký Học Tập",
    icon: "mdi mdi-account-circle",
    component: Empty,
  },
  {
    path: "/students/schedule",
    name: "Thời Khoá Biểu",
    icon: "mdi mdi-contacts",
    component: Empty,
  },
  {
    path: "/students/result",
    name: "Kết Quả Học Tập",
    icon: "mdi mdi-pencil-box-outline",
    component: Empty,
  },
  {
    path: "/dashboards/policies",
    name: "Sửa Lý Lịch",
    icon: "mdi mdi-file-document",
    component: Empty,
  },
  { path: "/", pathTo: "/dashboards/classic", name: "Dashboard", redirect: true },
];
