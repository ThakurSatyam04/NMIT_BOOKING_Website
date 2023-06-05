// import React, { useEffect, useState } from 'react'
// import axios from "axios"

// const LabDetails = () => {

//     const [data,setData] = useState([]);

//     const getData = async () => {
//         const {data} = await axios.get("http://localhost:3001/api/labs")
//         setData(data)
//         console.log(data)
//     }

//     useEffect(() => {
//         getData();
//     },[])
    
//   return (
//     <div className="">
//       <div className="flex flex-col m-auto rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
//         <img
//           className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-52 md:rounded-none md:rounded-l-lg"
//           src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
//           alt="" />
//         <div className="flex flex-col justify-start p-6">
//           <h5 className="mb-2 text-md font-medium text-neutral-800 dark:text-neutral-50">
//             Lab Name : {data.map(item => (<span>{item.labName}</span>))}
//           </h5>
//           <h5 className="mb-2 text-md font-medium text-neutral-800 dark:text-neutral-50">
//             Department : 
//           </h5>
//           <h5 className="mb-2 text-md font-medium text-neutral-800 dark:text-neutral-50">
//             Lab No. : {data.labNo}
//           </h5>
//           <h5 className="mb-2 text-md font-medium text-neutral-800 dark:text-neutral-50">
//             Lab Incharge
//           </h5>
//           <h5 className="mb-2 text-md font-medium text-neutral-800 dark:text-neutral-50">
//             Contact no.
//           </h5>
//           <h5 className="mb-2 text-md font-medium text-neutral-800 dark:text-neutral-50">
//             Incharge Email : 
//           </h5>
//         </div>
//       </div>  
//     </div>
//   )
// }

// export default LabDetails


import React from 'react'

const LabDetails = () => {
  return (
    <div>
      Lab Details
    </div>
  )
}

export default LabDetails
