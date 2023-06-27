import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AdminPreviewSlots from '../components/AdminPreviewSlots';

const AdminPreview = () => {
    const {_id} = useParams();
    // console.log(_id)

    const [ data, setData ] = useState([]);
    console.log(data)
    
    const getData = async () => {
        try {
            const {data} = await axios.get(`http://localhost:3001/api/equip/slots/${_id}
            `)
            setData(data)
        } catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <div>
      <div className="w-11/12 justify-center mx-auto flex flex-col  mt-8">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle dark:bg-[#EBF0FA]">
                <div className="overflow-hidden">
                  <table className="min-w-full table-fixed dark:bg-[#EBF0FA] divide-y divide-gray-400">
                    <thead className="bg-bg-[#EBF0FA] dark:bg-[#EBF0FA]">
                      <tr>
                        <th scope="col" className="p-4">
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          EQUIPMENT NAME
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          MAKE OF EQUIPMENT
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          MODEL/VERSION
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          NOS.
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-black uppercase dark:bg-[#EBF0FA]"
                        >
                          STATUS
                        </th>
                        
                      </tr>
                    </thead>
                      {
                          data.map((item) => {
                              return <AdminPreviewSlots key={item._id} {...item}/>;
                          })
                      }
                  </table>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default AdminPreview