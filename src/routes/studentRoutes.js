import Classic from "../views/dashboards/classic";
// import Starterkit from "../views/sample-pages/starter-kit";
// import Searchresult from "../views/sample-pages/search-result";
import CompanyClients from "../pages/admin/companyClients";
// import IndividualClients from "../pages/admin/individualClients";
// import Benefits from "../pages/admin/benefits";
// import RiskCategories from "../pages/admin/riskCategories";
// import ProductTypes from "../pages/admin/productTypes";
// import RiskClasses from "../pages/admin/riskClasses";
// import CoverTypes from "../pages/admin/coverTypes";
// import UnderWriters from "../pages/admin/underWriters";
// import Users from "../pages/admin/users";
// import Promotions from "../pages/admin/promotions";

//Student Components
import Result from "../pages/student/result";
import StudyPlan from "../pages/student/StudyPlan";

//techer Component
import ResultManagement from "../pages/teacher/resultManagement";

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
    component: ResultManagement,
  },
  {
    path: "/teachers/calendar",
    name: "Thời Khoá Biểu",
    icon: "mdi mdi-contacts",
    component: ResultManagement,
  },
  {
    path: "/teachers/result-management",
    name: "Quản lý điểm",
    icon: "mdi mdi-account-circle",
    component: ResultManagement,
  },
  {
    path: "/teachers/class-management",
    name: "Quản lý lớp",
    icon: "mdi mdi-account-circle",
    component: ResultManagement,
  },
  {
    path: "/dashboards/policies",
    name: "Sửa Lý Lịch",
    icon: "mdi mdi-file-document",
    component: Classic,
  },
  {
    path: "/dashboards/claims",
    name: "Góp Ý Kiến",
    icon: "mdi mdi-loop",
    component: Classic,
  },
  {
    path: "/dashboards/claims",
    name: "Xin Giấy Xác Nhận",
    icon: "mdi mdi-loop",
    component: Classic,
  },
  {
    path: "/dashboards/claims",
    name: "Hỏi Đáp",
    icon: "mdi mdi-loop",
    component: Classic,
  },
  {
    path: "/",
    pathTo: "/dashboards/classic",
    name: "Dashboard",
    redirect: true,
  },
];

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
    component: Classic,
  }, 
  {
    path: "/dashboards/claims",
    name: "Chương Trình Đào Tạo",
    icon: "mdi mdi-loop",
    component: Classic,
  },
  {
    path: "/students/subjectSubmit",
    name: "Đăng Ký Học Tập",
    icon: "mdi mdi-account-circle",
    component: StudyPlan,
  },
  {
    path: "/clients/cClients",
    name: "Thời Khoá Biểu",
    icon: "mdi mdi-contacts",
    component: CompanyClients,
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
    component: Classic,
  },
  {
    path: "/dashboards/claims",
    name: "Xin Giấy Xác Nhận",
    icon: "mdi mdi-loop",
    component: Classic,
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
