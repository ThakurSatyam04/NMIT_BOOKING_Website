import React from 'react'

const Featured = ({labName, labNo, department, labIncharge}) => {

  return (
    <>
    <div className='grid grid-cols-3'>
        <div class="bg-[#DDEFF9] max-w-sm rounded-2xl overflow-hidden shadow-lg">
          <img class="w-full h-60" src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg" alt="Sunset in the mountains" />
            <div className="flex flex-col justify-center items-start p-6 ">
                <h5 className="mb-2 text-md font-medium">
                  Lab Name : {labName}
                </h5>
                <h5 className="mb-2 text-md font-medium">
                  Department : {department}
                </h5>
                <h5 className="mb-2 text-md font-medium">
                  Lab No. : {labNo}
                </h5>
                <h5 className="mb-2 text-md font-medium">
                  Lab Incharge : {labIncharge}
                </h5>
            </div>            
        </div>
    </div>
    </>
  )
}

export default Featured
