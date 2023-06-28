import './App.css';
// import Home from "./pages/Home";
import React, { useState,useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import EquipForm from './components/EquipmentForm/EquipForm.jsx';
import Login from "./components/Login.js";
import Home from "./pages/Home.js";
import Signup from "./components/Signup";
import LabForm from "./components/LabForm/LabForm.jsx";
import Labs from "./pages/Labs";
import Equipments from './pages/Equipments';
import EditEquipForm from './components/EditEquipForm';
import Navbar from './components/Navbar';
import AdminPreview from './pages/AdminPreview';
 
function App() {
  const loggedIn = localStorage.getItem("isLoggedIn");
  // console.log(loggedIn,"login");
  const [isloggedIn,setIsloggedIn] = useState(false);
  const [user, setLoginUser] = useState({});
  const [userDetails, setUserDetails] = useState({});
  
  useEffect(()=>{
    const storedUser = localStorage.getItem("userDetails");
    if(loggedIn){
      setUserDetails(JSON.parse(storedUser));
    }
    else{
      setUserDetails({});
    }
  },[])
  // console.log(userDetails.name)
  // console.log(userDetails.email)
  
  return (
    <>
      {loggedIn? <Navbar isloggedIn={isloggedIn} userDetails={userDetails} setUserDetails={setUserDetails} setIsloggedIn={setIsloggedIn} loggedIn={loggedIn}/>:null
      }
      
      <Routes>
        <Route exact path="/" element={loggedIn?<Home isloggedIn={isloggedIn} loggedIn={loggedIn}/>:<Login setLoginUser={setLoginUser} setIsloggedIn={setIsloggedIn}/>}/>
        {/* <Route exact path="/">
            {
              user && user._id ? <Home/> : <Login setLoginUser={setLoginUser}/>
            }
        </Route> */}
        <Route path="/login" element={<Login setLoginUser={setLoginUser} setIsloggedIn={setIsloggedIn}/>}/>
        <Route path="/signup" element={<Signup setLoginUser={setLoginUser}/>}/>
        <Route path="/equipForm/:_id" element={<EquipForm/>}/>
        <Route path="/editEquipForm/:labId/:_id" element={<EditEquipForm/>}/>
        <Route path='/equipDetail/:_id' element={<Equipments userDetails={userDetails}/>}/>
        <Route path='/labForm' element={<LabForm/>}/>
        <Route path='/labs' element={<Labs/>}/>
        <Route path='/adminPreview/:_id' element={<AdminPreview userDetails={userDetails}/>} />
      </Routes>
    </>
  );
}

export default App;
