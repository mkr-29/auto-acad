import React, { useEffect, useRef, useState } from "react";
import "./Popover.scss";

export default function Popover({
  className,
  icon,
  content,
  position = "rightBottom",
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef();
  
  // if i click outside the popover, it should close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
