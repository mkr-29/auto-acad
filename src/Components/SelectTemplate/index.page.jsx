import React, { useEffect } from "react";
import "./SelectTemplate.scss";
import SelectTemplateCard from "./SelectTemplateCard/index.page";
import { Link } from "react-router-dom";
import { userRoutes } from "../../routes/appRoutes";
import { IoIosAddCircleOutline } from "react-icons/io";
import { EmailService } from "../../pages/User/Services/EmailServices";
import { toast } from "react-toastify";

export default function SelectTemplate({ setSelectedTemplate }) {
  const [templates, setTemplates] = React.useState([]);

  const getEmailTemplates = async () => {
    try {
      const response = await EmailService.getEmails();

      const { success } = response;
      if (success) {
        setTemplates(response.data);
        return response;
      } else {
        toast.error("Error getting email templates!");
        return response;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTemplate = async (templateId) => {
    try {
      const response = await EmailService.deleteEmail(templateId);
      if (response.success) {
        toast.success("Template deleted successfully!");
        getEmailTemplates();
      } else {
        toast.error("Error deleting template!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEmailTemplates();
  }, []);

  return (
    <div className="select-template">
      <div className="select-template-header">
        <h2 className="select-template-heading">Select Template</h2>
        <Link to={userRoutes.addEmailTemplate}>
          <IoIosAddCircleOutline />
        </Link>
      </div>
      <div className="select-templates">
        {templates.map((template, index) => (
          <SelectTemplateCard
            templateName={`Template ${index + 1}`}
            templateId={template._id}
            onChange={() => setSelectedTemplate(template._id)}
            templateMenu={
              <div>
                <Link to={`${userRoutes.mail(template._id, "view")}`}>
                  View Template
                </Link>
                <Link to={`${userRoutes.mail(template._id, "edit")}`}>
                  Edit Template
                </Link>
                <Link to="#" onClick={() => deleteTemplate(template._id)}>
                  Delete Template
                </Link>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
