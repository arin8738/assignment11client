/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import PopularLanguageCart from "./PopularLanguageCart";
import { Fade, Slide } from "react-awesome-reveal";

const PopularCourses = () => {
  const [pData, setPData] = useState([]);

  useEffect(() => {
    fetch("https://language-master-server-side.vercel.app/courses?sort=-1")
      .then((res) => res.json())
      .then((data) => setPData(data));
  }, []);

  return (
    <div>
      <div className="mt-20 mb-10 text-center w-9/12 md:w-1/2 mx-auto">
        <Slide>
          <h3 className="text-3xl font-semibold mb-5">Popular Courses</h3>
          <p className="">
            {/* <Fade delay={1e3} cascade damping={1e-1}> */}
            <Fade delay={500} cascade  duration={100}>
              Take courses from the world's best instructors and universities.
              {/* Courses include recorded auto-graded and peer-reviewed assignments,
          video lectures, and community discussion forums. */}
            </Fade>
          </p>
        </Slide>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto">
        {pData.slice(0, 6).map((d) => (
          <PopularLanguageCart key={d._id} data={d}></PopularLanguageCart>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
