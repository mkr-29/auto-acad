import React from "react";
import Popover from "../../Popover/index.page";
import { FiMenu } from "react-icons/fi";

export default function SelectTemplateCard({
  templateName,
  templateId,
  templateMenu,
  onChange,
}) {
  return (
    <div className="select-templates-box">
      <input type="radio" name="template" id={templateId} onChange={onChange} />
      <div className="select-templates-box-card">
        <label htmlFor={templateId}>{templateName}</label>
        <Popover
          icon={<FiMenu />}
          content={templateMenu}
          position={"leftBottom"}
          trigger="hover"
        />
      </div>
    </div>
  );
}
