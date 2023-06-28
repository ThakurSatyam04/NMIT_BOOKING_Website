import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AdminPreviewSlots from '../components/AdminPreviewSlots';

const AdminPreview = ({userDetails}) => {
    const {_id} = useParams();

    const [ data, setData ] = useState([]);
    console.log(data)
  
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
      <div className='relative w-screen h-[150px] bg-blue-300'>
        <div className='absolute top-[30%] left-[5%] text-3xl text-white font-bold'>
          <h2>All Booking Requests</h2>
        </div>
      </div>
      <div className='w-screen h-fit'>
        {
            data.map((item) => {
                return <AdminPreviewSlots key={item._id} {...item} userDetails={userDetails}/>;
            })
        }
      </div>
    </>
  )
}

export default AdminPreview