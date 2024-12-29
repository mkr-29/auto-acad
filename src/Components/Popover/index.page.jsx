import React, { useRef, useState } from "react";
import "./Popover.scss";

export default function Popover({
  className,
  icon,
  content,
  position = "rightBottom",
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef();

  return (
    <div
      ref={popoverRef}
      className={`popover ${className}`}
      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
    >
      <div className={`popover-icon`}>{icon}</div>
      <div>
        {isPopoverOpen && <div className={`popover-content ${position}`}>{content}</div>}
      </div>
    </div>
  );
}
