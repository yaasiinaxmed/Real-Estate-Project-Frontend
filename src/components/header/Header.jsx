import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

function Header() {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const [menu, setMenu] = useState(false);
  
  // header sticky function
  const stickyHeader = () => {
   window.addEventListener("scroll", () => {
    if(document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
      headerRef.current.classList.add("sticky_header")
    } else {
      headerRef.current.classList.remove("sticky_header")
    }
   });
  }

  useEffect(() => {
    stickyHeader()

    return window.removeEventListener("scroll", stickyHeader )
  }, [])

  // menu toggle logic
  const toggleMenu = () => {
    if(menu === true) {
      menuRef.current.classList.add("show_menu")
      setMenu(false)
    } else {
      menuRef.current.classList.remove("show_menu")
      setMenu(true)
    }
  }

  return (
    <header ref={headerRef} className=" w-full h-[70px] leading-[70px] flex items-center">
      <div className="container">
        <div className="flex justify-between items-center">
          {/* logo */}
          <Link to="/">
            <figure className="w-[14rem]">
              <img src={logo} alt="" className="w-full" />
            </figure>
          </Link>
          {/* nav links */}
          <div ref={menuRef} className="menu" onClick={toggleMenu}>
            <ul className="flex flex-col md:flex-row md:items-center gap-0 md:gap-8 font-medium">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/">
                <li>Properties</li>
              </Link>
              <Link to="/" className="pb-6 md:pb-0">
                <li>Login</li>
              </Link>
              <button className="bg-primaryColor px-8 py-2 h-[44px] flex items-center justify-center rounded-3xl text-white">
                Sign Up
              </button>
            </ul>
          </div>
          {/* menu toggle */}
          <div onClick={toggleMenu} className="flex md:hidden bg-primaryColor w-[40px] h-[40px] items-center justify-center cursor-pointer text-white text-2xl rounded">
            {menu ? <FiMenu /> : <IoClose/>}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
