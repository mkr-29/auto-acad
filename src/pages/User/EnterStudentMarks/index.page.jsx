import React from 'react'
import "./studentMarks.scss";
import PrimaryButton from '../../../Components/PrimaryButton/index.page';

export default function EnterStudentMarks() {
  return (
    <div class="enter-student-marks">
      <h2>Enter Student Marks</h2>
      <div className="box">
        <PrimaryButton
          text="Enter Marks Manually"
          onClick={()=>{}}
        />
        <PrimaryButton
          text="Enter Marks Using CSV File"
          onClick={()=>{}}
        />
      </div>  
    </div>
  )
}
