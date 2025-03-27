import React from "react";
import "./About.scss";

export default function About() {
  return (
    <div className="about" id="about">
      <h2>About</h2>
      <p>AutoAcad is an automated solution for your academic works.</p>
      <h3>Features</h3>
      <ul>
        <li>View Student Profile and Academic Details.</li>
        <li>View Student Attendance.</li>
        <li>View Student Marks.</li>
        <li>Analyze Student Performance with Graphs.</li>
        <li>
          Create mail templates for sending emails to students and parents.
        </li>
        <li>Quickly sort and filter students based on their performance.</li>
        <li>Easily mentor students with the help of the student profile.</li>
      </ul>
    </div>
  );
}
