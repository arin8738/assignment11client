import { createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layouts/Main/Main";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Login from "../AuthPage/Login";
import Register from "../AuthPage/Register";
import Instructor from "../Pages/Instructor/Instructor";
import Classes from "../Pages/Classes/Classes";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import DashBoardContent from "../Pages/DashBoardContent/DashBoardContent";
import MySelectedClasses from "../Pages/DashBoardContent/MySelectedClasses/MySelectedClasses";
import MyEnrolledClasses from "../Pages/DashBoardContent/MyEnrolledClasses/MyEnrolledClasses";
import MyPaymentHistory from "../Pages/DashBoardContent/MyPaymentHistory/MyPaymentHistory";
import ManageUsers from "../Pages/DashBoardContent/Admin/ManageUsers/ManageUsers";
import ManageClasses from "../Pages/DashBoardContent/Admin/ManageClasses/ManageClasses";
import InstructorClasses from "../Pages/DashBoardContent/Instructor/InstructorClasses/InstructorClasses";
import AddAClass from "../Pages/DashBoardContent/Instructor/AddAClass/AddAClass";
import UpdateClass from "../Pages/DashBoardContent/Instructor/InstructorClasses/UpdateClass";
import PrivateRoute from "./PrivateRoute";
import PrivateInstructor from "./PrivateInstructor";
import PrivateUser from "./PrivateUser";
import PrivateAdmin from "./PrivateAdmin";
import Payment from "../Pages/MakePayment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
        {
            path: "/",
            element: <Home></Home>,
            errorElement: <PageNotFound></PageNotFound>,
        },
        {
            path: "/instructors",
            element: <Instructor></Instructor>
        },
        {
            path: "/classes",
            element: <Classes></Classes>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute><DashBoardContent></DashBoardContent></PrivateRoute>,
        errorElement: <PageNotFound></PageNotFound>,
      },
      {
        path: "checkout/:id",
        element: <PrivateUser><Payment></Payment></PrivateUser>,
        // loader: ({params}) => fetch(`https://language-master-server-side.vercel.app/single-cart/${params.id}`)
      },
      {
        path: "my-selected-classes",
        element: <PrivateUser><MySelectedClasses></MySelectedClasses></PrivateUser>
      },
      {
        path: "/dashboard/my-enrolled-classes",
        element: <PrivateUser><MyEnrolledClasses></MyEnrolledClasses></PrivateUser>
      },
      {
        path: "/dashboard/my-payment-history",
        element: <PrivateUser><MyPaymentHistory></MyPaymentHistory></PrivateUser>
      },
      {
        path: "/dashboard/users",
        element: <PrivateAdmin><ManageUsers></ManageUsers></PrivateAdmin>
      },
      {
        path: "/dashboard/classes",
        element: <PrivateAdmin><ManageClasses></ManageClasses></PrivateAdmin>
      },
      {
        path: "/dashboard/my-classes",
        element: <PrivateInstructor><InstructorClasses></InstructorClasses></PrivateInstructor>
      },
      {
        path: "/dashboard/add-a-class",
        element: <PrivateInstructor><AddAClass></AddAClass></PrivateInstructor>
      },
      {
        path: "/dashboard/my-classes/:id",
        element: <PrivateInstructor><UpdateClass></UpdateClass></PrivateInstructor>,
        loader: ({params}) => fetch(`https://language-master-server-side.vercel.app/class/${params.id}`)
      },
    ]
  }
]);

export default router;