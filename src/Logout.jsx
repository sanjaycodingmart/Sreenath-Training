import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
const logOutUser = () => {
  firebase.auth().signOut();
};
const LogOut = () => {
  return (
    <button className="links-but" onClick={logOutUser} children="LogOut" />
  );
};
export default LogOut;
