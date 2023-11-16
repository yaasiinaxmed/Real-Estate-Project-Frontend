import { Avatar, Text } from "@mantine/core";
import React from "react";
import { useGetUserQuery } from "../../store/api/UserSlice";
import { useUserInfo } from "../../context/UserInfo";

function ProfileContent() {
  const { data: user = [] } = useGetUserQuery();
  const {handleLogout, handleDeleteUser } = useUserInfo();

  return (
    <div className="w-full md:w-2/4 xl:w-1/3 p-6 sm:p-8 rounded-lg flex flex-col shadow-[0px_0px_6px_rgb(0,0,0,0.1)]">
      <Avatar src={user.avatar} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {user.name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.email} • {user.role}
      </Text>
      <button onClick={handleDeleteUser} className="mt-6 w-full bg-red-500 bg-opacity-90 hover:bg-opacity-100 px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100 ">
        Delete Account
      </button>
      <button onClick={handleLogout} className="mt-3 w-full bg-red-500 bg-opacity-10 border-[2px] border-red-300 text-red-500 hover:bg-opacity-20 px-4 py-3 text-sm flex items-center justify-center rounded-xl duration-100 ">
        Logout
      </button>
    </div>
  );
}

export default ProfileContent;
