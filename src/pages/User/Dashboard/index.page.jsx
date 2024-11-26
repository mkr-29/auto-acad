import React, { useState } from "react";
import Navbar from "../Components/Navbar/index.page";
import { ReactComponent as AutoAcadLogo } from "../../../assets/Logo/AutoAcadLogo.svg";
import "./Dashboard.scss";
import SideMenu from "../Components/SideMenu/index.page";
import EnterStudentMarks from "../EnterStudentMarks/index.page";

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen]=useState(false);
  const [isEnterStudentMarksOpen, setIsEnterStudentMarksOpen]=useState(false);
  return (
    <div className="dashboard">
      <Navbar />
      <div className={`dashboard-main`}>
        <button 
          className={`dashboard-menu ${isMenuOpen && "dashboard-menu-open"}`}
          onClick={()=>setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars"></i>
          <span>MENU</span>
        </button>
        {isMenuOpen && (
          <SideMenu
            isEnterStudentMarksOpen={isEnterStudentMarksOpen}
            setIsEnterStudentMarksOpen={setIsEnterStudentMarksOpen}
          />
        )}
        <AutoAcadLogo className="dashboard-logo" />
        <div>
          {isEnterStudentMarksOpen && (
            <EnterStudentMarks/>
          )}
        </div>
      </div>
    </div>
  );
}
