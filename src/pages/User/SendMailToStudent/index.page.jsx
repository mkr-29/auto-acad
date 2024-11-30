import React, { useState } from "react";
import Navbar from "../Components/Navbar/index.page";
import Footer from "../Components/Footer/index.page";
import "./SendMailToStudent.scss";
import SideMenu from "../Components/SideMenu/index.page";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../Components/PrimaryButton/index.page";
import SelectTemplate from "../Components/SelectTemplate/index.page";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { ReactComponent as AutoAcadLogo } from "../../../assets/Logo/AutoAcadLogo.svg";

export default function SendMailToStudent() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("");

  return (
    <div>
      <Navbar />
      <AutoAcadLogo className="dashboard-logo" />
      <div className="send-mail-stu">
        <h1 className="send-mail-stu-heading">Send Mail To Student</h1>
        <Link to="/user/dashboard" className="send-mail-stu-back">
          <IoArrowBackCircleOutline />
        </Link>
        <SelectTemplate 
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
        <div>
          <PrimaryButton 
            text="Send Mail"
            onClick={() => navigate("/user/mail")}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
