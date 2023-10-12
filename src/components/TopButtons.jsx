import React from "react";
import logo from "../assets/img/favicon.png";
import Darkmode from "./Darkmode";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Sydney",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Paris",
    },
    {
      id: 5,
      title: "Delhi",
    },
    {
      id: 6,
      title: "Kolkata",
    },
  ];

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center items-center my-3">
        <div className="flex justify-center items-center">
          <img src={logo} alt="" className="w-10" />
          <p className="text-white text-xl ml-2">WeatherApp</p>
        </div>
        <div className="w-screen flex justify-end">
          <Darkmode />
        </div>
      </div>
      <div className="flex items-center justify-around my-5">
        {cities.map((city) => (
          <button
            key={city.id}
            className="text-white text-lg font-medium"
            onClick={() => setQuery({ q: city.title })}
          >
            {city.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopButtons;