import React, { useEffect, useState,useRef } from 'react'
import {toast} from "react-hot-toast";
import EquipDetails from '../components/EquipDetails'
import axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from '../components/Footer'
import classNames from 'classnames';
import moment from 'moment'

const Equipments = ({userDetails}) => {

  const [data,setData] = useState([]);
  const [equipName, setEquipName] = useState();
  const navigate = useNavigate();    
  const { _id } = useParams();
  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [visibleCalender, setVisibleCalender] = useState(false);
  const [status, setStatus] = useState('');
  const [equipid, setEquipid] = useState("");
  const [slots, setSlots] = useState([]);
  const [quantity, setQuantity] = useState();
  const [labDetail, setLabDetail] = useState([]);
  const timeValues = ['08:00','10:00','12:41','14:00','16:00','18:51'];
  const [totalQuantity,setTotalQuantity] = useState()
  const [isEmail, setIsEmail] = useState({
    to:"",
    subject:"",
    message:"",
    name:""
  });

  useEffect(() => {
    setIsEmail({
      to: labDetail.email,
      subject:"Equipment Booking Request",
      message:"",
      name:labDetail.labIncharge
    });
  }, [labDetail]);

  const Slots = async () => {
    try {
        const slots = await axios.get(`http://localhost:3001/api/equip/slots/${_id}`)
        setSlots(slots.data)
    } catch(e){
        console.log(e)
    }
}

  const getEquipData = async () => {
    try{
      const {data} = await axios.get(`http://localhost:3001/api/labs/equip/${_id}`)
          setData(data)
    } catch(e){
        console.log(e)
    }
  }

  const getLabDetails = async () =>{
    try{
      const labDetail = await axios.get(`http://localhost:3001/api/labs/${_id}`)
      setLabDetail(labDetail.data)
    }catch(err){
      console.log(err)
    }
  }
  // console.log(labDetail)

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/equipForm/${_id}`);
  }
    
  const handleDate = (date)=>{
    const utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      )
    );
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month, and padding with leading zero if needed
    const day = String(utcDate.getDate()).padStart(2, '0'); // Padding with leading zero if needed

    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }

  const handleFromTimeChange = (e) => {
    setFromTime(e.target.value);
  }
  
  const handleToTimeChange = async(e) => {
    setToTime(e.target.value)
    const selectedToTime = e.target.value
    try {
      const bookedSlots = await handleEquipQuantity(selectedToTime,date);
      const remaining = totalQuantity - bookedSlots
      const newStatus = remaining > 0 ? "available" : "unavailable";
      // console.log(bookedSlots)
      try{
        const updateResponse  = await axios.put(`http://localhost:3001/api/equip/status/${equipid}`, {
          quantity: totalQuantity - bookedSlots,
          status: newStatus
      })
      }catch(e){
        console.log(e)
      }
      setQuantity(totalQuantity - bookedSlots)
      // Perform further actions with the bookedSlots value
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleEquipQuantity = async (selectedToTime,date) => {
    try {
      const getEquipSlots  = await axios.get(`http://localhost:3001/api/equip/slots/equip/${equipid}`)
      // console.log(getEquipSlots)
      // Filter the slots based on the toTime value
        const bookedSlots = getEquipSlots.data.filter((slot) => {
        const slotTime = slot.toTime;
        const slotDate = slot.date;
        const formattedDate = slotDate.split('T')[0];
  
        return formattedDate === date && slotTime === selectedToTime;
      });
      return bookedSlots.length;
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleCalender = ()=>{
    setVisibleCalender(!visibleCalender);
  }
  const name = userDetails.name;
  const email = userDetails.email

  const newTimeSlot = { date, fromTime, toTime,name,email }

  const handleBookSlot = async (e) => {
    e.preventDefault();
    // Decrease the quantity and update the status
    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    const newStatus = newQuantity > 0 ? "available" : "unavailable";

    try{
      const updateResponse  = await axios.put(`http://localhost:3001/api/equip/status/${equipid}`, {
        status: newStatus,
        quantity: newQuantity
      })

      const timeSlot = await axios.put(`http://localhost:3001/api/equip/slots/${equipid}`, newTimeSlot)

      const EmailDetails = {...isEmail,userDetails,date,fromTime,toTime,equipName}
      const sendEmail =  await axios.post("http://localhost:3001/api/send-mail/book",EmailDetails);
      // Show the toast with a longer duration
      toast.success("Booking Request Sent Successfully", {
        autoClose: 3000, // Adjust the duration as needed (e.g., 3000 milliseconds = 3 seconds)
      });
      
      // console.log(totalQuantity)
      setTimeout(() => {
        window.location.reload();
      }, 1000); 

      updateTotalQty();
    }
    catch(err){
      console.error(err);
    }
  }
  const updateTotalQty = async()=>{
    const newStatus = quantity > 0 ? "available" : "unavailable";
    try{
      const updateTotalQuantity  = await axios.put(`http://localhost:3001/api/equip/status/${equipid}`, {
            status:newStatus,
            quantity: totalQuantity
          })
    }catch(e){
      console.log(e);
    }
  }

  const handleStatus =()=>{
    if(quantity>0){
      setStatus("available");
    }
    else{
      setStatus("unavailable")
    }
  }

  useEffect(()=>{
    handleStatus();
  },[])
  // console.log(totalQuantity)
  
  useEffect(()=>{
    getEquipData();
  },[handleBookSlot])

  const deleteExpiredSlots = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/equip/deleteExpiredSlots`);
      console.log('Expired slots deleted successfully');
    } catch (error) {
      console.log('Error deleting expired slots:', error);
    }
  };


    useEffect(() => {
      getEquipData();
      getLabDetails();
      deleteExpiredSlots()
      Slots();
    },[])

    const handleAdminPreview= ()=>{
      navigate(`/adminPreview/${_id}`)
    }

  return (
    <div className='bg-blue-100'>
      {/* <Navbar setLoginUser={setLoginUser}/> */}
      <div className="h-[300px] bg-blue-100">
  <div className="relative h-[200px] bg-[#78C7DF] flex justify-center items-center">
    <div className="absolute top-1/4 right-2/3 text-3xl font-bold text-white ">
      <h2>Book Equipments</h2>
    </div>
    <div className="absolute h-full w-7/12 bg-[#D5E6EB] top-24 rounded-b-3xl p-2">
      <h3 className="font-bold mb-2">Lab Details</h3>
      <ul className="space-y-2">
        <li>
          <span className="font-semibold">
            {labDetail.labName} ({labDetail.labNo})
          </span>
        </li>
        <li>
          <span className="font-semibold">Department: </span>
          {labDetail.department}
        </li>
        <li>
          <span className="font-semibold">Faculty In Charge: </span>
          {labDetail.labIncharge}, Professor &amp; Head
        </li>
        <li>
          <a className="text-green-600" href={`tel:${labDetail.contact}`}>
            {labDetail.contact}
          </a>
        </li>
        <li>
          <a className="text-blue-900" href={`mailto:${labDetail.email}`}>
            {labDetail.email}
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

      <div className='flex w-full justify-end bg-blue-100'>
        {
            userDetails.email == labDetail.email ? (
              <div className="text-center md:text-left flex justify-end mr-4 mt-10 mb-4"> 
                <button onClick={handleAdminPreview} className='bg-[#75cce7] p-2 rounded-md hover:brightness-90'>
                    Booking Requests
                </button>
              </div>              
            ):(null)
        }
        {
          userDetails.email == labDetail.email && userDetails.userType == "Admin" ? (
            <div className="text-center md:text-left flex justify-end mr-14 mt-10 mb-4" > 
            <button onClick={handleClick} className='bg-[#75cce7] p-2 rounded-md hover:brightness-90'>+ Add Equipments</button>
          </div>
          ):(null)
        }
      </div>
{/* Equipment table */}
        <div className="w-11/12 justify-center mx-auto flex flex-col ">
            <div className="overflow-x-auto shadow-md sm:rounded-lg border border-black">
              <div className="inline-block min-w-full align-middle dark:bg-[#EBF0FA] ">
                <div className="overflow-hidden ">
                  <table className="min-w-full table-fixed dark:bg-[#EBF0FA] divide-y divide-gray-400 ">
                    <thead className="bg-bg-[#EBF0FA] dark:bg-[#EBF0FA] ">
                      <tr>
                        <th scope="col" className="p-4">
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          EQUIPMENT NAME
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          MAKE OF EQUIPMENT
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          MODEL/VERSION
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          NOS.
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          STATUS
                        </th>
                        
                      </tr>
                    </thead>
                      {
                          data.map((item) => {
                              return <EquipDetails key={item._id} {...item} labId = {_id} setEquipid={setEquipid} setQuantity={setQuantity} setStatus={setStatus} toTime={toTime} userDetails={userDetails} labDetail={labDetail.email} setEquipName = {setEquipName} setTotalQuantity={setTotalQuantity}
                              />
                          })
                      }
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Selecting Time slot */}
<div className='w-full flex items-center justify-center bg-blue-100'>
<div className="w-8/12 flex flex-col md:flex-row justify-center items-center gap-20 bg-[#D5E6EB] bg-slate-100 mt-10 rounded-xl shadow-md border-white border p-10">
  <div className="flex flex-col mt-6">
    <button onClick={handleCalender} className="bg-blue-500 text-white px-4 py-2 rounded">Select Date</button>
    <div className={classNames("flex flex-col transition-opacity duration-500 ease-in-out opacity-100", {"hidden": !visibleCalender, "opacity-100": visibleCalender})}>
      <Calendar 
        onChange={handleDate} 
        value={date}
        minDate={new Date()}
      />
    </div>
  </div>

  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 flex items-center justify-center flex-col">

  <div className="relative w-[200px]">
    <select 
      className="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="start-time"
      value={fromTime}
      onChange={handleFromTimeChange}
      required
    >
      <option value="">-- Select start time --</option>
      {timeValues.map((time) => (
        <option key={time} value={time}>
          {moment(time, 'HH:mm').format('hh:mm A')}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>

  <div className="relative w-[200px]">
    <select 
      className="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-4" 
      id="end-time"
      value={toTime}
      onChange={handleToTimeChange}
      required
    >
      <option value="">-- Select end time --</option>
      {timeValues.map((time) => {
        if (time > fromTime || !fromTime) {
          return (
            <option key={time} value={time}>
              {moment(time, 'HH:mm').format('hh:mm A')}
            </option>
          );
        }
        return null;
      })}
    </select>
    <div className="pointer-events-none absolute inset-y-0 mt-4 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
</div>
</div>
</div>
         
          <div
            className="text-center md:text-left flex justify-center pt-6 pb-4 items-center bg-blue-100" 
            onClick={handleBookSlot}> 
            <button className='bg-[#75cce7] p-2 rounded-md hover:brightness-90'>
              Confirm Slot
            </button>
          </div>
            <div className=''>
              <Footer/>
            </div>
    </div>
  )
}

export default Equipments