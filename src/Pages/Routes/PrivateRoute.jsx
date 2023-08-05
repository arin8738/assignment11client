/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { AuthContext } from '../AuthPage/AuthProvider';
import { RotatingLines } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);


    if(loading){
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

    if (user) {
        return children;
      }
    
      return <Navigate to="/login" state={{ from: location.pathname }} replace></Navigate>;
};

export default PrivateRoute;