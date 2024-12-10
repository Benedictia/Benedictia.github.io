import React, { useState } from "react";
import "../SignUpForm.css";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(` ${name} Signed up and her ${email}`);
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up for Movie Updates</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </label>
        </div>

        <div className="form-group">
          <label>Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </label>
        </div>

        <button type="submit">Sign Up </button>
      </form>
    </div>
  );
}

export default SignUpForm;
