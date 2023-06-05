import React from 'react'
import lab_img from "../assets/Lab_Img.png"

const LabDetails = ({labName,labNo,labIncharge,contact,email,department,picture,equipments,featured}) => {    
  return (
    <div className="flex justify-center w-full">

      <div className="w-11/12 flex flex-col mx-auto my-4 rounded-lg text-slate-950 bg-[#DDEFF9] md:max-w-xl md:flex-row justify-center items-center">
        <img
          className="h-48 w-full rounded-t-lg object-cover md:h-30 md:w-52 md:rounded-lg"
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
      </div>  
    </div>
  )
}

export default LabDetails
