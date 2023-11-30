import React from "react";
import { motion } from "framer-motion";
import { Typography, IconButton, Navbar } from "@material-tailwind/react";
import DarkModeToggler from "../../hooks/DarkModeToggler";
import { MoonIcon, SunIcon } from "../Icons";
import { variants } from "./HeaderVariants";

const IconGroup = () => {
  const [darkMode, setDarkMode] = DarkModeToggler();
  return (
    <IconButton
      onClick={() => setDarkMode((prev) => !prev)}
      color="white"
      ripple={false}
      className="border-none outline-none shadow-none hover:shadow-none focus:outline-none bg-transparent"
    >
      {/* if darkmode is enabled, sun icon will be shown, else, moon icon will be shown */}
      {!darkMode ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

const Header = () => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="bg-[#6D7FFF] sticky top-0 z-10"
    >
      <Navbar
        className="container p-2.5 rounded-none border-none bg-[#6D7FFF] transition-colors duration-300"
        shadow={false}
        blurred={false}
      >
        <div className="flex items-center justify-between">
          <Typography
            variant="h3"
            className="text-[#C8BAFF] hover:text-white font-Montserat duration-300 transition-colors font-light"
          >
            TaskTumble
          </Typography>
          {/* icon group */}
          <IconGroup />
        </div>
      </Navbar>
    </motion.div>
  );
};

export default Header;
