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
    const after = JSON.parse(userData);
    if (after.email == "tenzinpassang001@outlook.com") {
      setIsAdmin(true);
    }
    setIsLoggedIn(true);
    setUser(after);
  };

  const login = (userData) => {
    const stringedUser = JSON.stringify(userData);
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
    <Context.Provider value={{ login, logout, isLoggedIn, isAdmin, user }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
