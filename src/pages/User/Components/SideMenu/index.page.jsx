import React from 'react'
import { Link } from 'react-router-dom'
import "./SideMenu.scss"

export default function SideMenu({
  
  isMenuOpen,
  setIsMenuOpen,
  isEnterStudentMarksOpen,
  setIsEnterStudentMarksOpen,

  isMainTemplateOpen,
  setIsMainTemplateOpen,
  
  isViewStudentDetailsOpen,
  setIsViewStudentDetailsOpen,
  isViewStudentOpen,
  setIsViewStudentOpen,

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
                setIsViewStudentOpen(false)
              }}
            >Enter Student's Marks</span>
        </li>
        <li>
            <span
              onClick={()=>{
                setIsMainTemplateOpen(!isMainTemplateOpen)
                setIsEnterStudentMarksOpen(false)
                setIsMenuOpen(!isMenuOpen)
                setIsViewStudentOpen(false)
              }}
            >Mail Templates</span>
        </li>
        <li>
            <span
              onClick={()=>{
                setIsViewStudentDetailsOpen(!isViewStudentDetailsOpen)
                setIsEnterStudentMarksOpen(false)
                setIsMenuOpen(!isMenuOpen)
                setIsViewStudentOpen(false)
              }}
            >View Student's Details</span>
        </li>
      </ul>
    </div>
  )
}
