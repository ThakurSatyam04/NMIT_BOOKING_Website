import React, {useState,useRef,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import bg_img from "../assets/Bg_Img.png"
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import {toast} from "react-hot-toast";
import { APIURL } from '../env';

const PasswordReset = ({userDetails}) => {

    const [ email, setEmail ] = useState("");
    const [ msg, setMsg ] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [users,setUsers] = useState([]);
    
    const userEmail = users.map((item)=>{
      return item.email
    })
    
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setEmail(e.target.value)
    }

    const getUsers = async()=>{
      try{
        const users = await axios.get(`${APIURL}/api/auth/users`);
        setUsers(users.data);
      }
      catch(error){
        console.log("User not found")
      }
    }

    const sendLink = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(userEmail.includes(email)){
          try {
            await axios.post(`${APIURL}/api/auth/sendpasswordlink`, {email})
            .then( res => {
              if(res.status == 201){
                  setEmail("")
                  setMsg(true)
                  toast.success("Link sent to your email")
                  navigate("/login")
              }
              else{
                  toast.error("You are not registered")
              }
            })
          } catch (error) {
            console.log(error)
          }
        }
        else{
          toast.error("Please register first")
        }
        setIsLoading(false);
    }

    useEffect(()=>{
      getUsers();
    },[])

  return (
    <div>
      {
        isLoading?(
          <div className='w-full h-screen  flex items-center justify-center'>
          <div className="custom-loader "></div>
        </div>
        ):(
          <section className="h-screen flex flex-col md:flex-row justify-evenly space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0 bg-blue-50">
          <div className="md:w-101/3 max-w-xl rounded-lg">
            <img className=' rounded-lg shadow-md mt-10'
              src={bg_img}
              alt="Sample image"/>
          </div>
          <div className="md:w-1/3 max-w-sm">
            <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Enter Email</p>
            </div>
            <form>
              <label>Email</label>
              <input 
                  className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
                  name="email" 
                //   ref={userRef}
                  autoComplete="off"
                  required
                  value={email} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Email Address" 
              />
    
                <button 
                    className=" bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider mt-4" 
                    onClick={sendLink}>
                        Request Link
                </button>
              
            </form>
          </div>
        </section>
        )
      }
    </div>
  )
}

export default PasswordReset