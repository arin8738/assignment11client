/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Fade, Slide } from "react-awesome-reveal";

const PageBanner = ({ title, subTitle, img }) => {
  return (
    <div
      style={{ backgroundImage: `url('${img}')` }}
      className="bgBannerImg text-white "
    >
      <div className="w-full h-full bg-[black] bg-opacity-50">
        <div className=" px-5 md:px-24 pt-24 pb-5 md:pb-32 md:pt-48 flex flex-col justify-center text-center md:w-1/2 mx-auto">
          <Slide>
          <h3 className="text-3xl font-semibold mb-3 mt-5">{title}</h3>
          <p><Fade delay={500} cascade duration={100}>{subTitle}</Fade></p>
          </Slide>
          <div className="flex gap-3 justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
