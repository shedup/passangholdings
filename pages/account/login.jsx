import { ComingSoon } from "@/Components";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setIsLoading(false);
      if (resp.ok) {
        // redirect user
        const res = await resp.json();
        login(res.user);
        toast.success(`Welcome ${res.user.name}`);
        router.push("/publications");
      } else {
        console.error("Error: loggin in");
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

        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default register;
