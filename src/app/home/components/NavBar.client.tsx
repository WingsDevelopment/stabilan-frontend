"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Divider, Icon, Icons, SidebarItem, Typography } from "../../../lib";

import { RainbowKitCustom } from "@/components/button/RainbowKitCustom/RainbowKitCustom.client";

interface NavBarProps {
  items: SidebarItem[];
}

const NavBar = ({ items }: NavBarProps) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    const handleResize = () => {
      setIsMenuOpen(false); // Close the menu when window is resized
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    console.log("first");
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-100 ${
        isScrolled
          ? "bg-white bg-opacity-50 backdrop-blur-md"
          : "bg-transparent"
      } dark:bg-gray-900 border-b border-dashed border-[rgba(145,158,171,0.2)]`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Icon src={Icons.logo} alt="Flowbite Logo" width={48} height={48} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap md:block hidden dark:text-white">
            <Typography type="h6">Stabilan</Typography>
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-search"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-start text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-search"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="flex md:order-2">
          <div className="items-center">
            <RainbowKitCustom />
          </div>
        </div>
        {isMenuOpen && (
          <div
            className={`flex flex-col p-4 mt-4 font-medium bg-white border border-primary rounded-lg md:flex-row md:mt-0 md:border-0 md:space-x-8 rtl:space-x-reverse items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-search"
          >
            {/* Menu items */}
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className={`block py-4 px-3 w-full text-center
                ${item.path === pathname ? "text-success" : ""}`}
              >
                <Typography type="body-bold">{item.title}</Typography>
                <Divider className="w-full" />
              </Link>
            ))}
          </div>
        )}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`block py-2 px-3 
                  ${item.path === pathname ? "text-success" : ""}`}
                >
                  <Typography type="body-bold">{item.title}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
