import React from "react";
import "./SignIn.scss";
import Navbar from "../Components/Navbar/index.page";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="sign-in">
      <Navbar />
      <div className="sign-in-box">
        <div className="sign-in-box-inner">
          <h2>SIGN IN</h2>
          <form action="" className="sign-in-box-form">
            <div>
              <label htmlFor="">USER ID</label>
              <input type="text" placeholder="Enter user id" />
            </div>
            <div>
              <label htmlFor="">PASSWORD</label>
              <input type="password" placeholder="Enter password" />
            </div>
            <div className="sign-in-box-form-check">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember me</label>
            </div>
            <Link to="/user/dashboard">SUBMIT</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
