import React, { useState,useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import classNames from "classnames";

const EquipDetails = ({_id,equipName,makeOfEquip,model,labId,quantity,status,setEquipid,setQuantity,setStatus,userDetails,labDetail}) => {
// console.log(_id)
  const [selectedEquip, setSelectedEquip] = useState([])
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
  // console.log(quantity)
  
  const handleChange=(e)=>{
    const id = e.target.value;
    if(e.target.checked){
      // console.log(status)
      setEquipid(_id) 
      setQuantity(quantity)
      setStatus(status)
      setSelectedEquip((prev)=> [...prev,id]);
    }else{
      setSelectedEquip((prev)=> {
        return prev.filter((item)=>item !== id)
      });
    }
  }

  const handleDelete = async() =>{
    try{
      alert("press Ok to delete");
      const deleteEquip = await axios.delete(`http://localhost:3001/api/equip/${labId}/${_id}`)
      window.location.reload();
      // console.log(deleteEquip)
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
    // handleQuantity();
    handleStatus();
    // getEquipQuantity();
    // getLabData();
  },[])

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
            <tr className="hover:bg-[#a2cdda] dark:hover:[#75cce7]">
              <td  className="p-4 w-4">
                <div  className="flex items-center">
                  <input
                    id="EquipCheckbox"
                    type="checkbox"
                    value={_id}
                    name="_id"
                    className="EquipCheckbox w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                  />
                  <label htmlFor="checkbox-search-1" className="sr-only">checkbox</label>
                </div>
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
                {quantity}
              </td>
              <td
              className={classNames("py-4 px-6 text-sm font-medium text-black whitespace-nowrap ",{
                "text-green-600": status === 'available',
                "text-red-600": status!== 'available'
              })}
              >
                {status}
              </td>
              {
                userDetails.email == labDetail && userDetails.userType == "Admin"?(
                  <>
                    <td>
                      <div  className="gap-6 flex ml-6">
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