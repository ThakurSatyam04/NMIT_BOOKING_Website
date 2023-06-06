import React from 'react'
import useFetch from "../hooks/useFetch"
import Featured from '../components/Featured'

const FeaturedPage = () => {

    const {data} = useFetch("/labs?featured=true")

  return (
    <div>
      <div className='container'>
        <div>
          {
              data.map((item) => {
                  return <Featured key={item.id} {...item}></Featured>
              })
          }
        </div>
      </div>
    </div>
  )
}

export default FeaturedPage
