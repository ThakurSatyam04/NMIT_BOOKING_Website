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
 
function App() {

  const [user, setLoginUser] = useState({});
  console.log(user);
  
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home setLoginUser={setLoginUser}/>}/>
        {/* <Route exact path="/">
            {
              user && user._id ? <Home/> : <Login setLoginUser={setLoginUser}/>
            }
        </Route> */}
        <Route path="/login" element={<Login setLoginUser={setLoginUser}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/equipForm/:_id" element={<EquipForm/>}/>
        <Route path='/equipDetail/:_id' element={<Equipments/>}/>
        <Route path='/labForm' element={<LabForm/>}/>
        <Route path='/labs' element={<Labs setLoginUser={setLoginUser}/>}/>
      </Routes>
    </>
  );
}

export default App;
