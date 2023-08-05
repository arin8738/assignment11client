import React from "react";
import { Link, useRouteError } from "react-router-dom";
import CustomHelmet from "../../../Components/Helmet/CustomHelmet";

const PageNotFound = () => {
  const error = useRouteError();
  return (
    <div className="text-center my-10">
      <CustomHelmet>Not Found</CustomHelmet>
      <div className="flex justify-center h-[450px]">
      <img className=""
        src="https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif"
        alt=""
      />
      </div>

      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-red mt-2">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="my-3 btn btn-outline hover:bg-my-primary hover:border-my-primary text-my-secondary border-my-secondary">Back to Home</Link>
    </div>
  );
};

export default PageNotFound;
