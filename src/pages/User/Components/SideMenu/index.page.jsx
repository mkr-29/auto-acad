import React from 'react'
import { Link } from 'react-router-dom'
import "./SideMenu.scss"

export default function SideMenu({
  isEnterStudentMarksOpen,
  setIsEnterStudentMarksOpen,
}) {
  return (
    <div className='side-menu'>
      <ul>
        <li>
            <span
              onClick={()=>setIsEnterStudentMarksOpen(!isEnterStudentMarksOpen)}
            >Enter Student's Marks</span>
        </li>
        <li>
            <span>Mail Templates</span>
        </li>
        <li>
            <span>View Student's Details</span>
        </li>
      </ul>
    </div>
  )
}
