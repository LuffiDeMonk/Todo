import { useState, useEffect } from "react";

const DarkModeToggler = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); //adds dark class on the HTML element which will trigger the darkmode
    } else {
      document.documentElement.classList.remove("dark"); //remove dark class on the HTML element which will trigger the darkmode
    }
  }, [darkMode]);
  return [darkMode, setDarkMode];
};

export default DarkModeToggler;
