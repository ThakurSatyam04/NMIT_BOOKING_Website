import './App.css';
// import Home from "./pages/Home";
import {Routes, Route} from 'react-router-dom';
import EquipForm from './components/EquipmentForm/EquipForm.jsx';
import Login from "./components/Login.js";
import Home from "./pages/Home.js"
import Signup from "./components/Signup"
import LabForm from "./components/LabForm/LabForm.jsx"
import { useState } from 'react';
import Labs from "./pages/Labs";
import Equipments from './pages/Equipments';
import EditEquipForm from './components/EditEquipForm';
import Navbar from './components/Navbar';
 
function App() {

  const [logIn,setIsloggedIn] = useState(false);
  const [user, setLoginUser] = useState({});
  // console.log(user);
  
  return (
    <>
      <Navbar user={user}/>
      <Routes>
        <Route exact path="/" element={<Home  user={user} logIn={logIn}/>}/>
        {/* <Route exact path="/">
            {
              user && user._id ? <Home/> : <Login setLoginUser={setLoginUser}/>
            }
        </Route> */}
        <Route path="/login" element={<Login setLoginUser={setLoginUser} setIsloggedIn={setIsloggedIn}/>}/>
        <Route path="/signup" element={<Signup setLoginUser={setLoginUser}/>}/>
        <Route path="/equipForm/:_id" element={<EquipForm/>}/>
        <Route path="/editEquipForm/:labId/:_id" element={<EditEquipForm/>}/>
        <Route path='/equipDetail/:_id' element={<Equipments/>}/>
        <Route path='/labForm' element={<LabForm/>}/>
        <Route path='/labs' element={<Labs logIn={logIn}/>}/>
      </Routes>
    </>
  );
}

export default App;
