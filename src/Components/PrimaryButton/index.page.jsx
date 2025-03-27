import React from 'react'
import "./PrimaryButton.scss"

export default function PrimaryButton({
    text,
    onClick,
    className,
}) {
  return (
    <button
        className={`primary-button ${className}`}
        onClick={onClick}
    >
        {text}
    </button>
  )
}
