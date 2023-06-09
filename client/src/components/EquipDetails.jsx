import React from "react";

const EquipDetails = ({equipName,makeOfEquip,model,quantity}) => {

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#EBF0FA] dark:divide-[#75cce7]">
            <tr className="hover:bg-[#a2cdda] dark:hover:[#75cce7]">
              <td className="p-4 w-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-search-1" className="sr-only">checkbox</label>
                </div>
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                {equipName}
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
                {quantity}
              </td>
              <td
                className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black"
              >
                available
              </td>
              
            </tr>
            
            
          </tbody>
    </>
  );
};

export default EquipDetails;
