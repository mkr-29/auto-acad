import React, { useState } from "react";
import "./SendMailToStudent.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import PrimaryButton from "../../../../Components/PrimaryButton/index.page";
import SelectTemplate from "../../../../Components/SelectTemplate/index.page";
import { toast } from "react-toastify";
import { userRoutes } from "../../../../routes/appRoutes";

export default function SendMailToStudent() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
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
            text={
              selectedTemplate
                ? loading
                  ? "Sending..."
                  : "Send Mail"
                : "Select Template"
            }
            onClick={() => {
              if (selectedTemplate) {
                navigate(userRoutes.mail(selectedTemplate, "view"));
              } else {
                toast.warning("Please select a template!");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
