import React, { useState,useRef,useEffect} from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import bg_img from "../assets/Bg_Img.png"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX =  /^[A-z][A-z0-9-_](?=.*[0-9])(?=.*[@.]).{8,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();

  // const [user, setUser] = useState('');
  // const [email, setEmail] = useState('');
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  
  const [userType, setUserType] = useState("");
  const [secretKey,setSecretKey] = useState("");
  // console.log(userType)

useEffect(() => {
  userRef.current.focus();
}, [])
  
useEffect(() => {
  setValidName(USER_REGEX.test(user.name));
}, [user.name])

useEffect(() => {
  setValidEmail(EMAIL_REGEX.test(user.email));
}, [user.email])

useEffect(() => {
  setValidPwd(PWD_REGEX.test(user.password));
  setValidMatch(user.password === user.confirmPassword);
}, [user.password, user.confirmPassword])

useEffect(() => {
  setErrMsg('');
}, [user.name, user.password, user.confirmPassword,user.email])

const navigate = useNavigate();

const handleChange =(e)=>{
  const{name,value} = e.target;
  setUser({
    ...user,
    [name]:value,
  })
}

const handleSignUp = async(e)=>{
  console.log(userType)
  if(userType=="Admin" && secretKey!="NMIT123"){
    e.preventDefault();
    alert("Invalid Admin")
  }else{
  e.preventDefault();
  const v1 = USER_REGEX.test(user.name);
  const v2 = PWD_REGEX.test(user.password);
  const v3 = PWD_REGEX.test(user.email);
  if (!v1 || !v2  || !v3) {
    setErrMsg("Invalid Entry");
    return;
  }
    try{
      const {name,email,password,confirmPassword} = user;
      console.log(userType);
      if(name && email && password === confirmPassword){
      const X = {...user,userType} 
      await axios.post("http://localhost:3001/api/auth/signup",X)
        .then(res =>{
          // console.log(res)
          alert("Sign Up Successful, Please Login");
          navigate("/login");
          setSuccess(true);
          setUser.name('');
          setUser.password('');
          setUser.confirmPassword('');
        })
      }
      else{
        alert("please fill all the fields");
      }
    }catch(err){
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
    } else {
        setErrMsg('Registration Failed')
    }
    errRef.current.focus();
}
  }
}

  return (
    <>
      <section className="h-screen flex flex-col md:flex-row justify-evenly space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-blue-50">
      <div className="md:w-101/3 max-w-xl rounded-lg">
        <img className='rounded-lg shadow-md'
          src={bg_img}
          alt="Sample image" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Sign Up</p>
        </div>

        <div>
          Register as: 
          <input 
          type="radio" 
          name="UserType"
          value="User"
          onChange={(e)=> setUserType(e.target.value)}
          />User
          <input
          type="radio" 
            name="UserType"
            value="Admin"
            onChange={(e)=> setUserType(e.target.value)}
            />Admin
          </div>

          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

          <form onSubmit={handleSignUp}>
            <div className='mt-2'>
              <label htmlFor="Name">
                Name
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user.name ? "hide" : "invalid"} />
              </label>
              <input 
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
                type="text" 
                name="name" 
                id="username"
                ref={userRef}
                onChange={handleChange}
                value={user.name}
                placeholder="Enter Name"
                autoComplete="off" 
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p id="uidnote" className={userFocus && user.name && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
              </p>
              </div>

              <div className='mt-2'>
              <label>Email</label>
                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !user.email ? "hide" : "invalid"} />
              <input 
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
              name="email" 
              onChange={handleChange}
              value={user.email}
              type="text" 
              placeholder="Email Address" 
              autoComplete="off" 
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              />
               <p id="uidnote" className={userFocus && user.email && !validEmail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be in Email format<br />
              </p>
            </div>

            
            <div className='mt-2'>
              <label>
                Password
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !user.password ? "hide" : "invalid"} />
              </label>
              <input 
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
              name="password" 
              id="password"
              onChange={handleChange}
              value={user.password}
              type="password" 
              placeholder="Password"
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              />
              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              6 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
            </div>
            <div className='mt-2'>
              <label>
                Confirm Password
                <FontAwesomeIcon icon={faCheck} className={validMatch && user.confirmPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !user.confirmPassword ? "hide" : "invalid"} />
              </label>
              <input 
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" name="confirmPassword" 
              id="confirm_pwd"
              onChange={handleChange}
              value={user.confirmPassword}
              type="password" 
              placeholder="Confirm Password"
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              />
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
              </p>
            </div>

            <div className='mt-2'>
            {userType=="Admin" ? <div>
              <label>Secret Key</label>
              <input 
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
              name="UserType" 
              type="text" 
              onChange={(e)=> setSecretKey(e.target.value)} 
              placeholder="Secret Key" />          
            </div> : null}
            </div>

            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
            </div>
            <div className="text-center md:text-left">
              <button 
              disabled={!validName || !validPwd || !validMatch ? true : false}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" 
              type="submit">Sign Up</button>
            </div>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
              Already have account? <Link to="/login" className="text-red-600 hover:underline hover:underline-offset-4">Sign In</Link>
            </div>
          </form>
      </div>
    </section>
    </>
  )
}

export default Signup
