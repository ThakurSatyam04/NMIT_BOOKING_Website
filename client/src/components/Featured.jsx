import React from 'react'
import lab_img from "../assets/Lab_Img.png"
import { useNavigate } from 'react-router-dom'

const Featured = ({_id,labName, labNo, department, labIncharge,loggedIn}) => {
  const navigate = useNavigate();
  // console.log(_id)

  const handleClick=(e)=>{
    e.preventDefault();
    if(loggedIn){
      navigate(`/equipDetail/${_id}`);
    }
    else{
      alert("Please Login First")
      navigate("/login")
    }
  }

  return (
    <>
    <div className=" m-4 hover:brightness-75 hover:cursor-pointer transition duration-200 ease-in-out" onClick={handleClick}>
  <div className="bg-[#DDEFF9] rounded-2xl overflow-hidden shadow-lg">
    <div className="flex justify-center items-center">
      <img className="h-[200px] w-full rounded-none" src={lab_img} alt="Lab" />
    </div>
    <div className="flex flex-col justify-center items-start p-4">
      <h5 className="text-sm font-medium">
        Lab Name: {labName}
      </h5>
      <h5 className="text-sm font-medium">
        Department: {department}
      </h5>
      <h5 className="text-sm font-medium">
        Lab No.: {labNo}
      </h5>
      <h5 className="text-sm font-medium">
        Lab Incharge: {labIncharge}
      </h5>
    </div>
  </div>
</div>

    </>
  )
}

export default Featured
