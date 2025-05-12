import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { currentTemperatureUnitContexts } from "../../contexts/CurrentTemperatureUnitContexts";
import { addItems, deleteItems, getItems } from "../../utils/api.js";
import { APIkey, myCoordinates } from "../../utils/Constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import "./App.css";
function App() {
  const [weatherData, setWeatherData] = useState({
    weather: "",
    temp: { F: 999, C: 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return addItems({ name, imageUrl, weather })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (e) => {
    e.preventDefault();
    deleteItems(selectedCard.id)
      .then(() => {
        setClothingItems((prevItem) => {
          return prevItem.filter((item) => item.id !== selectedCard.id);
        });
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWeather(myCoordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <currentTemperatureUnitContexts.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      {" "}
      <div
        className="page"
        style={{ fontFamily: "Cabinet Grotesk, Arial, sans-serif" }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/Profile"
              element={
                <Profile
                  handleAddClick={handleAddClick}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                ></Profile>
              }
            ></Route>
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        ></AddItemModal>
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteClick={() => {
            setActiveModal("delete-modal");
          }}
        />
        <DeleteModal
          isOpen={activeModal === "delete-modal"}
          onClose={closeActiveModal}
          onDelete={handleCardDelete}
        ></DeleteModal>
      </div>{" "}
    </currentTemperatureUnitContexts.Provider>
  );
}

export default App;
