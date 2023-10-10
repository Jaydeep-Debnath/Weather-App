import React, { useState } from 'react';
import { UilSun, UilMoon } from "@iconscout/react-unicons";

function Darkmode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      className="p-2 bg-slate-400 dark:bg-zinc-600 rounded-full"
      onClick={toggleDarkMode}
    >
        {isDarkMode ? (
          <UilSun className="text-yellow-300" />
        ) : (
          <UilMoon className="text-sky-800" />
        )}
    </button>
  );
}

export default Darkmode;