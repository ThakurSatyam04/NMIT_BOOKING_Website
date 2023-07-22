import React, {useState,useRef,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate,NavLink } from 'react-router-dom'
import bg_img from "../assets/Bg_Img.png"
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import {toast} from "react-hot-toast";
import { APIURL } from '../env';

const Login = ({setLoginUser,setIsloggedIn}) => {
    const[showPassword , setShowPassword] = useState(false);
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email:"",
        password:""
      })

      useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user.email, user.password])
      
      const handleChange =(e)=>{
        const{name,value} = e.target;
        setUser({
          ...user,
          [name]:value
        })
      }

      const handleLogin = async(e)=>{
        e.preventDefault();
        setIsClicked(true)
        try{
          await axios.post(`${APIURL}/api/auth/login`,user)
          .then(res =>{
            if(user){
              // console.log(res)
              localStorage.setItem("isLoggedIn",true);
              navigate("/");
              setSuccess(true);
              setLoginUser(res.data.user)
              localStorage.setItem("userDetails",JSON.stringify(res.data.user))
              toast.success("logged In", {
                autoClose: 5000, // Adjust the duration as needed (e.g., 3000 milliseconds = 3 seconds)
              });
              setTimeout(() => {
                window.location.reload();
              },1000); 
              setIsloggedIn(true)
              setIsClicked(false)
            }
            else{
              console.log("Invalid User")
              setIsClicked(false)
            }
          } )
        }catch(err){ 
          if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
        alert("You are not registered plese Signup first")
        }
        setIsClicked(false);
      } 
      // console.log(user)

  return (
    <div>
            <section className="h-screen flex flex-col md:flex-row justify-evenly space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0 bg-blue-50">
              <div className="md:w-101/3 max-w-xl rounded-lg">
                <img className=' rounded-lg shadow-md mt-10'
                  src={bg_img}
                  alt="Sample image"/>
              </div>
              <div className="md:w-1/3 max-w-sm">
                <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold text-slate-500">LogIn</p>
                </div>
                
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleLogin}>
                  <label>Email</label>
                  <input 
                  className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
                  name="email" 
                  ref={userRef}
                  autoComplete="off"
                  required
                  value={user.email} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Email Address" />

                  <div className='mt-4 relative'>
                  <label >Password</label> 
                  <input 
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
                    name="password" 
                    value={user.password} 
                    onChange={handleChange} 
                    type={showPassword?("text"):("password")} 
                    placeholder="Password" 
                    required
                  />

                    <span className="absolute right-3 top-[30px] cursor-pointer" onClick={()=> setShowPassword((prev)=>!prev)}>
                        {showPassword ? (<AiFillEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiFillEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>

                  </div>

                  <div className="w-full mt-4 flex justify-end font-semibold text-sm text-blue-900 hover:text-red-900">
                      <NavLink to="/password-reset">
                        Forgot Password?
                      </NavLink>
                  </div>
                  <div className="text-center md:text-left">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                      type="submit"
                      disabled={isClicked}
                    >
                      {isClicked ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                  <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don't have an account? <Link to="/signup" className="text-red-600 hover:underline hover:underline-offset-4" href="#">Sign Up</Link>
                  </div>
                </form>
              </div>
            </section>
    </div>
  )
}

export default Login
