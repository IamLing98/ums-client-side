import Result from "../pages/student/Result";
import StudyPlan from "../pages/student/StudyPlan";
import Schedule from '../pages/student/Schedule';

export const ThemeRoutesStudent = [
  {
    navlabel: true,
    name: "Personal",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    path: "/students/news",
    name: "Tin Tức",
    icon: "mdi mdi-view-dashboard", 
  },
  {
    path: "/students/educationprogram",
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
    path: "/student/profile",
    name: "Sửa Lý Lịch",
    icon: "mdi mdi-file-document",
    component: Result,
  },
  {
    path: "/student/report",
    name: "Xin Giấy Xác Nhận",
    icon: "mdi mdi-loop",
    component: Result,
  }, 
];
