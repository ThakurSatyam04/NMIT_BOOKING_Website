import React, { useEffect, useState } from 'react'
// import useFetch from "../hooks/useFetch"
import Featured from '../components/Featured'
import axios from 'axios';
import { APIURL } from '../env';

const FeaturedPage = ({loggedIn}) => {

    const [data, setData] = useState([]);

    const getFeatured = async () =>{
      try{
        const {data} = await axios.get(`${APIURL}/api/labs?featured=true`)
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
        <div className="w-11/12 grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-center mt-4">
            {data.map((item) => {
            return <Featured key={item._id} {...item} loggedIn={loggedIn} />;
          })}
        </div>
  )
}

export default FeaturedPage