import React from 'react'
import { Link } from 'react-router-dom'
import "./SideMenu.scss"

export default function SideMenu({
  isMenuOpen,
  setIsMenuOpen,
  isEnterStudentMarksOpen,
  setIsEnterStudentMarksOpen,
  isViewStudentDetailsOpen,
  setIsViewStudentDetailsOpen
}) {
  return (
    <div className='side-menu'>
      <ul>
        <li>
            <span
              onClick={()=>{
                setIsEnterStudentMarksOpen(!isEnterStudentMarksOpen)
                setIsViewStudentDetailsOpen(false)
                setIsMenuOpen(!isMenuOpen)
              }}
            >Enter Student's Marks</span>
        </li>
        <li>
            <span>Mail Templates</span>
        </li>
        <li>
            <span
              onClick={()=>{
                setIsViewStudentDetailsOpen(!isViewStudentDetailsOpen)
                setIsEnterStudentMarksOpen(false)
                setIsMenuOpen(!isMenuOpen)
              }}
            >View Student's Details</span>
        </li>
      </ul>
    </div>
  )
}
