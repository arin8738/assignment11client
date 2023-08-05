import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Pages/AuthPage/AuthProvider";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  const {
    isLoading,
    data: loggedUser,
    refetch,
  } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: () =>
      fetch(`https://language-master-server-side.vercel.app/check-user/${user?.email}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      }).then((res) => res.json()),
    enabled: !!user,
  });

  return [loggedUser, refetch, isLoading];
};

export default useUser;
