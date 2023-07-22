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
    <div className="relative font-style flex  w-full items-center justify-center" >
      <div className='bg-[#DDEFF9] mb-2 rounded-lg'>

        <div className=" font-style md:w-[500px] w-[300px] flex flex-col mx-auto my-2 rounded-lg text-slate-950 bg-[#DDEFF9] md:max-w-xl md:flex-row items-center hover:brightness-90 transition duration-200 ease-in-out overflow-scroll" onClick={handleClick}>
          <img
            className="h-48 w-full md:m-4 rounded-t-lg  md:h-30 md:w-52 md:rounded-md"
            src={lab_img}
            alt="lab_img" />
          <div className=" font-style flex flex-col justify-center items-start p-6 cursor-pointer">
            <h5 className="font-style 1 text-md font-medium">
              Lab Name : {labName}
            </h5>
            <h5 className=" font-style 1 text-md font-medium">
              Department : {department}
            </h5>
            <h5 className="1 text-md font-medium">
              Lab No. : {labNo}
            </h5>
            <h5 className="1 text-md font-medium">
              Lab Incharge : {labIncharge}
            </h5>
            <h5 className="1 text-md font-medium">
              Contact no. : {contact}
            </h5>
            <h5 className="1 text-md font-medium">
              Incharge Email : {email}
            </h5>
          </div>
        </div>  
        {
          userDetails.userType == "SuperAdmin"?(
            <>
            <div className='w-full flex items-center justify-end mb-2 pr-4 gap-x-2'>
                <button onClick={handleEdit} className='flex  gap-1 items-center justify-end bg-blue-500 p-1 rounded-md text-white' >
                  <span>Edit Lab</span> <FaEdit />
                </button>
                <button onClick={handleDelete} className='flex items-center justify-end bg-blue-500 p-1 rounded-md text-white' >
                  <span>Delete Lab</span> <MdDeleteForever />
                </button>
            </div>
            </>
          ):(
            null
          )
        }
      </div>

    </div>
  )
}

export default LabDetails
