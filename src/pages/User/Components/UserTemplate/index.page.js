import React, { useState } from "react";
import Navbar from "../../../../Components/Navbar/index.page";
import SideMenu from "../../../../Components/SideMenu/index.page";
import { ReactComponent as AutoAcadLogo } from "../../../assets/Logo/AutoAcadLogo.svg";

export default function UserTemplate({
    children,
}) {
    const [isMenuOpen, setIsMenuOpen]=useState(false);
  return (
    <div className="dashboard">
      <Navbar />
      <div className={`dashboard-main`}>
        <button
          className={`dashboard-menu ${isMenuOpen && "dashboard-menu-open"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars"></i>
          <span>MENU</span>
        </button>
        {isMenuOpen && (
          <SideMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
        <AutoAcadLogo className="dashboard-logo" />
        <div className="dashboard-screens">
          {children}
        </div>
      </div>
    </div>
  );
}
