import { useState } from "react";

function Login({ onSubmit }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email: loginEmail, password: loginPassword });
  };
  const handlePasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };
  return (
    <main className="auth">
      <div className="auth__container">
        <h1 className="auth__heading">Log in</h1>
        <form
          className="auth__form"
          name="signin-form"
          onSubmit={handleLoginSubmit}
        >
          <input
            className="auth__input"
            placeholder="Email"
            type="text"
            name="email"
            onChange={handleEmailChange}
          ></input>
          <input
            className="auth__input"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
          ></input>
          <button className="auth__button" type="submit">
            Log in
          </button>
          <p className="auth__redirect">Not a member yet? Sign up here!</p>
        </form>
      </div>
    </main>
  );
}

export default Login;
