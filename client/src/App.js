import './App.css';
// import Home from "./pages/Home";
import {Routes, Route} from 'react-router-dom';
import EquipForm from './components/EquipmentForm/EquipForm.jsx';
import Login from "./components/Login.js";
import Home from "./pages/Home.js"
import Signup from "./components/Signup"
import EquipDetails from './pages/EquipDetails';
import LabForm from "./components/LabForm/LabForm.jsx"
import { useState } from 'react';
import LabDetails from './pages/LabDetails';

function App() {

  const [user, setLoginUser] = useState({});
  
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setLoginUser={setLoginUser}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/equipForm" element={<EquipForm/>}/>
        <Route path='/equipDetail' element={<EquipDetails/>}/>
        <Route path='/labDetail' element={<LabDetails/>}/>
        <Route path='/labForm' element={<LabForm/>}/>

      </Routes>
    </>
  );
}

export default App;
