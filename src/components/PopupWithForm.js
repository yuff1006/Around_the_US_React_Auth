import { useRef, useState, useEffect } from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
  buttonState,
}) {
  const formRef = useRef();
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(formRef.current.checkValidity());
  }, [children]);

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
        <h2
          className={`popup__title ${
            name === "delete-confirmation" ? "popup__title_no-input" : ""
          }`}
        >
          {title}
        </h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          ref={formRef}
        >
          {children}
          <button
            type="submit"
            className="popup__button"
            onClick={onSubmit}
            disabled={!isFormValid || buttonState}
          >
            {buttonText}
          </button>
        </form>
        <button aria-label="Close" type="button" className="popup__close" />
      </div>
    </div>
  );
}

export default PopupWithForm;
