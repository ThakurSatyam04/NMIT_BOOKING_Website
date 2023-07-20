import React, { useEffect } from 'react'
import "./EquipmentForm/EquipForm.css"
import {toast} from "react-hot-toast";
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button_comp'
import { APIURL } from '../env';

const EditLabForm = () => {

    const { labId } = useParams()
  const navigate = useNavigate();

  const [lab, setLab] = useState({
    labName: "",
    department:"",
    labNo:"",
    labIncharge:"",
    contact:"",
    email:""  
  })

  const handleChange = async(e)=>{
    const {name,value} = e.target;
    setLab({
    ...lab,
    [name]:value
  })
  }

  const FormData = async()=>{
    try{
    const data = await axios.get(`${APIURL}/api/labs/${labId}`)
      setLab(
      {
        labName: data.data.labName,
        department:data.data.department,
        labNo:data.data.labNo,
        labIncharge:data.data.labIncharge,
        contact:data.data.contact,
        email:data.data.email
      }
      )
    }catch(err){
      console.log(err)
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const {labName,department,labNo,labIncharge,contact,email} = lab;
      if(labName && labNo && labIncharge && contact && email && department){
        await axios.put(`${APIURL}/api/labs/${labId}`,lab)
         .then(res =>{
           console.log(res)
           toast.success("Lab edited Successfully!", {
            autoClose: 5000, // Adjust the duration as needed (e.g., 3000 milliseconds = 3 seconds)
          });
           navigate("/labs");
         })
      }else{
        alert("please fill all the fields");
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    FormData()
  },[])

  return (
    <div>
      <div className="formbold-main-wrapper">
          <div className="formbold-form-wrapper">
            <form onSubmit={handleSubmit} >
              <div className="formbold-form-title">
                <h2 className="flex justify-center">Edit Lab Details</h2>              
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">
                    Lab Name
                  </label>
                  <input
                    type="text"
                    name="labName"
                    id="labName"
                    className="formbold-form-input"
                    onChange={handleChange}
                    value={lab.labName}                    
                    // placeholder='including software and hardware'
                  />
                </div>
                
              </div>

              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={lab.department}
                //   placeholder='No. of equipments'
                />
              </div>
              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                  Lab Number
                </label>
                <input
                  type="text"
                  name="labNo"
                  id="labNo"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={lab.labNo}
                //   placeholder='Model/Version of equipment'
                />
              </div>

              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                  Lab Incharge
                </label>
                <input
                  type="text"
                  name="labIncharge"
                  id="labIncharge"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={lab.labIncharge}
                //   placeholder='No. of equipments'
                />
              </div>

              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                  Contact No.
                </label>
                <input
                  type="tel"
                  name="contact"
                  id="contact"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={lab.contact}
                //   placeholder='No. of equipments'
                />
              </div>
              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                  Incharge email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={lab.email}
                //   placeholder='No. of equipments'
                />
              </div>
              <div>
                <Button btn="+ Edit Lab" type='submit'/>
              </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default EditLabForm
