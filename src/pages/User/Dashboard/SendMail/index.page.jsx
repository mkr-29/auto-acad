import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import "./SendMail.scss";
import PrimaryButton from "../../../../Components/PrimaryButton/index.page";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EmailService } from "../../Services/EmailServices";
import { toast } from "react-toastify";

export default function SendMail() {
  const [isEditing, setIsEditing] = useState(false);
  const { mode, templateId } = useParams();
  const [mailToRender, setMailToRender] = useState({});
  const [content, setContent] = useState("");

  const getEmailTemplate = async () => {
    try {
      const response = await EmailService.getEmailTemplate(templateId);
      if (response.success) {
        setMailToRender(response.data);
        setContent(response.data.body);
      } else {
        toast.error("Error getting email template!");
      }
    } catch (error) {
      console.error("Error getting email template:", error);
    }
  };

  useEffect(() => {
    getEmailTemplate();
  }, []);

  useEffect(() => {
    if (mode === "edit") {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [mode]);

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
              // sendEmail();
              console.log(mailToRender);
            }
          }}
        />
      </div>
    </div>
  );
}
