import React from 'react'
import useFetch from "../hooks/useFetch"
import Featured from '../components/Featured'

const FeaturedPage = ({logIn}) => {

    const {data} = useFetch("/labs?featured=true")

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
