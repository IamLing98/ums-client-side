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
    component: Result,
  },
  {
    path: "/dashboards/claims",
    name: "Xin Giấy Xác Nhận",
    icon: "mdi mdi-loop",
    component: Result,
  }, 
  //   {
  //     collapse: true,
  //     name: "Master",
  //     state: "Mater",
  //     path: "/master",
  //     icon: "mdi mdi-settings",
  //     extra: "",
  //     child: [
  //       {
  //         path: "/master/productTypes",
  //         name: "Product Types",
  //         icon: "mdi mdi-folder-plus",
  //         component: ProductTypes,
  //       },
  //       {
  //         path: "/master/riskCategories",
  //         name: "Risk Categories",
  //         icon: "mdi mdi-shape-square-plus",
  //         component: RiskCategories,
  //       },
  //       {
  //         path: "/master/riskClasses",
  //         name: "Risk Class",
  //         icon: "mdi mdi-meteor",
  //         component: RiskClasses,
  //       },
  //       {
  //         path: "/master/underwriters",
  //         name: "Underwriters",
  //         icon: "mdi mdi-umbrella-outline",
  //         component: UnderWriters,
  //       },
  //       {
  //         path: "/master/users",
  //         name: "Users",
  //         icon: "mdi mdi-odnoklassniki",
  //         component: Users,
  //       },
  //       {
  //         path: "/master/coverTypes",
  //         name: "Cover Types",
  //         icon: "mdi mdi-wrap",
  //         component: CoverTypes,
  //       },
  //       {
  //         path: "/master/benefits",
  //         name: "Benefits",
  //         icon: "mdi mdi-thumb-up-outline",
  //         component: Benefits,
  //       },
  //       {
  //         path: "/master/search-result1",
  //         name: "Rates",
  //         icon: "mdi mdi-cash-usd",
  //         component: Searchresult,
  //       },
  //       {
  //         path: "/master/promotions",
  //         name: "Promotions",
  //         icon: "mdi mdi-all-inclusive",
  //         component: Promotions,
  //       },
  //       {
  //         path: "/master/search-result3",
  //         name: "Binders",
  //         icon: "mdi mdi-autorenew",
  //         component: Searchresult,
  //       },
  //     ],
  //   },
  {
    path: "/",
    pathTo: "/dashboards/classic",
    name: "Dashboard",
    redirect: true,
  },
]; 