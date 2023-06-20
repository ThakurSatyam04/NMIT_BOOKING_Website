import React from 'react'
import lab_img from "../assets/Lab_Img.png"
import { useNavigate} from 'react-router-dom'
import Button from "../components/Button_comp.js";

const LabDetails = ({_id,labName,labNo,labIncharge,contact,email,department,picture,equipments,featured}) => {    

  const navigate = useNavigate();
  
  const handleClick = (e) => {
    navigate(`/equipDetail/${_id}`);
  }

  return (
    <div className="flex  w-full " >

      <div className=" w-[500px] flex flex-col mx-auto my-2 rounded-lg text-slate-950 bg-[#DDEFF9] md:max-w-xl md:flex-row items-center hover:brightness-90 transition duration-200 ease-in-out" onClick={handleClick}>
        <img
          className="h-48 w-full md:m-4 rounded-t-lg object-cover md:h-30 md:w-52 md:rounded-lg"
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
        {/* <div onClick={handleClick}>
          <button className='bg-[#5def69] p-1 rounded-md'>
            Book Slot
          </button>
        </div> */}

        </div>
      </div>  
    </div>
  )
}

export default LabDetails
