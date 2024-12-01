import React from "react";
import "./ViewStudentDetailCard.scss";

export default function ViewStudentDetailCard({ subjectName, t1, t2, t3 }) {
  return (
    <div className="vsdc">
      <div className="vsdc-box">
        <span className="vsdc-box-head">SUBJECT NAME</span>
        <span className="vsdc-box-data">{subjectName}</span>
      </div>
        <div className="vsdc-box">
            <span className="vsdc-box-head">T1 MARKS</span>
            <span className="vsdc-box-data">{t1}</span>
        </div>
        <div className="vsdc-box">
            <span className="vsdc-box-head">T2 MARKS</span>
            <span className="vsdc-box-data">{t2}</span>
        </div>
        <div className="vsdc-box">
            <span className="vsdc-box-head">T3 MARKS</span>
            <span className="vsdc-box-data">{t3}</span>
        </div>
    </div>
  );
}
