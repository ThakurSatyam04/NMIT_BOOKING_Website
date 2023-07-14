import React, { useState,useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {toast} from 'react-hot-toast'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import classNames from "classnames";

const EquipDetails = ({_id,equipName,makeOfEquip,model,labId,quantity,status,setEquipid,setQuantity,setStatus,userDetails,labDetail,setEquipName,setTotalQuantity,totalQuantity,setIsChecked}) => {
// console.log(_id)
  const [selectedEquip, setSelectedEquip] = useState("")
  const navigate = useNavigate();
  
  const handleChange=(e)=>{
    const id = e.target.value;
    if(e.target.checked){
      setEquipid(_id) 
      setSelectedEquip((prev)=> [...prev,id]);
      setEquipName(equipName)
      setIsChecked(true);
      setStatus(status)
      setQuantity(quantity)
      setTotalQuantity(totalQuantity)  
    }else{
      setIsChecked(false);
      setSelectedEquip((prev)=> {
        return prev.filter((item)=>item !== id)
      });
    }
  }

  const handleDelete = async() =>{
    try{
      const confirmed = window.confirm("Are you sure you want to delete the lab?");
      if(confirmed){
        const deleteEquip = await axios.delete(`http://localhost:3001/api/equip/${labId}/${_id}`)
        window.location.reload();
        toast.success("Equipment deleted successfully");
        // console.log(deleteEquip)
      }
      else{
        toast.success("Equipment deletion canceled");
      }
    }catch(e){
      console.log(e)
    }
  }

  const handleStatus =()=>{
    if(quantity>0){
      setStatus("available");
    }
    else{
      setStatus("unavailable")
    }
  }

  const handleEdit = async()=>{
    try{
      console.log(quantity)
      alert("press Ok to edit");
      navigate(`/editEquipForm/${labId}/${_id}`)
    }catch(e){
    }
  }

  useEffect(()=>{
    handleStatus();
  },[])

  return (
    <>
      <tbody className="divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
            <tr className="hover:bg-[#a2cdda] dark:hover:[#75cce7]">
              <td  className="p-4 w-4 border-r-2 border-gray-300">
                <div  className="flex items-center">
                  {/* <a href="#showCalender"> */}
                  <input
                    id="EquipCheckbox"
                    type="checkbox"
                    value={_id}
                    name="checkboxGroup"
                    className="EquipCheckbox w-4 h-4 text-blue-600 bg-gray-100 rounded  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                  />
                   <label htmlFor="EquipCheckbox" className="sr-only">checkbox</label>
                  {/* </a> */}
                </div>
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-pre-wrap dark:text-black break-words border-r-2 border-gray-300"
                >
                {equipName}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-pre-wrap dark:text-black break-words border-r-2 border-gray-300"
              >
                {makeOfEquip}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-pre-wrap dark:text-black break-words border-r-2 border-gray-300"
              >
                {model}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-pre-wrap dark:text-black break-words border-r-2 border-gray-300"
              >
                {quantity}
              </td>
              <td
              className={classNames("py-4 px-6 text-sm font-medium text-black whitespace-nowrap border-r-2 border-gray-300",{
                "text-green-600": status === 'available',
                "text-red-600": status!== 'available'
              })}
              >
                {status}
              </td>
              {
                userDetails.email == labDetail && userDetails.userType == "Admin" ||  userDetails.userType == "SuperAdmin"?(
                  <>
                    <td>
                      <div  className="gap-6 flex ml-6 pr-4">
                        <div>
                          <button onClick={handleDelete}>
                            <MdDeleteForever />
                          </button>
                        </div>
                        <div>
                          <button onClick={handleEdit}>
                            <FaEdit />                  
                          </button>
                        </div>
                      </div>
                    </td>
                  </>
                ):(null)
              }
            </tr>
          </tbody>
    </>
  );
};

export default EquipDetails;