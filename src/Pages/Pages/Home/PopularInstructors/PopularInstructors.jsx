/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import InstructorCard from "./InstructorCard";
import InstroctorPageCard from "../../../../Components/InstoctorPageCard/InstroctorPageCard";
import { Fade, Slide } from "react-awesome-reveal";

const PopularInstructors = () => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await fetch("https://language-master-server-side.vercel.app/instructors");
      return res.json();
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(data);
  return (
    <>
      <div className="mt-20 mb-10 text-center w-9/12 md:w-1/2 mx-auto">
        <Slide>
        <h3 className="text-3xl font-semibold mb-5">Popular Instructors</h3>
        <p className="max-w-[50vw]">
        {/* <Fade delay={1e3} cascade damping={1e-1}> */}
        <Fade delay={500} cascade duration={100}>
          Take courses from the world's best instructors and universities.
          {/* Courses include recorded auto-graded and peer-reviewed assignments,
          video lectures, and community discussion forums. */}
          </Fade>
        </p>
        </Slide>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        {data.slice(0,6).map((d) => (
          <InstroctorPageCard key={d._id} data={d}></InstroctorPageCard>
        ))}
      </div>
    </>
  );
};

export default PopularInstructors;
