import Dashboard from "./../views/Dashboard/Dashboard.jsx";
import Detail from "./../pages/Detail";

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
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage
  // },
  { redirect: true, path: "/", pathTo: "/", name: "Dashboard" }
];
export default dashRoutes;
