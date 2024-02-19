import { ComingSoon } from "@/Components";
import React, { useState } from "react";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    console.log("Form submitted");
    console.log("eee", e);
    e.preventDefault();
    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (resp.ok) {
        // redirect user
        const res = await resp.json();
        console.log(res.message);
      } else {
        console.error("Error: ", res.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };
  return (
    <div className="form-page form-control">
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your fullname</label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          id="name"
          type="text"
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="email"
          type="email"
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="form-control "
          id="password"
          type="password"
        />

        <button className="btn btn-primary" type="submit">
          Sign up
        </button>
      </form> */}
      <ComingSoon />
    </div>
  );
};

export default register;
