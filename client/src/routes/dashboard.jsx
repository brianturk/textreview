import Dashboard from "./../views/Dashboard/Dashboard.jsx";
import TableList from "./../views/TableList/TableList.jsx";
import UserPage from "./../views/UserPage/UserPage.jsx";
import Detail from "./../pages/Detail";
import Login from "./../pages/Login";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Summary",
    icon: "design_app",
    header: "7 Days Summary",
    component: Dashboard
  },
  {
    path: "/Detail",
    name: "Detailed",
    icon: "files_paper",
    header: "Detailed",
    component: Detail
  },
  {
    path: "/login",
    name: "Login",
    icon: "files_paper",
    header: "Login",
    component: Login
  },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage
  // },
  { redirect: true, path: "/", pathTo: "/", name: "Dashboard" }
];
export default dashRoutes;
