import React, { useEffect, useState } from 'react'
// import useFetch from "../hooks/useFetch"
import Featured from '../components/Featured'
import axios from 'axios';

const FeaturedPage = ({loggedIn}) => {

    const [data, setData] = useState([]);

    const getFeatured = async () =>{
      try{
        const {data} = await axios.get("http://localhost:3001/api/labs?featured=true")
        setData(data)
        // console.log(data)
      }catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
      getFeatured();
    },[])


  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='font-style grid grid-cols-3 items-center justify-evenly mt-4'>
          {
              data.map((item) => {
                  return <Featured key={item._id} {...item} loggedIn={loggedIn}/>
              })
          }
        </div>
      </div>
    </div>
  )
}

export default FeaturedPage