import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { checkToken, signin, signup } from "../../auth.js";
import CurrentUserContext from "../../contexts/CreateUserContext.js";
import { currentTemperatureUnitContexts } from "../../contexts/CurrentTemperatureUnitContexts";
import {
  addCardLike,
  addItems,
  deleteItems,
  editProfile,
  getItems,
  removeCardLike,
} from "../../utils/api.js";
import { APIkey, myCoordinates } from "../../utils/Constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
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
    const token = localStorage.getItem("jwt");
    return addItems({ name, imageUrl, weather }, token)
      .then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    console.log("token:", token);
    console.log("selectedCard:", selectedCard);
    deleteItems(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevItem) => {
          return prevItem.filter((item) => item._id !== selectedCard._id);
        });
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    signup({ email, password, name, avatar })
      .then(() => signin({ email, password }))
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setRegisterError("");
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
        setRegisterError("This is not a valid Email");
      });
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setLoginError("");
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
        setLoginError("Email or password incorrect");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editProfile({ name, avatar }, token).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeActiveModal("");
    });
  };

  const handleCardLike = ({ isLiked, _id }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id == _id ? updatedCard : item)),
          );
        })
        .catch(console.error);
    } else {
      removeCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item)),
          );
        })
        .catch(console.error);
    }
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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    checkToken(jwt)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("jwt");
        setCurrentUser({});
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <currentTemperatureUnitContexts.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      {" "}
      <CurrentUserContext.Provider value={currentUser}>
        <div
          className="page"
          style={{ fontFamily: "Cabinet Grotesk, Arial, sans-serif" }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onSignOut={handleSignOut}
                      onEditProfile={handleEditProfileClick}
                      onCardLike={handleCardLike}
                    ></Profile>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace></Navigate>
                  ) : (
                    <Navigate to="/" replace></Navigate>
                  )
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
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onLoginClick={handleLoginClick}
            registerError={registerError}
          ></RegisterModal>
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onRegisterClick={handleRegisterClick}
            loginError={loginError}
          ></LoginModal>
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onEditProfile={handleEditProfileSubmit}
          ></EditProfileModal>
        </div>{" "}
      </CurrentUserContext.Provider>
    </currentTemperatureUnitContexts.Provider>
  );
}

export default App;
