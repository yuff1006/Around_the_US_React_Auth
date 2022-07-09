function Register() {
  return (
    <main className="auth">
      <div className="auth__container">
        <h1 className="auth__heading">Sign up</h1>
        <form className="auth__form" name="signup-form">
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
          Sign up
        </button>
        <p className="auth__redirect">Already a member? Log in here!</p>
      </div>
    </main>
  );
}

export default Register;
