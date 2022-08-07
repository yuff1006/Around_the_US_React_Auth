function MobileUserHeader({ isLoggedIn, onPage, isActive }) {
  let buttonContent = "";
  if (isLoggedIn) {
    buttonContent = "Log out";
  } else if (!isLoggedIn && onPage === "login") {
    buttonContent = "Sign up";
  } else if (!isLoggedIn && onPage === "signup") {
    buttonContent = "Log in";
  }
  return (
    <div
      className={`header__credential-container header__credential-container_mobile ${
        isActive ? "header__credential-container_mobile_active" : ""
      }`}
    >
      {isLoggedIn && (
        <p className="header__account header__account_mobile">
          email@email.com
        </p>
      )}
      <button type="button" className="header__button header__button_mobile">
        {buttonContent}
      </button>
    </div>
  );
}

export default MobileUserHeader;
