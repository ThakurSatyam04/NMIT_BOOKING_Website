import React, { useEffect, useState } from 'react'
import EquipDetails from '../components/EquipDetails'
import axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from '../components/Footer'

const Equipments = ({setLoginUser}) => {

    const [date, setDate] = useState(new Date());
    const [data,setData] = useState([]);
    const navigate = useNavigate();    
    const { _id } = useParams();
    const [time,setTime] = useState(null);
    const [checked,setChecked] = useState(false);

    const getData = async () => {
        try{
          const {data} = await axios.get(`http://localhost:3001/api/labs/equip/${_id}`)
          setData(data)
        }
        catch(e){
          console.log(e)
        }
    }

    useEffect(() => {
        getData();
    },[])

    const handleClick = (e) => {
      e.preventDefault();
      navigate(`/equipForm/${_id}`);
    }
    
    const onChange=(date)=>{
      setDate(date);
    }
    
    const handleTime= (e)=>{
      e.preventDefault();
      if(!checked){
        setDate(date);
        setTime(e.target.value);
        setChecked(true);
        e.target.style.backgroundColor = 'red';
      }
      else{
        setTime(null);
        setChecked(false);
        e.target.style.backgroundColor = '';
      }
    }

    console.log(date)
    console.log(time)
    console.log(checked)

  return (
    <div>
      <Navbar setLoginUser={setLoginUser}/>
      <div className='h-[300px]'>
        <div className='relative h-[180px] bg-[#78C7DF] flex justify-center items-center'>
          <div className='absolute h-[120px] w-7/12 bg-[#D5E6EB] top-28 rounded-b-3xl'>
            Satyam
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center gap-10 '>
        <div>
        <Calendar onChange={onChange} value={date} />
        </div>

        <div className='flex flex-col'>
          <button onClick={handleTime} name="slot1" value="slot1"  className='bg-[#7fd9f5] p-1 rounded-md mb-2 '>8:45am to 11:00am</button>
          <button onClick={handleTime} name="slot2" value="slot2"  className='bg-[#7fd9f5] p-1 rounded-md mb-2 '>12:00pm to 2:45pm</button>
          <button onClick={handleTime} name="slot3" value="slot3"  className='bg-[#7fd9f5] p-1 rounded-md mb-2 '>12:00pm to 2:45pm</button>
        </div>
      </div>

        <div className="text-center md:text-left flex justify-end mr-14 mt-10 mb-4" onClick={handleClick}> 
          <button className='bg-[#75cce7] p-2 rounded-md hover:brightness-90'>+ Add Equipments</button>
        </div>

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
                        
                      </tr>
                    </thead>
                      {
                          data.map((item) => {
                              return <EquipDetails key={item._id} {...item}/>
                          })
                      }

                  </table>
                </div>
              </div>
            </div>
          </div>
            <div className='mt-6'>
              <Footer/>
            </div>
    </div>
  )
}

export default Equipments
