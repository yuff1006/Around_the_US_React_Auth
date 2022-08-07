import headerLogo from "../images/header__logo.svg";
import MobileUserHeader from "./MobileUserHeader";
import { useState } from "react";

function Header({ isLoggedIn, onPage }) {
  const [isHamburgerMenuActive, setIsHamburgerMenuActive] = useState(false);
  let buttonContent = "";
  if (isLoggedIn) {
    buttonContent = "Log out";
  } else if (!isLoggedIn && onPage === "login") {
    buttonContent = "Sign up";
  } else if (!isLoggedIn && onPage === "signup") {
    buttonContent = "Log in";
  }
  return (
    <>
      <MobileUserHeader
        isLoggedIn={isLoggedIn}
        onPage={onPage}
        isActive={isHamburgerMenuActive}
      />
      <header className="header">
        <img
          alt="around the US page logo"
          className="header__logo"
          src={headerLogo}
        />
        <div className="header__credential-container">
          {isLoggedIn && <p className="header__account">email@email.com</p>}
          <button type="button" className="header__button">
            {buttonContent}
          </button>
        </div>
        <div
          className={`hamburger-menu ${
            isHamburgerMenuActive ? "hamburger-menu_expand" : ""
          }`}
          onClick={() => setIsHamburgerMenuActive((current) => !current)}
        >
          <div className="bar-top"></div>
          <div className="bar-middle"></div>
          <div className="bar-bottom"></div>
        </div>
      </header>
    </>
  );
}

export default Header;
