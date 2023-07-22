import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import PopupPage from "./RejectReasionPopUp";
import {toast} from 'react-hot-toast'
import { APIURL } from '../env';
import { useNavigate,Link } from 'react-router-dom';

const AdminPreviewSlots = ({equipId,slots,equipName,model,makeOfEquip,userDetails,setIsLoading}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const newdate = slots.date
  const date = new Date(newdate);
  const slotDate = slots.date
  const slotFromTime = slots.fromTime
  const slotToTime = slots.toTime
  const FacultyEmail = slots.email
  const FacultyName = slots.name
  const slotId = slots._id;
  const slotStatus = slots.slotStatus
  const navigate = useNavigate();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formatedDate = `${year}-${month}-${day}`;
  const dateOnly = `${formatedDate}T00:00:00.000Z`;
  const currentTime = currentDate.getHours().toString().padStart(2, '0') + ':'+ currentDate.getMinutes().toString().padStart(2, '0');

  const [isEmail, setIsEmail] = useState({
    to:"",
    subject:"",
    message:"",
    name:""
  });

  useEffect(() => {
    setIsEmail({
      to: slots.email,
      subject:"Equipment Booking Status",
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
      console.log(slotId)
        await axios.put(`${APIURL}/api/equip/slots/slotStatus/${equipId}/${slotId}`,{
          slotStatus : "Confirmed"
        })
      toast.success("Request Confirmed");
      setIsClicked(true);
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000); 
    }
    else{
      toast.success("Request Confirmation cancelled");
    }
  }

      const handleReject = async()=>{
        setPopupVisible(true)
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
              {makeOfEquip}
            </td>
            <td
              className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
            >
              {model}
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
            
            <td>
              <div  className="gap-6 flex ml-6">
                <div>
                  <button 
                  className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"} 
                  onClick={handleConfirm} 
                  disabled={slotStatus === 'Confirmed' || slotStatus ==="Rejected" || ((currentTime>=slotToTime) && (dateOnly>=slotDate)) }>
                    Confirm
                  </button>
                </div>
                <div>
                    <button 
                      className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"}
                      onClick={handleReject} 
                      disabled={slotStatus === 'Rejected' || slotStatus === 'Confirmed' || ((currentTime>=slotToTime) && (dateOnly>=slotDate)) }>
                        <a href="#navigateBox">Reject</a>
                    </button>
                  <div  id="navigateBox">
                    {isPopupVisible && <PopupPage setPopupVisible={setPopupVisible} isEmail={isEmail} userDetails={userDetails} slotDate={slotDate} slotFromTime={slotFromTime} slotToTime={slotToTime} equipName={equipName} FacultyName={FacultyName} FacultyEmail={FacultyEmail} setIsClicked={setIsClicked} equipId={equipId} slotId={slotId} setIsLoading={setIsLoading}/>}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
    </>
  )
}

export default AdminPreviewSlots