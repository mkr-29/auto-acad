import React, { useState } from "react";
import Navbar from "../Components/Navbar/index.page";
import { ReactComponent as AutoAcadLogo } from "../../../assets/Logo/AutoAcadLogo.svg";
import "./Dashboard.scss";
import SideMenu from "../Components/SideMenu/index.page";
import EnterStudentMarks from "../EnterStudentMarks/index.page";
import ViewStudentDetails from "../ViewStudentDetails/index.page";
import ViewStudent from "../ViewStudentDetails/ViewStudent/index.page";
import MainTemplate from "../MainTemplate/index.page";

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen]=useState(false);
  const [isEnterStudentMarksOpen, setIsEnterStudentMarksOpen]=useState(false);
  const [isViewStudentDetailsOpen, setIsViewStudentDetailsOpen]=useState(false);
  const [isViewStudentOpen, setIsViewStudentOpen]=useState(false);
  const [isMainTemplateOpen, setIsMainTemplateOpen]=useState(false);
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
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isEnterStudentMarksOpen={isEnterStudentMarksOpen}
            setIsEnterStudentMarksOpen={setIsEnterStudentMarksOpen}
            isViewStudentDetailsOpen={isViewStudentDetailsOpen}
            setIsViewStudentDetailsOpen={setIsViewStudentDetailsOpen}
            isVewStudentOpen={isViewStudentOpen}
            setIsViewStudentOpen={setIsViewStudentOpen}
            isMainTemplateOpen={isMainTemplateOpen}
            setIsMainTemplateOpen={setIsMainTemplateOpen}
          />
        )}
        <AutoAcadLogo className="dashboard-logo" />
        <div className="dashboard-screens">
          {isEnterStudentMarksOpen && (
            <EnterStudentMarks/>
          )}
          {isViewStudentDetailsOpen && (
            <ViewStudentDetails
              isViewStudentDetailsOpen={isViewStudentDetailsOpen}
              setIsViewStudentDetailsOpen={setIsViewStudentDetailsOpen}
              isViewStudentOpen={isViewStudentOpen}
              setIsViewStudentOpen={setIsViewStudentOpen}
            />
          )}
          {isViewStudentOpen && (
            <ViewStudent
              isViewStudentOpen={isViewStudentOpen}
              setIsViewStudentOpen={setIsViewStudentOpen}
              isViewStudentDetailsOpen={isViewStudentDetailsOpen}
              setIsViewStudentDetailsOpen={setIsViewStudentDetailsOpen}
            />
          )}
          {isMainTemplateOpen && (
            <MainTemplate
              isMainTemplateOpen={isMainTemplateOpen}
              setIsMainTemplateOpen={setIsMainTemplateOpen}
            />
          )
          }
        </div>
      </div>
    </div>
  );
}
