import React from 'react'
import lab_img from "../assets/Lab_Img.png"
import { useNavigate, useParams } from 'react-router-dom'

const LabDetails = ({_id,labName,labNo,labIncharge,contact,email,department,picture,equipments,featured}) => {    

  const navigate = useNavigate();
  
  const handleClick = (e) => {
    // console.log(_id)
    navigate(`/equipDetail/${_id}`);
  }
  return (
    <div className="flex justify-center w-full">

      <div className="min-w-fit flex flex-col mx-auto my-4 rounded-lg text-slate-950 bg-[#DDEFF9] md:max-w-xl md:flex-row justify-center items-center">
        <img
          className="h-48 w-full m-4 rounded-t-lg object-cover md:h-30 md:w-52 md:rounded-lg"
          src={lab_img}
          alt="lab_img" />
        <div className="flex flex-col justify-center items-start p-6 ">
          <h5 className="mb-2 text-md font-medium">
            Lab Name : {labName}
          </h5>
          <h5 className="mb-2 text-md font-medium">
            Department : {department}
          </h5>
          <h5 className="mb-2 text-md font-medium">
            Lab No. : {labNo}
          </h5>
          <h5 className="mb-2 text-md font-medium">
            Lab Incharge : {labIncharge}
          </h5>
          <h5 className="mb-2 text-md font-medium">
            Contact no. : {contact}
          </h5>
          <h5 className="mb-2 text-md font-medium">
            Incharge Email : {email}
          </h5>
        </div>
        <div>
        <button className="m-4 bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded text-xs tracking-wider"  
          onClick={handleClick}
        >
          Book Now
        </button>

        </div>
      </div>  
    </div>
  )
}

export default LabDetails
