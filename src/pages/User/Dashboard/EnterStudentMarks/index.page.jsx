import React from "react";
import "./studentMarks.scss";
import { Link } from "react-router-dom";
import { userRoutes } from "../../../../routes/appRoutes";

export default function EnterStudentMarks() {
  return (
    <div class="enter-student-marks">
      <h2>Enter Student Marks</h2>
      <div className="box">
        <Link className="primary-button" to={userRoutes.enterMarksManually}>
          Enter Marks Manually
        </Link>
        <Link className="primary-button" to={userRoutes.enterMarksUsingCsv}>
          Enter Marks Using CSV File
        </Link>
      </div>
    </div>
  );
}
