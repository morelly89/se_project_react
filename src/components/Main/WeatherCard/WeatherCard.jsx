import { useContext } from "react";
import {
  defaultWeatherOptions,
  weatherOptions,
} from "../../../utils/Constants";
import { currentTemperatureUnitContexts } from "../../../contexts/CurrentTemperatureUnitContexts";
import "./weatherCard.css";
function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContexts);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }
  console.log("Weather Data: ", weatherData);
  console.log("Filtered Options: ", filteredOptions);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}
        &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      ></img>
    </section>
  );
}

export default WeatherCard;
