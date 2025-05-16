import React from 'react'
import "./PrimaryButton.scss"

export default function PrimaryButton({
    text,
    onClick,
    className,
    style,
}) {
  return (
    <button
        className={`primary-button ${className}`}
        onClick={onClick}
        style={style}
    >
        {text}
    </button>
  )
}
