import React from "react";
import "./AddEmailTemplate.scss";
import ReactQuill from "react-quill";
import PrimaryButton from "../../../../Components/PrimaryButton/index.page";
import { EmailService } from "../../Services/EmailServices";
import { toast } from "react-toastify";
import { getUserId } from "../../Utils/helper";
import { useNavigate } from "react-router-dom";

export default function AddEmailTemplate() {
  const [emailContent, setEmailContent] = React.useState({
    subject: "",
    body: "",
  });
  const [loading, setLoading] = React.useState(false);
  const userId = getUserId();
  const navigate = useNavigate();

  const saveTemplate = async () => {
    // Save template to the database
    const payload = {
      subject: emailContent.subject,
      body: emailContent.body,
      userId: userId,
    };

    if (!payload.subject || !payload.body) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await EmailService.addEmail(payload);

      const { success } = response;
      if (success) {
        toast.success("Email template added successfully!");
        navigate("/user/send-mail-to-student");
        return response;
      } else {
        toast.error("Error adding email template!");
        return response;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-template">
      <div className="mail-preview-box">
        <div className="mail-preview-header">
          <span>Subject:</span>
          <input
            type="text"
            value={emailContent.subject}
            onChange={(e) => {
              setEmailContent({
                ...emailContent,
                subject: e.target.value,
              });
            }}
          />
        </div>
        <div className="mail-preview-body">
          <span>Body: </span>
          <ReactQuill
            theme="snow"
            value={emailContent.body}
            onChange={(value) => {
              setEmailContent({
                ...emailContent,
                body: value,
              });
            }}
            className="mail-preview-compose"
          />
        </div>
      </div>
      <PrimaryButton
        text={loading ? "Loading..." : "Save Template"}
        onClick={saveTemplate}
      />
    </div>
  );
}
