import headerLogo from "../images/header__logo.svg";

function Header({ isLoggedIn, onPage }) {
  let buttonContent = "";
  if (isLoggedIn) {
    buttonContent = "Log out";
  } else if (!isLoggedIn && onPage === "login") {
    buttonContent = "Sign up";
  } else if (!isLoggedIn && onPage === "signup") {
    buttonContent = "Log in";
  }
  return (
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
      {/* task: figure out hamburger menu  */}
    </header>
  );
}

export default Header;
