import React from 'react'

const AdminPreviewSlots = ({slots,equipName,model,makeOfEquip}) => {
  const newdate = slots.date
  const date = new Date(newdate);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  
  return (
    <div className='w-full'>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
            <tr className="hover:bg-[#a2cdda] dark:hover:[#75cce7]">
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
              {slots.name}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
                >
                {slots.email}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {equipName}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {formattedDate}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {slots.fromTime}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {slots.toTime}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {makeOfEquip}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {model}
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
