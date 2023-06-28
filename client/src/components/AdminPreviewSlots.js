import React from 'react'

const AdminPreviewSlots = ({date,fromTime,toTime,userDetails,equipName}) => {
  // console.log(userDetails)
  return (
    <div className='w-full'>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
            <tr className="hover:bg-[#a2cdda] dark:hover:[#75cce7]">
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
              {userDetails.name}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
                >
                {userDetails.email}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {equipName}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                "panjali"
              </td>
               <td>
                  <div  className="gap-6 flex ml-6">
                    <div>
                      <button>
                        Confirm
                      </button>
                    </div>
                    <div>
                      <button >
                        Reject                  
                      </button>
                    </div>
                  </div>
                </td>
            </tr>
            <div>
              
              
            </div>
          </tbody>
    </div>
  )
}

export default AdminPreviewSlots
