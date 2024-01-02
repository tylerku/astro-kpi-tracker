import react, { useState, useEffect } from 'react'

interface DropwdownMenuProps {
  onOptionSelected: (selectedOption: string) => void
  onDropdownOpened?: () => void
  onDropdownClosed?: () => void
  options: string[]
  buttonBgClass?: string
}

const DropdownMenu: React.FC<DropwdownMenuProps> = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | undefined>(props.options[0])

  useEffect(() => {
    if (!selectedOption && props.options.length) {
      setSelectedOption(props.options[0])
    }
  }, [props.options])

  const handleOptionClicked = (selectedOption: string) => {
    props.onOptionSelected(selectedOption)
    setSelectedOption(selectedOption)
    setShowDropdown(false)
  }

  const handleButtonClicked = () => {
    return setShowDropdown(!showDropdown)
  }

  return (
    <div className='flex flex-row justify-between items-center relative'>
      <button onClick={() => setShowDropdown(false)}className={`${showDropdown ? '' : 'hidden'} bg-transparet h-screen w-screen fixed z-30 top-0 left-0`}/>
      <button onClick={handleButtonClicked} className={`h-10 px-6 text-lightGray whitespace-nowrap transition-all duration-200 hover:scale-95 hover:bg-basic-gray p-2 ${showDropdown ? 'bg-basic-gray scale-95' : props.buttonBgClass ?? 'bg-red-500'} rounded-md font-bold text-xs`}>
        {selectedOption?.toUpperCase()}
      </button>
      {/* <button onClick={handleDropwdownClicked} className={`whitespace-nowrap transition-all duration-200 hover:scale-95 hover:bg-[#474764] p-2 ${showOptionsDropdown ? 'bg-[#474764] scale-95' : 'bg-[#04122D80]'} rounded font-bold px-4`}>
        Weekly
      </button> */}
      <DropdownBox 
        className={`transition transform-gpu duration-200 origin-top-right ${showDropdown ? 'scale-100 opacity-100' : 'opacity-0 scale-80'} z-40 absolute right-0 top-[100%] p-2`}
        options={props.options}
        disabled={!showDropdown}
        onOptionClicked={handleOptionClicked}
        selectedOptionIndex={props.options.findIndex((option) => option === selectedOption)}
      />
    </div>
  )
}

interface DropdownBoxProps {
  className?: string
  options: string[]
  selectedOptionIndex: number
  onOptionClicked: (option: string) => void
  disabled: boolean
}

const DropdownBox: React.FC<DropdownBoxProps> = (props) => {
  return (
    <div className={`mt-2 flex flex-col text-lightGray rounded-md bg-basic-gray drop-shadow-lg space-y-2 w-fit text-base space-y-2 text-xs${props.className}`}>
      {props.options?.map((option, index) => {
        return (
          <button disabled={props.disabled} onClick={() => props.onOptionClicked(option)} className={`${props.selectedOptionIndex === index ? 'bg-darkGray' : 'bg-transparent'} transition transform-gpu duration-200 whitespace-nowrap ${props.selectedOptionIndex === index ? '' : 'hover:bg-[#1F1F1F80]'} hover:scale-95 p-2 px-4 rounded-md font-bold`}>
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default DropdownMenu