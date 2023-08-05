/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../AuthPage/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useUser from "../../Components/Hooks/useUser";
import { RotatingLines } from "react-loader-spinner";

const PrivateUser = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);

    const [loggedUser, , isLoading] = useUser();
    console.log(loggedUser)

    if(loading ||isLoading){
        return <div className="flex justify-center items-center mt-20 min-h-[45vh]">
        <RotatingLines
          strokeColor="#ff5161"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    }

    if (loggedUser?.designation == "Student") {
        return children;
      }
    
      return <Navigate to="/login" state={{ from: location.pathname }} replace></Navigate>;
};

export default PrivateUser;

