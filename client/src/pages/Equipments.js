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
import { APIURL } from '../env';

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
  const fromTimeValues = ['08:45','11:00','13:45'];
  const toTimeValues = ['10:45','13:00','15:45'];
  const [totalQuantity,setTotalQuantity] = useState()
  const [isEmail, setIsEmail] = useState({
    to:"",
    subject:"",
    message:"",
    name:""
  });
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isLineLoading, setIsLineLoading] = useState(false);
  const [clickToTime,setClickToTime] = useState(false);


  const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const dateOnly = `${formattedDate}T00:00:00.000+00:00`;
    // const currentTime = moment(currentDate).format('HH:mm');
    const currentTime = currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0');

  //   console.log(currentTime);
  //   console.log(toTime)
  //   const bool = (toTime < currentTime)
  //   console.log(bool)

  //Search Filter
  const [filteredEquip, setFilteredEquip] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchTermChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  
    const filtered = data.filter((equip) =>
    equip.equipName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEquip(filtered);
  };

  useEffect(() => {
    setIsEmail({
      to: labDetail.email,
      subject:"Equipment Booking Request",
      message:"",
      name:labDetail.labIncharge
    });
  }, []);

  const Slots = async () => {
    try {
        const slots = await axios.get(`${APIURL}/api/equip/slots/${_id}`)
        setSlots(slots.data)
    } catch(e){
        console.log(e)
    }
}

  const getEquipData = async () => {
    setIsLineLoading(true);
    try{
      const {data} = await axios.get(`${APIURL}/api/labs/equip/${_id}`)
          setData(data)
    } catch(e){
        console.log(e)
    }
    setIsLineLoading(false);
  }

  const getLabDetails = async () =>{
    setIsLineLoading(true)
    try{
      const labDetail = await axios.get(`${APIURL}/api/labs/${_id}`)
      setLabDetail(labDetail.data)
    }catch(err){
      console.log(err)
    }
  }

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
    e.preventDefault();
    setToTime(e.target.value)
    setClickToTime(true);
    const selectedToTime = e.target.value
    console.log(totalQuantity)
      const bookedSlots = await handleEquipQuantity(selectedToTime,date);
      // if(quantity==0){
      //   toast.error("Unavailable for this slot")
      // }
    try {
      const remaining = totalQuantity - bookedSlots
      const newStatus = remaining > 0 ? "available" : "unavailable";
      console.log(totalQuantity)
      try{
        const updateResponse  = await axios.put(`${APIURL}/api/equip/status/${equipid}`, {
          quantity: totalQuantity - bookedSlots,
          status: newStatus
        })
        getEquipData();
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
      const getEquipSlots  = await axios.get(`${APIURL}/api/equip/slots/equip/${equipid}`)
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
    if(quantity>0){
      const newQuantity = quantity > 0 ? quantity - 1 : 0;
      const newStatus = newQuantity > 0 ? "available" : "unavailable";
  
      if( date && fromTime && toTime){
          if(clickToTime){
            setIsLoading(true);
            try{
              const updateResponse  = await axios.put(`${APIURL}/api/equip/status/${equipid}`, {
                status: newStatus,
                quantity: newQuantity
              })
        
              const timeSlot = await axios.put(`${APIURL}/api/equip/slots/${equipid}`, newTimeSlot)
    
              const EmailDetails = {labDetail,userDetails,date,fromTime,toTime,equipName}
              const sendEmail =  await axios.post(`${APIURL}/api/send-mail/book`,EmailDetails);
              // Show the toast with a longer duration
              toast.success("Booking Request Sent Successfully", {
                autoClose: 5000, // Adjust the duration as needed (e.g., 3000 milliseconds = 3 seconds)
              });
              
              setIsLoading(false)
              // console.log(totalQuantity)
              setTimeout(() => {
                window.location.reload();
              }, 1000); 
              setClickToTime(false);
            }
            catch(err){
              console.error(err);
            }
          }
          else{
            toast.error("Please select Equipment, slot's date and time.")
          }
        }
        else{
                  alert('Please select all fields');
                }  
      }
    else{
      toast.error("Unavailable for this slot")
    }
  }

  const deleteExpiredSlots = async () => {
    try {
      await axios.delete(`${APIURL}/api/equip/deleteExpiredSlots`);
      console.log('Expired slots deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Expired slots not found');
      } else {
        console.log('Error deleting expired slots:', error);
      }
    }
  };

    // useEffect(()=>{
    //   getEquipData();
    // },[handleToTimeChange])

    useEffect(() => {
      getEquipData();
      getLabDetails();
      deleteExpiredSlots();
      // handleStatus();
      Slots();
    },[])

    const handleAdminPreview= ()=>{
      navigate(`/adminPreview/${_id}`)
    }

  return (

    isLoading?(
      <div className='w-full h-screen gap-5 flex items-center justify-center'>
              <div className="custom-loader "></div>
              <div className='font-bold'>Please Wait...</div>
            </div>
    ):(

    <div className='bg-blue-100'>
      <div className="h-[300px] bg-blue-100 ">
      <div className="relative h-[200px] bg-[#78C7DF] md:flex md:justify-center md:items-center shadow-xl">
          <div className="md:absolute md:top-1/4 md:right-2/3 text-2xl md:text-3xl font-bold pt-10 pl-4 md:pt-0 text-white cursor-context-menu ">
            <h2>Book Equipments</h2>
          </div>
        <div className='w-full flex items-center justify-center'>
        {
      isLineLoading?(
        <div className='w-full h-screen gap-5 flex items-center justify-center'>
              <div className="custom-loader-line "></div>
              <div className='font-bold'>Please Wait...</div>
            </div>
      ):(
        <>
          <div className="absolute md:h-full w-full md:w-7/12 bg-[#D5E6EB] top-24 rounded-b-3xl p-2 cursor-context-menu shadow-xl border-gray-200 border">
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
      </>
      )
    }
    </div>
  </div>
</div>

      <div className='flex flex-col md:flex-row w-full justify-between items-center bg-blue-100 mt-4'>
          <form className="w-[300px] flex items-center md:ml-10 ml-0 mb-4 md:mb-0 mt-4 md:mt-0">   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-black dark:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input 
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  type="text" 
                  id="simple-search" 
                  placeholder="Search Lab" 
                  required
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  />
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
            <div className='flex'>
                {
                    userDetails.email == labDetail.email || userDetails.userType == "SuperAdmin" ? (
                      <div className="text-center md:text-left flex items-center justify-end mr-4 "> 
                        <button onClick={handleAdminPreview} className='bg-[#75cce7] p-2 h-fit  rounded-md hover:brightness-90'>
                            Booking Requests
                        </button>
                      </div>              
                    ):(null)
                }
                {
                  userDetails.email == labDetail.email && userDetails.userType == "Admin" ||  userDetails.userType == "SuperAdmin" ? (
                    <div className="text-center md:text-left flex items-center justify-end mr-4" > 
                    <button onClick={handleClick} className='bg-[#75cce7] p-2 h-fit rounded-md hover:brightness-90'>+ Add Equipments</button>
                  </div>
                  ):(null)
                }
            </div>
      </div>
{/* Equipment table */}
{
        <div className="w-11/12 justify-center mx-auto flex flex-col mt-6">
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
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA] flex items-center justify-center"
                        >
                          EQUIPMENT NAME
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA] "
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
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                          >
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                      {
                          searchTerm === '' ? (
                            data.map((item) => {
                              return <EquipDetails key={item._id} {...item} labId = {_id} setEquipid={setEquipid} setQuantity={setQuantity} setStatus={setStatus} toTime={toTime} userDetails={userDetails} labDetail={labDetail.email} setEquipName = {setEquipName} setTotalQuantity={setTotalQuantity} setIsChecked={setIsChecked} clickToTime={clickToTime} isChecked={isChecked}
                              />
                          })
                            ) : (
                              filteredEquip.map((item) => {
                                return <EquipDetails key={item._id} {...item} labId = {_id} setEquipid={setEquipid} setQuantity={setQuantity} setStatus={setStatus} toTime={toTime} userDetails={userDetails} labDetail={labDetail.email} setEquipName = {setEquipName} setTotalQuantity={setTotalQuantity} setIsChecked={setIsChecked} clickToTime={clickToTime} isChecked={isChecked}
                                />
                            })
                          )
                      }
                  </table>
                </div>
              </div>
                  {
                    isLineLoading?(
                            <div className='w-full mt-4 overflow-x-hidden flex items-center justify-center'>
                                  <div className="custom-loader-line "></div>
                                </div>
                          ):(null)
                  }
            </div>
          </div>
}
          <div id="showCalender" className='h-[1px] bg-black mt-10'>

          </div>
{
  isChecked?(<div  className={`w-full flex items-center justify-center bg-blue-100 transition-opacity duration-500 ${isChecked ? 'opacity-100' : 'opacity-0 transform scale-9'}`}>
  <div id="date_time" className="w-8/12 flex flex-col md:flex-row justify-center items-center gap-20 bg-[#78c7df72] mt-10 rounded-xl shadow-md border-white border p-10">
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
        {/* {fromTimeValues.map((time) => (
            <option key={time} value={time}>
            {moment(time, 'HH:mm').format('hh:mm A')}
          </option>
          
        ))} */}
        {fromTimeValues.map((time) => (
          time>currentTime && date===formattedDate?(
            <option key={time} value={time}>
            {moment(time, 'HH:mm').format('hh:mm A')}
          </option>
          ):(
            date!=formattedDate?(
              <option key={time} value={time}>
              {moment(time, 'HH:mm').format('hh:mm A')}
            </option>
            ):(
              null
            )
          )
          
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
            {toTimeValues
              .slice(0,fromTimeValues.indexOf(fromTime)+1)
              .map((toTime, index) => {
                if (toTime > fromTime || !fromTime ) {
                  return (
                    <option key={index} value={toTime}>
                      {moment(toTime, 'HH:mm').format('hh:mm A')}
                    </option>
                  );
              }
              return null;
            })}
        {/* {toTimeValues.map((time) => {
          if (time > fromTime || !fromTime ) {
            return (
              <option key={time} value={time}>
                {moment(time, 'HH:mm').format('hh:mm A')}
              </option>
            );
        }
        return null;
        })} */}
      </select>
      <div className="pointer-events-none absolute inset-y-0 mt-4 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
  </div>
  </div>):(null)
}

         
          <div
            className="text-center md:text-left flex justify-center pt-6 pb-4 items-center bg-blue-100" 
            > 
            <button className='bg-[#75cce7] p-2 rounded-md hover:brightness-90' onClick={handleBookSlot}>
              Confirm Slot
            </button>
          </div>
            <div className=''>
              <Footer/>
            </div>
    </div>
    )
  )
}

export default Equipments