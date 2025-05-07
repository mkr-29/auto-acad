import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Navbar from "../../../Components/Navbar/index.page";
import Footer from "../../../Components/Footer/index.page";
import AuthContext from "../../../context/AuthContext";
import { UserServices } from "../Services/UserServices";
import { toast } from "react-toastify";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      userId: "",
      password: "",
      confirmPassword: "",
      role: "mentor",
      // rememberMe: false,
    },
    onSubmit: () => {
      handleSubmit(formik.values);
      formik.resetForm();
    },
  });

  const handleSubmit = async (values) => {
    // Check if any required field is empty
    if (
      !values.name ||
      !values.userId ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.error("Password and Confirm Password should be same");
      return;
    }

    const data = {
      ...values,
      userId: values.userId.toString(),
    };
    delete data.confirmPassword;

    setLoading(true);

    try {
      const response = await UserServices.register(data);
      if (response.success) {
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
        toast.success("Sign up successful!");
      } else {
        toast.error(response.message || "Error during signup");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Error during signup");
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
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label>NAME</label>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
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
                name="userId"
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
                name="email"
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
                name="password"
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
                name="confirmPassword"
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
                name="role"
                id="role"
              >
                <option value="mentor">Mentor</option>
                <option value="student">Student</option>
              </select>
            </div>
            {/* <div className="remember-me">
              <p>Remember Me</p>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="remember-me-checkbox"
                id="rememberMe"
              />
            </div> */}
            <button
              type="submit"
              className="sign-in-box-inner-button"
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
