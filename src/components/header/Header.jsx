import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { BsHouse, BsHouseAdd } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser, FaUserEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { useGetUserQuery } from "../../store/api/UserSlice";
import { Text, Avatar, Group, Menu } from "@mantine/core";
import Cookies from "js-cookie";
import { useUserInfo } from "../../context/UserInfo";

function Header() {
  const { userInfo, handleLogout, handleDeleteUser } = useUserInfo();
  const { data: user = {} } = useGetUserQuery();

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [menu, setMenu] = useState(false);

  // header sticky function
  const stickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 70 ||
        document.documentElement.scrollTop > 70
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeader();

    return window.removeEventListener("scroll", stickyHeader);
  }, []);

  return (
    <header
      ref={headerRef}
      className=" w-full h-[70px] leading-[70px] flex items-center"
    >
      <div className="container">
        <div className="flex justify-between items-center">
          {/* logo */}
          <Link to="/">
            <figure className="w-[14rem]">
              <img src={logo} alt="" className="w-full" />
            </figure>
          </Link>
          {/* nav links */}
          <div
            ref={menuRef}
            className={`menu ${menu === true ? "show_menu" : ""}`}
          >
            <ul className="flex flex-col md:flex-row md:items-center gap-0 md:gap-8 font-medium">
              <Link to="/" onClick={() => setMenu(!menu)}>
                <li>Home</li>
              </Link>
              <Link to="/properties" onClick={() => setMenu(!menu)}>
                <li>Properties</li>
              </Link>
              {userInfo === null || userInfo === false ? (
                <>
                  <Link
                    to="/login"
                    className="pb-6 md:pb-0"
                    onClick={() => setMenu(!menu)}
                  >
                    <li>Login</li>
                  </Link>
                  <Link to="/sign-up" onClick={() => setMenu(!menu)}>
                    <button className="bg-primaryColor px-8 py-2 h-[44px] flex items-center justify-center rounded-3xl text-white duration-100 hover:scale-105">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <Menu
                  width={260}
                  position="bottom-end"
                  transitionProps={{ transition: "pop-top-right" }}
                  withinPortal
                >
                  <Menu.Target>
                    <Group gap={7} className="mt-4 md:mt-0 cursor-pointer">
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        radius="xl"
                        size={40}
                      />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {user.name}
                      </Text>
                      <FiChevronDown />
                    </Group>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {user.role === "owner" && (
                      <>
                        <Link to="/add-property" onClick={() => setMenu(!menu)}>
                        <Menu.Item leftSection={<BsHouseAdd />}>
                          Add Property
                        </Menu.Item>
                        </Link>
                        <Link to="/your-properties" onClick={() => setMenu(!menu)}>
                        <Menu.Item leftSection={<BsHouse />}>
                          Your Properties
                        </Menu.Item>
                        </Link>
                      </>
                    )}
                    <Menu.Label>Settings</Menu.Label>
                    <Link
                      to={user && user.name ? `/profile/${user.name.toLowerCase().split(" ").join("-")}` : "/profile"}
                      onClick={() => setMenu(!menu)}
                    >
                      <Menu.Item leftSection={<FaUser />}>Profile</Menu.Item>
                    </Link>
                    <Link to="/profile/edit" onClick={() => setMenu(!menu)}>
                      <Menu.Item leftSection={<FaUserEdit />}>
                        Edit Profile
                      </Menu.Item>
                    </Link>
                    <Menu.Item
                      leftSection={<IoLogOutOutline />}
                      onClick={handleLogout}
                    >
                      Logout
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      color="red"
                      onClick={handleDeleteUser}
                      leftSection={<IoTrash />}
                    >
                      Delete account
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </ul>
          </div>
          {/* menu toggle */}
          <div
            onClick={() => setMenu(!menu)}
            className="flex md:hidden bg-primaryColor w-[40px] h-[40px] items-center justify-center cursor-pointer text-white text-2xl rounded duration-100 hover:scale-105"
          >
            {!menu ? <FiMenu /> : <IoClose />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
