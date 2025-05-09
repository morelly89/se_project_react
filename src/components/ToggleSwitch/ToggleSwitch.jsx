import { useContext } from "react";
import "../ToggleSwitch/ToggleSwitch.css";
import { currentTemperatureUnitContexts } from "../../contexts/CurrentTemperatureUnitContexts";
function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    currentTemperatureUnitContexts
  );

  return (
    <>
      <label className="toggle-switch">
        <input
          className="toggle-switch__checkbox"
          type="checkbox"
          onChange={handleToggleSwitchChange}
        ></input>
        <span className="toggle-switch__circle"></span>
        <span
          className={`toggle-switch__text toggle-switch__text_f ${
            currentTemperatureUnit === "F"
              ? "toggle-switch__text_color_white"
              : ""
          }`}
        >
          F
        </span>
        <span
          className={`toggle-switch__text toggle-switch__text_c ${
            currentTemperatureUnit === "C"
              ? "toggle-switch__text_color_white"
              : ""
          }`}
        >
          C
        </span>
      </label>
    </>
  );
}

export default ToggleSwitch;
