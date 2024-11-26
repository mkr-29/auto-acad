import React from 'react'
import { Link } from 'react-router-dom'
import "./SideMenu.scss"

export default function SideMenu() {
  return (
    <div className='side-menu'>
      <ul>
        <li>
            <Link to="">Enter Student's Marks</Link>
        </li>
        <li>
            <Link to="">Mail Templates</Link>
        </li>
        <li>
            <Link to="">View Student's Details</Link>
        </li>
      </ul>
    </div>
  )
}
