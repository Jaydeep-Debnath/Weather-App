import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/WeatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/img/favicon.png";
import Darkmode from "./components/Darkmode";

function App() {
    const [query, setQuery] = useState({ q: "kolkata" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const message = query.q ? query.q : "current location.";

            toast.info("Fetching weather for " + message);

            await getFormattedWeatherData({ ...query, units }).then((data) => {
                toast.success(
                    `Successfully fetched weather for ${data.name}, ${data.country}.`
                );

                setWeather(data);
            });
        };

        fetchWeather();
    }, [query, units]);

    const formatBackground = () => {
        if (!weather) return "from-transparent to-teal-500";
        const threshold = units === "metric" ? 20 : 60;
        if (weather.temp <= threshold) return "from-transparent to-teal-500";

        return "from-transparent to-orange-500";
    };

    return (
        <div className={`mx-auto max-w-screen-md my-6 py-10 px-32 rounded-md bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
        <div className="flex justify-start items-center">
            <p className="flex flex-row text-white ml-5 justify-center items-center"><img src={logo} alt="" className="w-10 mr-2"/>Weather App</p>
            <div className="w-screen flex justify-end">
                <Darkmode/>
            </div>
        </div>
            <TopButtons setQuery={setQuery} />
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

            {weather && (
                <div>
                    <TimeAndLocation weather={weather} />
                    <TemperatureAndDetails weather={weather} />

                    <Forecast title="hourly forecast" items={weather.hourly} />
                    <Forecast title="daily forecast" items={weather.daily} />
                </div>
            )}

            <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
        </div>
    );
}

export default App;