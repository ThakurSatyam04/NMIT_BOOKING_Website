import React, { useEffect, useState } from 'react'
// import useFetch from "../hooks/useFetch"
import Featured from '../components/Featured'
import axios from 'axios';
import { APIURL } from '../env';

const FeaturedPage = ({loggedIn}) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getFeatured = async () =>{
      setIsLoading(true)
      try{
        const {data} = await axios.get(`${APIURL}/api/labs?featured=true`)
        setData(data)
        // console.log(data)
        setIsLoading(false)
      }catch(err){
        console.log(err)
      }
      setIsLoading(false)
    }

    useEffect(() => {
      getFeatured();
    },[])


  return (
    <>
    {
       isLoading?(
        <div className='w-full h-screen gap-5 flex items-center justify-center'>
                <div className="custom-loader "></div>
                <div className='font-bold'>Please Wait...</div>
              </div>
        ):(
            <div className="w-11/12 grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-center mt-4">
            {data.map((item) => {
              return <Featured key={item._id} {...item} loggedIn={loggedIn} />;
            })}
        </div>
        )
      }
    </>
  )
}

export default FeaturedPage