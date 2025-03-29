import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MailsJson from "./mailTemplates.json";
import { FaRegEdit } from "react-icons/fa";
import "./SendMail.scss";
import PrimaryButton from "../../../../Components/PrimaryButton/index.page";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EmailService } from "../../Services/EmailServices";
import { toast } from "react-toastify";

export default function SendMail({ selectedTemplate = "template1" }) {
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
        {isEditing ? (
          <div className="mail-preview-box">
            <div className="mail-preview-header">
              <span>Subject:</span>
              <input
                type="text"
                value={mailToRender?.subject || ""}
                onChange={(e) => {
                  // setMailToRender({
                  //   ...mailToRender,
                  //   subject: e.target.value,
                  // });
                }}
              />
            </div>
            <div className="mail-preview-body">
              <span>Body: </span>
              <ReactQuill
                theme="snow"
                value={content || ""}
                onChange={setContent}
                className="mail-preview-compose"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
                formats={[
                  'header',
                  'bold', 'italic', 'underline', 'strike',
                  'list', 'bullet',
                  'color', 'background',
                  'link', 'image'
                ]}
              />
            </div>
          </div>
        ) : (
          <div className="mail-preview-box">
            <div className="mail-preview-header">
              <span>Subject:</span>
              <h3>{mailToRender?.subject}</h3>
            </div>
            <div className="mail-preview-body">
              <span>Body: </span>
              <ReactQuill
                readOnly
                theme="snow"
                value={content}
                onChange={setContent}
                className="mail-preview-compose-read"
                modules={{
                  toolbar: false,
                }}
              />
            </div>
          </div>
        )}
        <PrimaryButton
          text={isEditing ? "Save Mail Template" : "Send Mail"}
          onClick={() => {
            setIsEditing(false);
            // sendEmail();
          }}
        />
      </div>
    </div>
  );
}
