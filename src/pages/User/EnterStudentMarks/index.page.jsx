import React from 'react'
import "./studentMarks.scss";

export default function EnterStudentMarks() {
  return (
    <div class="enter-student-marks">
      <h2>Enter Student Marks</h2>
      <div className="box">
        <div className="enter-marks">Enter Marks Manually</div>
        <div className="enter-marks">Enter Marks Using CSV File</div>
      </div>  
    </div>
  )
}
