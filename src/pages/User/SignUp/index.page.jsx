import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Navbar from "../../../Components/Navbar/index.page";
import Footer from "../../../Components/Footer/index.page";
import AuthContext from "../../../context/AuthContext";
import { UserServices } from "../Services/UserServices";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      userId: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "mentor",
    },
    onSubmit: () => {
      handleSubmit();
      formik.resetForm();
    },
  });

  const handleSubmit = async () => {
    if (formik.values.password !== formik.values.confirmPassword) {
      alert("Password and Confirm Password should be same");
      return;
    } else if (formik.values === "") {
      alert("All fields are required");
      return;
    }

    const data = formik.values;
    delete data.confirmPassword;

    setLoading(true);

    try {
      const response = await UserServices.register(data);

      if (response.status >= 400) {
        throw new Error(response.message);
      } else {
        const userData = {
          userId: response.data.user.userId,
          name: response.data.user.name,
          email: response.data.user.email,
        };
        // Login the user
        const { token, user } = {
          token: response.data.token,
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
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgc">
      <Navbar />
      <div className="sign-in-box">
        <div className="sign-in-box-inner">
          <h2>SIGN UP</h2>
          <form
            className="sign-in-box-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label>NAME</label>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                id="name"
                type="text"
                placeholder="Enter user name"
              />
            </div>
            <div>
              <label>USER ID</label>
              <input
                value={formik.values.userId}
                onChange={formik.handleChange}
                id="userId"
                type="number"
                placeholder="Enter user id"
              />
            </div>
            <div>
              <label>EMAIL</label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email"
                type="email"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label>PASSWORD</label>
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label>CONFIRM PASSWORD</label>
              <input
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
            </div>
            <div>
              <label>ROLE</label>
              <select
                value={formik.values.role}
                onChange={formik.handleChange}
                id="role"
              >
                <option value="mentor">Mentor</option>
                <option value="student">Student</option>
              </select>
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
            Already have an account?
            <Link to="/sign-in">Sign In</Link>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
