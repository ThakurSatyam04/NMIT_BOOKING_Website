import React from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import lab_img from "../assets/computer_lab_img.jpg"
import { useNavigate} from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import { APIURL } from '../env';
import { FaEdit } from 'react-icons/fa';

const LabDetails = ({labId,labName,labNo,labIncharge,contact,email,department,picture,equipments,featured,userDetails}) => {    

  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/equipDetail/${labId}`);
  }

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete the lab?");
  
      if (confirmed) {
        const deleteLab = await axios.delete(`${APIURL}/api/labs/deleteLab/${labId}`);
        window.location.reload();
        toast.success("Lab deleted successfully");
      } else {
        toast.success("Lab deletion cancelled");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async()=>{
    try{
      alert("press Ok to edit");
      navigate(`/editLabForm/${labId}`)
    }catch(e){
    }
  }
  

  return (
    <div className="relative font-style flex w-full items-center justify-center">
  <div className="bg-[#DDEFF9] mb-4 mt-4 rounded-lg overflow-hidden">
    <div className="font-style md:w-[500px] w-[300px] flex flex-col mx-auto my-2 rounded-lg text-slate-950 bg-[#DDEFF9] md:max-w-xl md:flex-row items-center hover:brightness-90 transition duration-200 ease-in-out" onClick={handleClick}>
      <img
        className="h-48 w-full md:m-4 rounded-t-lg p-4 md:h-30 md:p-0 md:w-52 md:rounded-md object-cover"
        src={lab_img}
        alt="lab_img"
      />
      <div className="font-style flex flex-col justify-center items-start md:p-2 p-6 cursor-pointer">
        <p className="text-sm mb-2">
          <span className="font-semibold">Lab Name:</span> {labName}
        </p>
        <p className="text-sm mb-2">
          <span className="font-semibold">Department:</span> {department}
        </p>
        <p className="text-sm mb-2">
          <span className="font-semibold">Lab No.:</span> {labNo}
        </p>
        <p className="text-sm mb-2">
          <span className="font-semibold">Lab Incharge:</span> {labIncharge}
        </p>
        <p className="text-sm mb-2">
          <span className="font-semibold">Contact no.:</span> {contact}
        </p>
        <p className="text-sm mb-2">
          <span className="font-semibold">Incharge Email:</span> {email}
        </p>
      </div>
    </div>
    
    {userDetails.userType === "SuperAdmin" && (
      <div className='w-full flex items-center justify-end mb-2 pr-4 gap-x-2'>
        <button onClick={handleEdit} className='flex gap-1 items-center justify-end bg-blue-500 p-1 rounded-md text-white'>
          <span>Edit Lab</span> <FaEdit />
        </button>
        <button onClick={handleDelete} className='flex items-center justify-end bg-blue-500 p-1 rounded-md text-white'>
          <span>Delete Lab</span> <MdDeleteForever />
        </button>
      </div>
    )}
  </div>
</div>


  )
}

export default LabDetails
