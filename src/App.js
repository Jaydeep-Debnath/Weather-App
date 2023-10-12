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
        <div className="flex h-fit w-fit md:w-auto justify-center items-center p-3">
            <div className={`max-w-screen-sm lg:max-w-screen-md mx-auto my-6 py-10 px-28 rounded-md bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
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
        </div>
    );
}

export default App;