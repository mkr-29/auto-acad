import React from "react";
import "./ViewStudent.scss";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ViewStudentDetailCard from "../../Components/ViewStudentDetailCard/index.page";
import PrimaryButton from "../../Components/PrimaryButton/index.page";

export default function ViewStudent({
  isViewStudentOpen,
  setIsViewStudentOpen,
  isViewStudentDetailsOpen,
  setIsViewStudentDetailsOpen,
}) {
  return (
    <div className="view-student">
      <h3 className="view-student-heading">View Student's Details</h3>
      <IoArrowBackCircleOutline
        className="view-student-back"
        onClick={() => {
          setIsViewStudentOpen(!isViewStudentOpen);
          setIsViewStudentDetailsOpen(!isViewStudentDetailsOpen);
        }}
      />
      <div className="view-student-personal-details">
        <div className="view-student-personal-details-left">
          <div className="view-student-personal-detail">
            <label>ROLL NUMBER: </label>
            <span>{"Student's Name"}</span>
          </div>
          <div className="view-student-personal-detail">
            <label>FATHER'S NAME: </label>
            <span>{"Father's Name"}</span>
          </div>
          <div className="view-student-personal-detail">
            <label>CURRENT CGPA: </label>
            <span>{"CGPA"}</span>
          </div>
        </div>
        <div className="view-student-personal-details-left">
          <div className="view-student-personal-detail">
            <label>STUDENT'S NAME: </label>
            <span>{"Student's Name"}</span>
          </div>
          <div className="view-student-personal-detail">
            <label>FATHER'S EMAIL: </label>
            <span>{"Father's Email"}</span>
          </div>
          <div className="view-student-personal-detail-sg">
            <div className="view-student-personal-detail-sg-p">
              <label>LAST SEMERSTER'S SGPA: </label>
              <span>{"SGPA"}</span>
            </div>
            <span className="view-student-personal-detail-sgs">
              View all SGs
            </span>
          </div>
        </div>
      </div>
      <div className="view-student-personal-detail-academics">
        <ViewStudentDetailCard
          subjectName={"Subject Name"}
          t1={"T1"}
          t2={"T2"}
          t3={"T3"}
        />
      </div>
      <div className="view-student-send-mail">
        <div className="view-student-send-mail-in">
          <p>Send a Mail to Parent</p>
          <div className="view-student-send-mail-in-buttons">
            <PrimaryButton
              text="Send a custom Mail"
              onClick={() => {
                console.log("Mail Sent");
              }}
            />
            <PrimaryButton
              text="Send a Template Mail"
              onClick={() => {
                console.log("Mail Sent");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
