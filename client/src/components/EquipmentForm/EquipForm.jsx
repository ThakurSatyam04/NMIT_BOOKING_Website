import React, { useEffect, useState } from 'react'
import "./EquipForm.css"
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from "../Button_comp";
import { APIURL } from '../../env';

const EquipForm = () => {

  // const { labId } = useParams();
  const { _id } = useParams();
  console.log(_id)


  // console.log(_id)

    const navigate = useNavigate();

    
    const [equip, setEquip] = useState({
      equipName:"",
      makeOfEquip:"",
      model:"",
      totalQuantity:"",
    })
    
    // const [newquantity, setQuantity] = useState();
    // setQuantity(equip.totalQuantity)
    // console.log(equip.totalQuantity)

  const handleChange =(e)=>{
    const{name,value} = e.target;
    setEquip({
      ...equip,
      [name]:value
    })
  }

  // useEffect(() => {
  //   setQuantity(equip.totalQuantity);
  // }, [equip.totalQuantity]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const { equipName, makeOfEquip, model, totalQuantity } = equip;
      // setQuantity(equip.totalQuantity)
      if(equipName || makeOfEquip || model || totalQuantity){
        const X = { ...equip, quantity: totalQuantity };
        await axios.post(`${APIURL}/api/equip/${_id}`,X)
        .then(res =>{
          // console.log(res)
          toast.success("Equipment added successfully", {
            autoClose: 5000, // Adjust the duration as needed (e.g., 3000 milliseconds = 3 seconds)
          });
          navigate(`/equipDetail/${_id}`);
        })
      }
      else{
        alert("please fill all the fields");
      }
    }catch(err){
      console.log(err);
    }
  }
    
  return (
    <div>
      <div className="formbold-main-wrapper">
          <div className="formbold-form-wrapper">

            <form onSubmit={handleSubmit}>
              <div className="formbold-form-title">
                <h2 className="flex justify-center">Add Equipment Details</h2>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">
                    Equipment Name
                  </label>
                  <input
                    type="text"
                    name="equipName"
                    id="equipName"
                    className="formbold-form-input"
                    onChange={handleChange}
                    value={equip.equipName}

                    // placeholder='including software and hardware'
                  />
                </div>
                
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label"> 
                    Make of Equipment 
                  </label>
                  <input
                    type="text"
                    name="makeOfEquip"
                    id="makeOfEquip"
                    className="formbold-form-input"
                    onChange={handleChange}
                    value={equip.makeOfEquip}

                    // placeholder='Equipment Details'
                  />
                </div>
              </div>

              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                  Model/Version
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={equip.model}
                //   placeholder='Model/Version of equipment'
                />
              </div>

              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                  Total Quantity
                </label>
                <input
                  type="number"
                  name="totalQuantity"
                  id="totalQuantity"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={equip.totalQuantity}
                />
              </div>              
              
              <Button btn="+ Add Equipment" type="submit"/>

    </form>
  </div>
</div>

    </div>
  )
}

export default EquipForm