import Result from "../pages/student/Result";
import StudyPlan from "../pages/student/StudyPlan";
import Schedule from "../pages/student/Schedule";
import Profile from '../pages/student/Profile';
import News from '../pages/student/News';
import Account from '../pages/student/Account';

export const ThemeRoutesStudent = [
  {
    path: "/students/account",
    name: "Tin Tức",
    icon: "mdi mdi-view-dashboard",
    component: Account,
  },
  {
    path: "/students/news",
    name: "Tin Tức",
    icon: "mdi mdi-view-dashboard",
    component: News,
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
    component: Profile,
  },
  {
    path: "/student/report",
    name: "Xin Giấy Xác Nhận",
    icon: "mdi mdi-loop",
    component: Result,
  },
];
