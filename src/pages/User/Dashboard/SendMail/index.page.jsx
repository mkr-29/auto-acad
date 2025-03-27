import React, { useState } from "react";
import MailsJson from "./mailTemplates.json";
import { FaRegEdit } from "react-icons/fa";
import "./SendMail.scss";
import PrimaryButton from "../../../../Components/PrimaryButton/index.page";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function SendMail({ selectedTemplate = "template1" }) {
  const [isEditing, setIsEditing] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [message, setMessage] = useState("");
  
  const mailToRender = MailsJson.find(
    (mail) => mail.templateId === selectedTemplate
  );
  const [content, setContent] = useState(mailToRender?.body);

  //   const sendEmail = async () => {
  //     const transporter = nodemailer.createTransport({
  //       host: 'smtp.gmail.com',
  //       port: 587,
  //       secure: false,
  //       auth: {
  //         user: 'your-email@example.com',
  //         pass: 'your-password',
  //       },
  //     });
  //     const mailOptions = {
  //       from: 'your-email@example.com',
  //       to: email,
  //       subject: 'Hello from ReactJS',
  //       text: message,
  //     };
  //     try {
  //       await transporter.sendMail(mailOptions);
  //       console.log('Email sent successfully');
  //     } catch (error) {
  //       console.error('Error sending email:', error);
  //     }
  //   };

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
                value={mailToRender?.subject}
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
              <ReactQuill theme="snow" value={content} onChange={setContent} className="mail-preview-compose" />
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
              <p>{mailToRender?.body}</p>
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
