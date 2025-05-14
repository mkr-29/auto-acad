import React from "react";
import "../ComposeMail/SendMail.scss";
import PrimaryButton from "../../../../Components/PrimaryButton/index.page";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import emailjs from "@emailjs/browser";

export default function SendMail() {
  const formik = useFormik({
    initialValues: {
      to_email: "",
      to_name: "",
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
      sendMail(values);
    },
  });

  const sendMail = async (values) => {
    try {
      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          to_email: values.to_email,
          to_name: values.to_name,
          subject: values.subject,
          message: values.message,
          html_content: values.message,
        },
        {
          publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        }
      );
      
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        formik.resetForm();
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div>
      <div className="mail-preview">
        <h2 className="mail-preview-heading">Mail Preview</h2>
        <form onSubmit={formik.handleSubmit} className="mail-preview-box">
          <div className="mail-preview-header">
            <span>To:</span>
            <input
              type="text"
              value={formik.values.to_email || ""}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  to_email: e.target.value,
                });
              }}
            />
            <span>Name:</span>
            <input
              type="text"
              value={formik.values.to_name || ""}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  to_name: e.target.value,
                });
              }}
            />
            <span>Subject:</span>
            <input
              type="text"
              value={formik.values.subject || ""}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  subject: e.target.value,
                });
              }}
            />
          </div>
          <div className="mail-preview-body">
            <span>Body: </span>
            <ReactQuill
              className={`mail-preview-compose editable`}
              theme="snow"
              value={formik.values.message || ""}
              onChange={(value) => {
                formik.setValues({
                  ...formik.values,
                  message: value,
                });
              }}
            />
          </div>
          <PrimaryButton text={"Send Mail"} type="submit" />
        </form>
      </div>
    </div>
  );
}
