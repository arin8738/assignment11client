/* eslint-disable react/prop-types */

import BtnSolid from "../Buttons/BtnSolid";
import BtnOutLine from "../Buttons/BtnOutLine";
import "./HomeBannerContent.css";
import { Slide } from "react-awesome-reveal";

const HomeBannerContent = ({
  title,
  subTitle,
  destination1,
  destination2,
  cStyle,
  bgImg,
}) => {
  return (
    <div
      style={{ backgroundImage: `url('${bgImg}')` }}
      className="bgBannerImg text-white bg-[black]"
    >
      <div className="w-full h-full bg-[black] bg-opacity-50">
        <div className=" px-5 md:px-24 pt-24 pb-5 md:pb-32 md:pt-56 flex flex-col justify-center text-center md:w-1/2 mx-auto">
          <Slide>
          <p>{subTitle}</p>
          <h3 className="text-3xl font-semibold mb-8 mt-5">{title}</h3>
          <div className="flex gap-3 justify-center">
            <BtnSolid destination={destination1} cStyle={cStyle}>
              SingUp Now
            </BtnSolid>
            <BtnOutLine destination={destination2} cStyle={cStyle}>
              Learn More
            </BtnOutLine>
          </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default HomeBannerContent;
