import React from "react";
import firebase from "firebase";
const logOutUser = () => {
  firebase.auth().signOut();
};
const LogOut = () => {
  return <button className="links" onClick={logOutUser} children="Log Out" />;
};
export default LogOut;
