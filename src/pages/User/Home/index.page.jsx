import React from "react";
import Navbar from "../Components/Navbar/index.page";
import { ReactComponent as AutoAcadLogo } from "../../../assets/Logo/AutoAcadLogo.svg";
import "./Home.scss";
import About from "../Components/About/index.page";
import Footer from "../Components/Footer/index.page";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="home-landing">
        <AutoAcadLogo className="home-logo" />
        <div className="home-landing-main">
          <h1>AutoAcad</h1>
          <p>An automated solution for your academic works.</p>
        </div>
      </div>
      <About />
      <Footer/>
    </div>
  );
}
