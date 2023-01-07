import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../hooks/useDarkSide";

const Switcher = () => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  return (
    <>
      <DarkModeSwitch 
        style={{marginBottom: "1.75rem", marginRight: "0.25rem"}}
        checked={darkSide}
        onChange={toggleDarkMode}
        size={22}
      />
    </>
  );
};

export default Switcher;
