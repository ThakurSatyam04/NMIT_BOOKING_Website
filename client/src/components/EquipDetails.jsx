import React, { useState,useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const EquipDetails = ({_id,equipName,makeOfEquip,model,quantity,labId}) => {

  const[selectedEquip, setSelectedEquip] = useState([])
  // console.log(_id)
  const handleChange=(e)=>{
    // console.log(_id)
    const value = e.target.value;
    console.log(value)
    if(e.target.checked){
      setSelectedEquip((prev)=>[...prev,value]);
    }else{
      setSelectedEquip((prev)=> prev.filter((item)=>item !== value));
    }
    console.log(selectedEquip)
    // setSelectedEquip(updatedList)
    // console.log(value)
  }

  const handleDelete = async() =>{
    try{
      alert("press Ok to delete");
      const deleteEquip = await axios.delete(`http://localhost:3001/api/equip/${labId}/${_id}`)
      console.log(deleteEquip)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
            <tr className="hover:bg-[#a2cdda] dark:hover:[#75cce7]">
              <td className="p-4 w-4">
                <div className="flex items-center">
                  
                  <input
                    id="checkbox-search-1"
                    type="checkbox"
                    value={_id}
                    name="_id"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                available
              </td>
              <td>
                <div  className="gap-6 flex ml-6">
                  <div>
                    <button onClick={handleDelete}>
                      <MdDeleteForever />
                    </button>
                  </div>
                  <div>
                    <button>
                      <FaEdit />                  
                    </button>
                  </div>
                </div>
              </td>
              
            </tr>
            
            
          </tbody>
    </>
  );
};

export default EquipDetails;
