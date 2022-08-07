import { useState } from "react";

function Register({ onSubmit }) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email: registerEmail, password: registerPassword });
  };
  const handlePasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  return (
    <main className="auth">
      <div className="auth__container">
        <h1 className="auth__heading">Sign up</h1>
        <form
          className="auth__form"
          name="signup-form"
          onSubmit={handleRegisterSubmit}
        >
          <input
            className="auth__input"
            placeholder="Email"
            type="text"
            onChange={handleEmailChange}
          ></input>
          <input
            className="auth__input"
            placeholder="Password"
            type="password"
            onChange={handlePasswordChange}
          ></input>
          <button className="auth__button" type="submit">
            Sign up
          </button>
          <p className="auth__redirect">Already a member? Log in here!</p>
        </form>
      </div>
    </main>
  );
}

export default Register;
