import react, { useState, useEffect } from 'react'

interface BasicButtonProps {
  onClick?: () => void
  buttonBgClass?: string
  text: string
}

const BasicButton: React.FC<BasicButtonProps> = (props) => {

  useEffect(() => {
  }, [])

  const handleOnClick = () => {
    props.onClick && props.onClick()
  }

  return (
    <div className='flex flex-row justify-between items-center relative'>
      <button onClick={handleOnClick} className={`h-10 px-6 text-lightGray whitespace-nowrap transition-all duration-200 hover:scale-95 hover:bg-basic-gray p-2 ${props.buttonBgClass ?? 'bg-gray-800'} rounded-md font-bold text-xs`}>
        {props.text.toUpperCase()}
      </button>
    </div>
  )
}

export default BasicButton