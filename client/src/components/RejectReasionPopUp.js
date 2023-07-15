import React, { useState } from 'react'
import {AiOutlineCloseCircle} from "react-icons/ai"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { APIURL } from '../env'

const RejectReasionPopUp = ({setPopupVisible,isEmail,setIsClicked,FacultyEmail,FacultyName,equipName,slotToTime,slotFromTime,slotDate,userDetails}) => {

    const [rejectResion,setRejectResion] = useState("");

    const handleReject = async(e)=>{
        e.preventDefault();
        const EmailDetails = {...isEmail,userDetails,slotDate,slotToTime,slotFromTime,equipName,FacultyEmail,FacultyName,rejectResion}
        const sendEmail =  await axios.post(`${APIURL}/api/send-mail/reject`,EmailDetails);
        toast.success("Request Rejected");
        setIsClicked(true);
        setPopupVisible(false);
      }

      const handleClose = ()=>{
        setPopupVisible(false);
      }

      const handleReason = (e)=>{
        setRejectResion(e.target.value)
      }

  return (
    <div className='absolute top-0 left-0 w-full h-screen flex items-center justify-center'>
        <div className='absolute w-[500px]  bg-gray-300 rounded-md p-2'>
            <div className='w-full flex justify-end'>
                <button onClick={handleClose} className='text-2xl'>
                    <AiOutlineCloseCircle/>
                </button>
            </div>
            <div className='w-full flex justify-center'>
                <h3>REASON FOR CANCELATION!</h3> 
            </div>

            <div className='w-full'>
                <textarea onChange={handleReason} value={rejectResion} name="reason" id="" cols="30" rows="10" className='w-full p-1' placeholder='write here...'></textarea>
            </div>
            <div className='w-full flex items-center justify-center'>
                <button onClick={handleReject} className='bg-blue-500 text-white font-semibold p-1 rounded-md'>
                    Send
                </button>    
            </div>
        </div>
    </div>
  )
}

export default RejectReasionPopUp
