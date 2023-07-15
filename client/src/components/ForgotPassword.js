import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom'
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import { APIURL } from '../env';

const ForgotPassword = () => {

  const { id, token } = useParams();
  const navigate = useNavigate();
  const [ password, setPassword ] = useState("");
  const [ msg, setMsg ] = useState("")
  const[showPassword , setShowPassword] = useState(false);

  const [showPopUp,setShowPopUp] = useState(false);

  const userValid = async () => {
    try {
      const data = await axios.get(`${APIURL}/api/auth/forgotpassword/${id}/${token}`)
      .then( res => {
        if(res.status == 201){
          
        }
        else{
          navigate('*')
        }
      }) 
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setPassword(e.target.value);
  }

  const sendPassword = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${APIURL}/api/auth/${id}/${token}`, {password})
      .then( res => {
        if(res.status == 201){
          setPassword("")
          setMsg(true)
          toast.success("Password updated");
          navigate("/login");
        }
        else{
          toast.error("! Token expired, generate new link");
        }
      }) 
    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(() => {
    userValid();
  },[])

  return (
    <div>
      <section className="h-screen flex flex-col justify-evenly  md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0 bg-blue-50">

      <form>
          <p className="mx-4 text-center font-semibold text-slate-500 mb-6">Enter Your new Password</p>
          <div className='relative'>
            <label>New Password</label>
            <input 
                className=" text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
                name="password" 
              //   ref={userRef}
              autoComplete="off"
                required
                value={password} 
                onChange={handleChange} 
                type={showPassword?("text"):("password")} 
                placeholder="Password" 
            />

              <span className="absolute right-3 top-[30px] cursor-pointer" onClick={()=> setShowPassword((prev)=>!prev)}>
                  {showPassword ? (<AiFillEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiFillEye fontSize={24} fill='#AFB2BF'/>)}
              </span>
          </div>

            <button 
                className=" bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider mt-4" 
                onClick={sendPassword}
            >
                    Send
            </button>
          
        </form>
            </section>
    </div>
  )
}

export default ForgotPassword