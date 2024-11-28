import React, { useState } from 'react'
import "./ViewStudentDetails.scss"
import PrimaryButton from '../Components/PrimaryButton/index.page'
import Modal from '../Components/Modal/index.page';

export default function ViewStudentDetails({
    isViewStudentDetailsOpen,
    setIsViewStudentDetailsOpen,
    // isViewStudentOpen,
    setIsViewStudentOpen
}) {
  const [isStudentRollModalOpen, setIsStudentRollModalOpen]=useState(false);
  return (
    <div className='view-student-details'>
      <h3 className='view-student-details-heading'>View Student's Details</h3>
      <div className='view-student-details-buttons'>
        <PrimaryButton
            text={`View Student's Details`}
            onClick={()=>{
                // setIsViewStudentDetailsOpen(false)
                // setIsViewStudentOpen(true)
                setIsStudentRollModalOpen(!isStudentRollModalOpen)
            }}
        />
        <PrimaryButton
            text={`View Batch Details`}
            onClick={()=>{}}
        />
      </div>
      {isStudentRollModalOpen && (
        <Modal
          isModalOpen={isStudentRollModalOpen}
          setIsModalOpen={setIsStudentRollModalOpen}
          title={`Enter Student's Roll Number`}
          content={
            <div>
              <label>ROLL NUMBER: </label>
              <input type="text"/>
            </div>
          }
          primaryButton={{
            text: "Search",
            onClick: ()=>{
              setIsStudentRollModalOpen(false)
              setIsViewStudentDetailsOpen(false)
              setIsViewStudentOpen(true)
            }
          }}
        />
      )}
    </div>
  )
}