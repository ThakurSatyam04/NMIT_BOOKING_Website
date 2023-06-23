import React, { useEffect, useState } from 'react'
import "./EquipmentForm/EquipForm.css"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from "../components/Button_comp";

const EditEquipForm = () => {

  const { labId } = useParams()
  const { _id } = useParams();

  const navigate = useNavigate();

  const [equip, setEquip] = useState({
    equipName:"",
    makeOfEquip:"",
    model:"",
    quantity:"",
    status:""
  })

  const handleChange =(e)=>{
    const{name,value} = e.target;
    setEquip({
      ...equip,
      [name]:value
    })
  }

  const FormData = async()=>{
    try{
    const data = await axios.get(`http://localhost:3001/api/equip/${_id}`)
      setEquip(
      {
        equipName: data.data.equipName,
        makeOfEquip:data.data.makeOfEquip,
        model:data.data.model,
        quantity:data.data.quantity,
        status:data.data.status,
      }
      )
    }catch(err){
      console.log(err)
    }
  }

  // const [status, setStatus] = useState();

  // const handleStatus =()=>{
  //   // console.log(quantity)
  //   if(quantity>0){
  //     setStatus("available");
  //   }
  //   else{
  //     setStatus("unavailable")
  //   }
  // }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const { equipName, makeOfEquip, model, quantity, status } = equip;
      if(equipName && makeOfEquip && model && quantity!=0 && status){
       await axios.put(`http://localhost:3001/api/equip/${_id}`,equip)
       await axios.put(`http://localhost:3001/api/equip/status/${_id}`, {status:"available"})

        .then(res =>{
          // console.log(res)
          alert("Equipment added successfully");
          navigate(`/equipDetail/${labId}`);
        })
      }
      else{
        alert("please fill all the fields");
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    FormData();
  },[])
 
  useEffect(() => {
    // handleStatus();
  },[handleSubmit])
    
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
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={equip.quantity}
                />
              </div>              
              
              <Button btn="+ Add Equipment" type="submit"/>

    </form>
  </div>
</div>

    </div>
  )
}

export default EditEquipForm