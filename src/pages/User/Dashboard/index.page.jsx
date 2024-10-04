import React from 'react'
import Navbar from '../Components/Navbar/index.page'
import {ReactComponent as AutoAcadLogo} from '../../../assets/Logo/AutoAcadLogo.svg'
import './Dashboard.scss'

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Navbar/>
      <div className='dashboard-main'>
        <AutoAcadLogo className='dashboard-logo'/>
      </div>
    </div>
  )
}
