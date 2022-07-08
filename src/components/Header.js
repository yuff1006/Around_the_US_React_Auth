import headerLogo from "../images/header__logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        alt="around the US page logo"
        className="header__logo"
        src={headerLogo}
      />
    </header>
  );
}

export default Header;
