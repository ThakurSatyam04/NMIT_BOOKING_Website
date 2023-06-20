import React, { useState,useEffect } from "react";
import axios from "axios"

const EquipDetails = ({_id,equipName,makeOfEquip,model,quantity,status,setEquipid,setQuantity,setStatus}) => {

  const [selectedEquip, setSelectedEquip] = useState([])

  const handleChange=(e)=>{
    const id = e.target.value;
    if(e.target.checked){
      console.log(status)
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

  const toggleCheckbox=()=>{
    var checkbox = document.querySelector(".EquipCheckbox");
    checkbox.checked = !checkbox.checked
  }

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
            <tr onClick={toggleCheckbox} className="hover:bg-[#a2cdda] dark:hover:[#75cce7]">
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
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {status}
              </td>

              
              
            </tr>
            
            
          </tbody>
    </>
  );
};

export default EquipDetails;