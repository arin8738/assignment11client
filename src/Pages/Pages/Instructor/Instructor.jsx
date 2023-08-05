/* eslint-disable no-unused-vars */

import { RotatingLines } from 'react-loader-spinner';
import CustomHelmet from '../../../Components/Helmet/CustomHelmet';
import InstroctorPageCard from '../../../Components/InstoctorPageCard/InstroctorPageCard';
import PageBanner from '../../../Components/PageBanner/PageBanner';
import { useQuery } from '@tanstack/react-query'

const Instructor = () => {

    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['instructor'],
        queryFn: async () => {
            const res = await fetch('https://language-master-server-side.vercel.app/instructors')
            // const res = await fetch('https://language-master-server-side.vercel.app/instructors')
            return res.json();
        },
    })
    // console.log(data)

    if (isLoading) {
        return (
          <div className="h-[70vh] flex justify-center items-center">
            <RotatingLines
              strokeColor="#ff5161"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        );
      }

    return (
        <div>
            <CustomHelmet>Instructors</CustomHelmet>
            <PageBanner 
            title={`All The Instructors`} 
            subTitle={`To have another language is to possess a second soul.`}
            img="https://www.wondriumdaily.com/wp-content/uploads/2020/05/Story-of-Human-Language_Animal-Communication-Is-Not-the-Same-As-Human-Language_QBS_Featured.jpg"></PageBanner>
            <div className='grid grid-cols-1 md:grid-cols-3'>
            {data.map(d => <InstroctorPageCard
            key={d._id}
            data = {d}
            ></InstroctorPageCard>)}
        </div>
        </div>
    );
};

export default Instructor;