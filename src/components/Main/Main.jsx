import { useContext } from "react";
import { currentTemperatureUnitContexts } from "../../contexts/CurrentTemperatureUnitContexts";
import ItemCard from "./ItemCard/ItemCard";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContexts);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit === "C" ? "C" : "F"} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.weather;
            })

            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
