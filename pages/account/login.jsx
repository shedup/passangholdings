import { ComingSoon } from "@/Components";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await resp.json();
      if (resp.ok) {
        // redirect user
        console.log("Success", res.message);
        login(res.user);
        toast.success(`Welcome ${res.user.name}`);
        router.push("/publications");
      } else {
        console.error("Error: loggin in", res.message);
        toast.error(`Invalid username or password.`);
      }
    } catch (err) {
      toast.error(`Something went wrong, try again.`);
      console.error("Error:", err.message);
    }
  };
  return (
    <div className="form-page form-control">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="email"
          type="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="form-control "
          id="password"
          type="password"
          required
        />

        <button className="btn btn-primary" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default register;
