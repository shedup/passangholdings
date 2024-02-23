import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const AuthContext = ({ children }) => {
  const route = useRouter();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookieLoggedIn = Cookies.get("user");
    if (cookieLoggedIn != null) checkIfAdmin(cookieLoggedIn);
  }, []);

  const checkIfAdmin = (userData) => {
    console.log("before", userData);
    const after = JSON.parse(userData);
    console.log("after", after);
    if (after.email == "test1@gmail.com") {
      setIsAdmin(true);
    }
    setIsLoggedIn(true);
    setUser(after);
  };

  const login = (userData) => {
    console.log("Before", userData);
    const stringedUser = JSON.stringify(userData);
    console.log("After", stringedUser);
    Cookies.set("user", stringedUser, {
      expires: 1,
      sameSite: "None",
      secure: true,
    }); // 1 day.
    checkIfAdmin(stringedUser);
  };

  const logout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove("user");
    toast.success("Logged out successfully");
    route.push("/account/login");
  };

  return (
    <Context.Provider value={{ login, logout, isLoggedIn, isAdmin }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
