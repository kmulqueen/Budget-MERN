import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const HomePageAuthenticated = () => {
    return (
      <>
        <h1>Hello, {userInfo.name}</h1>
      </>
    );
  };

  const HomePageGuest = () => {
    return (
      <>
        <h1>
          Please <Link to="/login">login</Link> to continue.
        </h1>
      </>
    );
  };

  useEffect(() => {}, [userInfo]);
  return userInfo ? <HomePageAuthenticated /> : <HomePageGuest />;
};

export default HomePage;
