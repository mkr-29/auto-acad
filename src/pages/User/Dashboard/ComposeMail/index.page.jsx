import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import "./SendMail.scss";
import PrimaryButton from "../../../../Components/PrimaryButton/index.page";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EmailService } from "../../Services/EmailServices";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useAtom } from "jotai";
import { parentsDataAtom } from "../../../../atom";

export default function ComposeMail() {
  const [isEditing, setIsEditing] = useState(false);
  const { mode, templateId } = useParams();
  const [mailToRender, setMailToRender] = useState({});
  const [content, setContent] = useState("");
  const [sendMailData, setSendMailData] = useState({
    to_email: "",
    to_name: "",
    to_student_name: "",
    subject: "",
    message: "",
  });
  const [parentsData, setParentsData] = useAtom(parentsDataAtom);

  const getEmailTemplate = async () => {
    try {
      const response = await EmailService.getEmailTemplate(templateId);
      if (response.success) {
        const { data } = response;
        console.log("response", data);
        setMailToRender(data);
        setContent(data.body);
      } else {
        toast.error("Error getting email template!");
      }
    } catch (error) {
      console.error("Error getting email template:", error);
    }
  };

  const sendMail = async () => {
    try {
      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          to_email: sendMailData.to_email,
          to_name: sendMailData.to_name,
          to_student_name: sendMailData.to_student_name,
          subject: mailToRender.subject,
          message: mailToRender.body,
          html_content: mailToRender.body,
        },
        {
          publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        }
      );
      
      if (response.status === 200) {
        toast.success("Email sent successfully!");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  useEffect(() => {
    getEmailTemplate();
    if(parentsData){
      if(parentsData?.father){
        setSendMailData({
          to_email: parentsData?.father?.email,
          to_name: parentsData?.father?.name,
          to_student_name: parentsData?.student,
          subject: mailToRender.subject,
          message: mailToRender.body,
        });
        return;
      } else if(parentsData?.mother){
        setSendMailData({
          to_email: parentsData?.mother?.email,
          to_name: parentsData?.mother?.name,
          to_student_name: parentsData?.student,
          subject: mailToRender.subject,
          message: mailToRender.body,
        });
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (mode === "edit") {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [mode]);

  console.log("parentsData", parentsData);
  console.log("mailToRender", mailToRender);
  console.log("sendMailData", sendMailData);
  const updateEmailTemplate = async () => {
    try {
      const payload = {
        subject: mailToRender.subject,
        body: content,
        id: mailToRender._id,
      }
      const response = await EmailService.updateEmailTemplate(payload);
      if (response.success) {
        toast.success("Email template updated successfully!");
      } else {
        toast.error("Error updating email template!");
      }
    } catch (error) {
      console.error("Error updating email template:", error);
      toast.error("Error updating email template!");
    }
  };

  return (
    <div>
      <div className="mail-preview">
        <h2 className="mail-preview-heading">Mail Preview</h2>
        <div className="mail-preview-edit">
          <FaRegEdit
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
        </div>
        <div className="mail-preview-box">
          <div className="mail-preview-header">
            <span>Subject:</span>
            <input
              type="text"
              value={mailToRender?.subject || ""}
              disabled={!isEditing}
              onChange={(e) => {
                setMailToRender({
                  ...mailToRender,
                  subject: e.target.value,
                });
              }}
            />
          </div>
          <div className="mail-preview-body">
            <span>Body: </span>
            <ReactQuill
              theme="snow"
              value={content || ""}
              onChange={(value)=> {
                setContent(value);
              }}
              readOnly={!isEditing}
              className={`mail-preview-compose ${isEditing ? "editable" : "non-editable"}`}
            />
          </div>
        </div>
        <PrimaryButton
          text={isEditing ? "Save Mail Template" : "Send Mail"}
          onClick={() => {
            setIsEditing(false);
            if(isEditing){
              updateEmailTemplate();
            }else{
              sendMail();
            }
          }}
        />
      </div>
    </div>
  );
}
