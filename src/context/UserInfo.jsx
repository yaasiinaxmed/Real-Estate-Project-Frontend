import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDeleteUserMutation } from "../store/api/UserSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserInfoContext = createContext(null);

export const useUserInfo = () => useContext(UserInfoContext);

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [userDelete] = useDeleteUserMutation()

  const navigate = useNavigate()
  const token = Cookies.get("token");

  useEffect(() => {
    setUserInfo(token != null);
  }, [token, setUserInfo]);

  const handleLogout = () => {
    Cookies.remove("token");
    setUserInfo(false);
    navigate("/")
  };

  const handleDeleteUser = () => {
    userDelete().then((result) => {
      toast.success(result.data.message)
      Cookies.remove("token")
      setUserInfo(false)
      navigate("/")
    }).catch((error) => {
      toast.error(error.data.message)
    })
   
  }

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, handleLogout, handleDeleteUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};
