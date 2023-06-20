import React, { useEffect, useState } from 'react'
import EquipDetails from '../components/EquipDetails'
import axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from '../components/Footer'
import classNames from 'classnames';

const Equipments = ({setLoginUser}) => { 

  const [data,setData] = useState([]);
  const navigate = useNavigate();    
  const { _id } = useParams();
  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [visibleCalender, setVisibleCalender] = useState(false);
  // const [equips,setEquips] = useState([]);
  
  const getEquipData = async () => {
    try{
      const {data} = await axios.get(`http://localhost:3001/api/labs/equip/${_id}`)
          setData(data)
        }
        catch(e){
          console.log(e)
        }
      }

      // const getLabData = async () => {
      //   try{
      //     const {equips} = await axios.get(`http://localhost:3001/api/labs`)
      //     setEquips(equips)
      //   }catch(e){
      //     console.log(e)
      //   }
      // }
      console.log(data)
      // console.log(equips)
      
      useEffect(() => {
        getEquipData();
        // getLabData();
      },[])

    const handleClick = (e) => {
      e.preventDefault();
      navigate(`/equipForm/${_id}`);
    }
    
    const handleDate = (date)=>{
      setDate(date);
    }

    const handleFromTimeChange = (e) => {
      setFromTime(e.target.value);
    }

    const handleToTimeChange = (e) => {
      setToTime(e.target.value);
    }

    const handleCalender = ()=>{
      setVisibleCalender(!visibleCalender);
    }

    console.log(fromTime)
    console.log(toTime)
    console.log(date)

    const handleSubmit = () => {

    }

  return (
    <div>
      {/* <Navbar setLoginUser={setLoginUser}/> */}
      <div className='h-[300px]'>
        <div className='relative h-[180px] bg-[#78C7DF] flex justify-center items-center'>
          <div className='absolute h-[120px] w-7/12 bg-[#D5E6EB] top-28 rounded-b-3xl'>
            satyam
          </div>
        </div>
      </div>

{/* Selecting Time slot */}
      <div className='w-full flex justify-center items-center gap-20 bg-blue-200 p-4'>
        <div className='flex flex-col mt-6 '>
          <button onClick={handleCalender} className='bg-blue-500 text-white px-4 py-2 rounded'>Select Date</button>
          <div className={classNames("flex flex-col transition-opacity duration-500 ease-in-out opacity-0",{"hidden": !visibleCalender,
          "opacity-100": visibleCalender,})}>
          <Calendar onChange={handleDate} value={date} />
          </div>
        </div>

        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label id='slot' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Select Slots
            </label>
            <div className='flex gap-10'>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="slot"
                value={fromTime}
                onChange={handleFromTimeChange}
                name='slot'
                required
                >
                <option value="">
                  From
                </option>
                <option value="8:45am">
                  8:45am
                </option>
                <option value="12:00pm">
                  12:00pm
                </option>
                <option value="2:45pm">
                  2:45pm
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="slot"
                value={toTime}
                onChange={handleToTimeChange}
                name='slot'
                required
                >
                <option value="">
                  To
                </option>
                <option value="11:00am">
                  11:00am
                </option>
                <option value="2:45pm">
                  2:45pm
                </option>
                <option value="4:00pm">
                  4:00pm
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            </div>
          </div>
      </div>

        <div className="text-center md:text-left flex justify-end mr-14 mt-10 mb-4" > 
          <button onClick={handleClick} className='bg-[#75cce7] p-2 rounded-md hover:brightness-90'>+ Add Equipments</button>
        </div>

{/* Equipment table */}
        <div className="w-11/12 justify-center mx-auto flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle dark:bg-[#EBF0FA]">
                <div className="overflow-hidden">
                  <table className="min-w-full table-fixed dark:bg-[#EBF0FA] divide-y divide-gray-400 ">
                    <thead className="bg-bg-[#EBF0FA] dark:bg-[#EBF0FA]">
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
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          HANDLE
                        </th>
                        
                      </tr>
                    </thead>
                      {
                          data.map((item) => {
                              return <EquipDetails key={item._id} {...item} labId = {_id}/>
                          })
                      }

                  </table>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="text-center md:text-left flex justify-center mr-14 mt-10 mb-4" 
            onClick={handleSubmit}
          > 
            <button className='bg-[#75cce7] p-2 rounded-md hover:brightness-90'>Confirm Slot</button>
          </div>
            <div className='mt-6'>
              <Footer/>
            </div>
    </div>
  )
}

export default Equipments