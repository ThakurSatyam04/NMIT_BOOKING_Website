import React, {useState,useRef,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, } from 'react-router-dom'
import bg_img from "../assets/Bg_Img.png"
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

const Login = ({setLoginUser,setIsloggedIn}) => {
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
        try{
          await axios.post("http://localhost:3001/api/auth/login",user)
          .then(res =>{
            if(user){
              // console.log(res)
              localStorage.setItem("isLoggedIn",true);
              alert("Login Successful");
              navigate("/");
              setSuccess(true);
              setLoginUser(res.data.user)
              localStorage.setItem("userDetails",JSON.stringify(res.data.user))
              window.location.reload();
              setIsloggedIn(true)
            }
            else{
              console.log("Invalid User")
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

          <div className='mt-4'>
          <label >Password</label> 
          <input 
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
          name="password" 
          value={user.password} 
          onChange={handleChange} 
          type="password" 
          placeholder="Password" 
          required
          />
          </div>

          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
          </div>
          <div className="text-center md:text-left">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
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
