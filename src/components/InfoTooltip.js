import successImage from "../images/success.svg";
import failImage from "../images/fail.svg";

function InfoTooltip({ name, isOpen, success, onClose }) {
  function handleOverLayClose(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      onClose();
    }
  }
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}
      onClick={handleOverLayClose}
    >
      <div className="popup__container">
        <img
          src={success ? successImage : failImage}
          alt={success ? "success" : "fail"}
          className="popup__icon"
        />
        <h2 className="popup__message">
          {success
            ? "Success! You have now been registered."
            : "Oops, something went wrong! Please try again."}
        </h2>
        <button aria-label="Close" type="button" className="popup__close" />
      </div>
    </div>
  );
}

export default InfoTooltip;
