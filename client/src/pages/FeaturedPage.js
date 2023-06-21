import React, { useEffect, useState } from 'react'
// import useFetch from "../hooks/useFetch"
import Featured from '../components/Featured'
import axios from 'axios';

const FeaturedPage = ({logIn}) => {

    // const {data} = useFetch("/labs?featured=true")
    const [data, setData] = useState([]);

    const getFeatured = async () =>{
      try{
        const {data} = await axios.get("http://localhost:3001/api/labs?featured=true")
        setData(data)
      }catch(err){
        console.log(err)
      }
    }
    console.log(data)

    useEffect(() => {
      getFeatured();
    })

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='grid grid-cols-3 items-center justify-evenly mt-4'>
          {
              data.map((item) => {
                  return <Featured key={item.id} {...item} logIn={logIn}></Featured>
              })
          }
        </div>
      </div>
    </div>
  )
}

export default FeaturedPage
