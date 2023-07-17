import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import PopupPage from "./RejectReasionPopUp";
import {toast} from 'react-hot-toast'
import { APIURL } from '../env';

const AdminPreviewSlots = ({slots,equipName,model,makeOfEquip,userDetails,setIsLoading}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [slotStatus, setSlotStatus] = useState();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const newdate = slots.date
  const date = new Date(newdate);
  const slotDate = slots.date
  const slotFromTime = slots.fromTime
  const slotToTime = slots.toTime
  const FacultyEmail = slots.email
  const FacultyName = slots.name

  const [isEmail, setIsEmail] = useState({
    to:"",
    subject:"",
    message:"",
    name:""
  });

  useEffect(() => {
    setIsEmail({
      to: slots.email,
      subject:"Equipment Booking Confirmation",
      message:"",
    });
  }, [slots]);


  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const handleConfirm= async(e)=>{
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to confirm the slot");
    if(confirmed){
      setIsLoading(true)
      const EmailDetails = {...isEmail,userDetails,slotDate,slotToTime,slotFromTime,equipName,FacultyEmail,FacultyName}
      const sendEmail =  await axios.post(`${APIURL}/api/send-mail/confirm`,EmailDetails);
      toast.success("Request Confirmed");
      setIsClicked(true);
      setIsLoading(false);
    }
    else{
      toast.success("Request Confirmation canceled");
    }
  }

  const handleReject = ()=>{
    setPopupVisible(true);
  }
  
  return (
      <>
          <tbody className=" bg-white divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
                <tr>
                  <td
                    className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap border-r-2 border-gray-300 dark:text-black"
                  >
                    {slots.name}
                  </td>
                  <td
                    className="py-4 px-6 text-sm font-medium text-black whitespace-pre-wrap border-r-2 border-gray-300 dark:text-black"
                  >
                  {slots.email}
                  </td>
                  <td
                    className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    {equipName}
                  </td>
                  <td
                    className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    {formattedDate}
                  </td>
                  <td
                    className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    {slots.fromTime}
                  </td>
                  <td
                    className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    {slots.toTime}
                  </td>
                  <td
                    className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    {makeOfEquip}
                  </td>
                  <td
                    className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    {model}
                  </td>
                  <td>
                    <div  className="gap-6 flex ml-6">
                      <div>
                        <button 
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${isClicked ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handleConfirm} 
                        disabled={slotStatus === 'confirm'}>
                          Confirm    
                        </button>
                      </div>
                      <div>
                        <button 
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${isClicked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleReject} 
                        disabled={slotStatus === 'rejected'}>
                          Reject
                        </button>
                        {isPopupVisible && <PopupPage setPopupVisible={setPopupVisible} isEmail={isEmail} userDetails={userDetails} slotDate={slotDate} slotFromTime={slotFromTime} slotToTime={slotToTime} equipName={equipName} FacultyName={FacultyName} FacultyEmail={FacultyEmail} setIsClicked={setIsClicked}/>}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
    </>
  )
}

export default AdminPreviewSlots