import React from "react";
import "../../public/style.css";

const TravistaSignIn = () => {
  return (
    <div className="travista-sign-in">
      <h1>Travista</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Sign In</button>
        <p>
          <a href="#">Forgot Password?</a>
        </p>
      </form>
      <p>
        By signing in, I have read, and I understand and agree to the Travista
        Terms of Use and Data Privacy Notice
      </p>
      <p>
        <a href="#">Create Account</a>
      </p>
    </div>
  );
};

export default TravistaSignIn;
