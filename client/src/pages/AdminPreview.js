import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer.js';
import AdminPreviewSlots from '../components/AdminPreviewSlots';

const AdminPreview = ({userDetails}) => {
    const {_id} = useParams();
    // console.log(_id)

    const [ data, setData ] = useState([]);
    
    const slotStatus = data.map((item) => {
      return item.slots.slotStatus
    })
    const [isSlotStaus, setIsSlotStatus] = useState("")

    console.log(isSlotStaus)
  
    const getData = async () => {
        try {
            const {data} = await axios.get(`http://localhost:3001/api/equip/slots/${_id}`)
            setData(data)
        } catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
        getData();
    },[])

  return (
    <>
      <div className='relative w-full h-[150px] bg-blue-300'>
        <div className='absolute top-[30%] left-[5%] text-3xl text-white font-bold'>
          <h2>All Booking Requests</h2>
        </div>
      </div>

      <div className="w-full justify-center mx-auto flex flex-col mt-10">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle dark:bg-[#EBF0FA]">
                <div className="overflow-hidden p-4">
                  <table className="min-w-full table-fixed dark:bg-[#EBF0FA] divide-y divide-gray-400 ">
                    <thead className="bg-bg-[#EBF0FA] dark:bg-[#EBF0FA] ">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          FACULTY NAME
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          FACULTY EMAIL
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
                          DATE
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          START TIME
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          END TIME
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
                          MODEL
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                        </th>
                        
                      </tr>
                    </thead>
                      {
                          data.map((item) => {
                              return <AdminPreviewSlots key={item._id} {...item} userDetails={userDetails}/>;
                          })
                      }
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div id="footer" className='mt-10'>
            <Footer/>
          </div>
    </>
  )
}

export default AdminPreview