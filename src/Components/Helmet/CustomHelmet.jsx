/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";

const CustomHelmet = ({children}) => {
  return (
    <Fragment>
      <Helmet>
        <title>Language Master | {children}</title>
      </Helmet>
    </Fragment>
  );
};

export default CustomHelmet;
