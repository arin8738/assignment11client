/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import MySelectedTable from '../MySelectedClasses/MySelectedTable';
import { AuthContext } from '../../../AuthPage/AuthProvider';
import { RotatingLines } from 'react-loader-spinner';
import CustomHelmet from '../../../../Components/Helmet/CustomHelmet';

const MyEnrolledClasses = () => {
  const {user, loading} = useContext(AuthContext);
  const token = localStorage.getItem('access-token')
    const { isLoading, data, refetch } = useQuery({
        queryKey: ['repoData', 'loading'],
        queryFn: () =>
          fetch(`https://language-master-server-side.vercel.app/my-selected-course?email=${user?.email}&status=paid`, {
            headers: {
              authorization: `bearer ${token}`
            }
          }).then(
            (res) => res.json(),
          ),
          enabled: !!user,
      })
    
      console.log(data)
      if (isLoading) return <RotatingLines
      strokeColor="#ff5161"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />



  return (
    <div>
      <CustomHelmet>Enrolled-Class</CustomHelmet>
        <div className="mt-20 mb-10 text-center w-9/12 md:w-1/2 mx-auto">
        <h3 className="text-3xl font-semibold mb-5">My Enrolled Courses</h3>
      </div>

      <div className="overflow-x-auto mb-20">
        {/* {data.length == 0 && refetch()} */}
        <table
         className="table w-[65vw] mx-5">
          {/* head */}
          <thead className="rounded-lg">
            <tr className="bg-my-secondary rounded-lg">
              <th>#</th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Price</th>
              <th className="">Paid</th>
              <th className="">Delete</th>
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}
            {
                data?.map(d => <MySelectedTable index={data?.indexOf(d)} payment={`Paid`} key={d._id} data={d}></MySelectedTable>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default MyEnrolledClasses;