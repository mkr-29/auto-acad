import React from "react";
import "./SideMenu.scss";
import { Link } from "react-router-dom";
import { userRoutes } from "../../routes/appRoutes";

export default function SideMenu({ isMenuOpen, setIsMenuOpen }) {
  
  return (
    <div className="side-menu">
      <ul>
        <li>
          <Link
            to={userRoutes.addStudentToMentor}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            Add Student to Mentor
          </Link>
        </li>
        <li>
          <Link
            to={userRoutes.enterStudentMarks}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            Enter Student's Marks
          </Link>
        </li>
        <li>
          <Link
            to={userRoutes.sendMailToStudent}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            Mail Templates
          </Link>
        </li>
        <li>
          <Link
            to={userRoutes.viewStudents}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            View Students
          </Link>
        </li>
        <li>
          <Link
            to={userRoutes.sendMail}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            Send Mail to Student
          </Link>
        </li>
      </ul>
    </div>
  );
}
