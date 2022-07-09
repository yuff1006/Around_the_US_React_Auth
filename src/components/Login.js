function Login() {
  return (
    <main className="auth">
      <div className="auth__container">
        <h1 className="auth__heading">Log in</h1>
        <form className="auth__form" name="signin-form">
          <input
            className="auth__input"
            placeholder="Email"
            type="text"
          ></input>
          <input
            className="auth__input"
            placeholder="Password"
            type="text"
          ></input>
        </form>
        <button className="auth__button" type="submit">
          Log in
        </button>
        <p className="auth__redirect">Not a member yet? Sign up here!</p>
      </div>
    </main>
  );
}

export default Login;
