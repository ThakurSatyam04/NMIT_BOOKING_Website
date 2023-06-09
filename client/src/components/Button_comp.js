import React from 'react'

const Button_comp = (props) => {
  return (
    <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 border border-blue-700 rounded">
            {props.btn}
        </button>
    </div>
  )
}

export default Button_comp
