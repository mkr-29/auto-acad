import React, { useContext, useState } from "react";
import "./SignIn.scss";
import { Link } from "react-router-dom";
import Navbar from "../../../Components/Navbar/index.page";
import Footer from "../../../Components/Footer/index.page";
import { useFormik } from "formik";
import AuthContext from "../../../context/AuthContext";
import { UserServices } from "../Services/UserServices";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      userId: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit();
      formik.resetForm();
    },
  });

  const handleSubmit = async () => {
    if (formik.values === "") {
      alert("All fields are required");
      return;
    }

    const data = formik.values;

    setLoading(true);

    try {
      const response = await UserServices.login(data);

      if (response.status >= 400) {
        throw new Error(response.message);
      } else {
        const userData = {
          userId: response.data.userId,
          name: response.data.name,
          email: response.data.email,
        };
        // Login the user
        const { token, user } = {
          token: response.token,
          user: userData,
        };

        login(token, user); // Save token and navigate to dashboard
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        alert(
          `Error: ${error.response.status} - ${
            error.response.data.message || "Unauthorized"
          }`
        );
      } else {
        console.error("Error Message:", error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="sign-in bgc">
      <Navbar />
      <div className="sign-in-box">
        <div className="sign-in-box-inner">
          <h2>SIGN IN</h2>
          <form action="" className="sign-in-box-form">
            <div>
              <label htmlFor="">USER ID</label>
              <input 
                value={formik.values.userId}
                onChange={formik.handleChange}
                id="userId"
                type="text" 
                placeholder="Enter user id" 
              />
            </div>
            <div>
              <label htmlFor="">PASSWORD</label>
              <input 
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                type="password" 
                placeholder="Enter password" 
              />
            </div>
            <div className="sign-in-box-form-check">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember me</label>
            </div>
            <button
              type="button"
              className="sign-in-box-inner-button"
              onClick={formik.handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
          <span className="sign-in-box-inner-sign-up">
            Don't have an account?
            <Link to="/sign-up">Sign Up</Link>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
