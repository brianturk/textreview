import Dashboard from "./../../pages/Dashboard/Dashboard.jsx";
import Detail from "./../../pages/Detail";
import Profile from "./../../pages/Profile";
import AddLocation from "./../../pages/AddLocation";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Summary",
    icon: "business_chart-bar-32",
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
    path: "/profile",
    name: "Profile",
    icon: "users_single-02",
    header: "Profile",
    component: Profile
  },
  {
    path: "/addlocation",
    name: "Add Location",
    icon: "location_world",
    header: "Add Location",
    component: AddLocation
  },
  { redirect: true, path: "/", pathTo: "/", name: "Dashboard" }
];
export default dashRoutes;
