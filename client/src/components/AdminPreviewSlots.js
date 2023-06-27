import React from 'react'

const AdminPreviewSlots = ({date,fromTime,toTime}) => {
  return (
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
            <tr className="hover:bg-[#a2cdda] dark:hover:[#75cce7]">
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {date}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {fromTime}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {toTime}
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
          </tbody>
  )
}

export default AdminPreviewSlots
