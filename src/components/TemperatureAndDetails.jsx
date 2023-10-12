import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/WeatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-2xl text-white">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-4">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex text-sm items-center justify-center">
            <UilTemperature size={20} className="mr-1" />
            Real fell:
            <span className="font-semibold ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex text-sm items-center justify-center">
            <UilTear size={20} className="mr-1" />
            Humidity:
            <span className="font-semibold ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex text-sm items-center justify-center">
            <UilWind size={20} className="mr-1" />
            Wind:
            <span className="font-semibold ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-normal">
          Rise:{" "}
          <span className="font-semibold ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light text-lg">|</p>

        <UilSunset />
        <p className="font-normal">
          Set:{" "}
          <span className="font-semibold ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light text-lg">|</p>

        <UilArrowUp />
        <p className="font-normal">
          High:{" "}
          <span className="font-semibold ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light text-lg">|</p>

        <UilArrowDown />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;