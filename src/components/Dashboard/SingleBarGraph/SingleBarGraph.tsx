import React, { useEffect } from 'react'
import DashboardComponent from '../DashboardComponent'

interface SingleBarGraphProps {
  options: SingleBarGraphOption[]
}

export type SingleBarGraphOption = {
  title: string
  maxY: number
  yInterval: number
  showZero: boolean
  value: number
}

const SingleBarGraph: React.FC<SingleBarGraphProps> = (props) => {
  const [selectedOptionTitle, setSelectedOptionTitle] = React.useState<string>(props.options?.[0]?.title ?? '')
  const [showOptionsDropdown, setShowOptionsDropdown] = React.useState<boolean>(false)
  
  useEffect(() => {
    if (selectedOptionTitle === '') {
      setSelectedOptionTitle(props.options?.[0]?.title ?? '')
    }
  }, [props.options])

  const getSelectedOption = () => {
    return props.options?.find((option: SingleBarGraphOption) => option.title === selectedOptionTitle)
  }

  const getYAxisNumbers = () => {
    const selectedOption = getSelectedOption();
    const yAxisNumbers: JSX.Element[] = []
    if (!selectedOption?.yInterval) return []
    for(let i = selectedOption?.yInterval || 0; i <= (selectedOption?.maxY || 0); i += (selectedOption?.yInterval || 1)) {
      yAxisNumbers.push(<div className='text-slate-500 font-semibold'>{i}</div>)
    }
    yAxisNumbers.reverse()
    return yAxisNumbers
  }

  const handleTitleClicked = () => {
    setShowOptionsDropdown(!showOptionsDropdown)
  }

  const handleDropdownOptionClicked = (option: SingleBarGraphOption) => {
    setSelectedOptionTitle(option.title)
    setShowOptionsDropdown(false)
  }

  const percentageHeightClasses: {[key: number]: string} = {
    0: 'h-0',
    1: 'h-[1%]',
    2: 'h-[2%]',
    3: 'h-[3%]',
    4: 'h-[4%]',
    5: 'h-[5%]',
    6: 'h-[6%]',
    7: 'h-[7%]',
    8: 'h-[8%]',
    9: 'h-[9%]',
    10: 'h-[10%]',
    11: 'h-[11%]',
    12: 'h-[12%]',
    13: 'h-[13%]',
    14: 'h-[14%]',
    15: 'h-[15%]',
    16: 'h-[16%]',
    17: 'h-[17%]',
    18: 'h-[18%]',
    19: 'h-[19%]',
    20: 'h-[20%]',
    21: 'h-[21%]',
    22: 'h-[22%]',
    23: 'h-[23%]',
    24: 'h-[24%]',
    25: 'h-[25%]',
    26: 'h-[26%]',
    27: 'h-[27%]',
    28: 'h-[28%]',
    29: 'h-[29%]',
    30: 'h-[30%]',
    31: 'h-[31%]',
    32: 'h-[32%]',
    33: 'h-[33%]',
    34: 'h-[34%]',
    35: 'h-[35%]',
    36: 'h-[36%]',
    37: 'h-[37%]',
    38: 'h-[38%]',
    39: 'h-[39%]',
    40: 'h-[40%]',
    41: 'h-[41%]',
    42: 'h-[42%]',
    43: 'h-[43%]',
    44: 'h-[44%]',
    45: 'h-[45%]',
    46: 'h-[46%]',
    47: 'h-[47%]',
    48: 'h-[48%]',
    49: 'h-[49%]',
    50: 'h-[50%]',
    51: 'h-[51%]',
    52: 'h-[52%]',
    53: 'h-[53%]',
    54: 'h-[54%]',
    55: 'h-[55%]',
    56: 'h-[56%]',
    57: 'h-[57%]',
    58: 'h-[58%]',
    59: 'h-[59%]',
    60: 'h-[60%]',
    61: 'h-[61%]',
    62: 'h-[62%]',
    63: 'h-[63%]',
    64: 'h-[64%]',
    65: 'h-[65%]',
    66: 'h-[66%]',
    67: 'h-[67%]',
    68: 'h-[68%]',
    69: 'h-[69%]',
    70: 'h-[70%]',
    71: 'h-[71%]',
    72: 'h-[72%]',
    73: 'h-[73%]',
    74: 'h-[74%]',
    75: 'h-[75%]',
    76: 'h-[76%]',
    77: 'h-[77%]',
    78: 'h-[78%]',
    79: 'h-[79%]',
    80: 'h-[80%]',
    81: 'h-[81%]',
    82: 'h-[82%]',
    83: 'h-[83%]',
    84: 'h-[84%]',
    85: 'h-[85%]',
    86: 'h-[86%]',
    87: 'h-[87%]',
    88: 'h-[88%]',
    89: 'h-[89%]',
    90: 'h-[90%]',
    91: 'h-[91%]',
    92: 'h-[92%]',
    93: 'h-[93%]',
    94: 'h-[94%]',
    95: 'h-[95%]',
    96: 'h-[96%]',
    97: 'h-[97%]',
    98: 'h-[98%]',
    99: 'h-[99%]',
    100: 'h-[100%]',
  }

  const getCurrentOptionHeightPercentage = () => {
    const option = getSelectedOption()
    const percentage = Math.round((((option?.value ?? 0) / (option?.maxY ?? 1)) + Number.EPSILON) * 100)
    const safePercentage = percentage > 100 ? 100 : percentage
    return safePercentage
  }

  const getBarBackgroundColor = () => {
    const backgroundColors = {
      green: 'bg-[#41C666]',
      red: 'bg-[#C64141]',
      orange: 'bg-[#C67141]',
      yellow: 'bg-[#C6C041]',
    }
    const option = getSelectedOption()
    const barValue = option?.value ?? 0
    const max = option?.maxY ?? 1
    console.log('bar completion percentage: ', max)
    if (barValue >= max) return backgroundColors['green']
    if (barValue >= max * .50) return backgroundColors['yellow']
    if (barValue >= max * 0.06) return backgroundColors['orange']
    return backgroundColors['red']
  }

  return (
    <DashboardComponent className='flex flex-col justify-end py-8 px-10 transition-all'>
      <button onClick={() => setShowOptionsDropdown(false)}className={`${showOptionsDropdown ? '' : 'hidden'} bg-transparet h-screen w-screen absolute z-10 top-0 left-0`}/>
      <div className='flex-grow flex flex-row w-full space-x-8 items-end'>
        <div className='flex-grow h-full flex flex-col justify-between text-sm'>
          { getYAxisNumbers() } 
          { getSelectedOption()?.showZero && <div className='text-slate-500 font-semibold'>0</div> }
        </div>
        <div className={`transition-all duration-500 w-full max-w-[70px] ${percentageHeightClasses[getCurrentOptionHeightPercentage() ? getCurrentOptionHeightPercentage() : 6]} ${getBarBackgroundColor()} rounded`} />
        {/* Add an element just for spacing here */}
        <div className='flex-grow h-full' />
      </div>
      <div className='flex flex-row pt-4 relative transition-all justify-center items-center'>
        <button onClick={handleTitleClicked} className={`w-full whitespace-nowrap transition-all duration-200 hover:scale-95 hover:bg-[#474764] p-2 ${showOptionsDropdown ? 'bg-[#474764] scale-95' : 'bg-[#04122D80]'} rounded font-bold px-4`}>
          {getSelectedOption()?.title}
        </button>
        <DropdownBox 
          className={`transition transform-gpu duration-200 origin-top-left ${showOptionsDropdown ? 'scale-100 opacity-100' : 'opacity-0 scale-80'} z-20 absolute left-0 top-[100%] p-2`}
          options={props.options}
          disabled={!showOptionsDropdown}
          onOptionClicked={handleDropdownOptionClicked}
          selectedOptionIndex={props.options.findIndex((option: SingleBarGraphOption) => option.title === selectedOptionTitle)}
          />
      </div>
    </DashboardComponent>
  )
}

interface DropdownBoxProps {
  className?: string
  options: SingleBarGraphOption[]
  selectedOptionIndex: number
  onOptionClicked: (option: SingleBarGraphOption) => void
  disabled: boolean
}

const DropdownBox: React.FC<DropdownBoxProps> = (props) => {
  return (
    <div className={`mt-2 flex flex-col rounded bg-[#474764] drop-shadow-lg space-y-2 w-fit text-base space-y-2 ${props.className}`}>
      {props.options?.map((option, index) => {
        return (
          <button disabled={props.disabled} onClick={() => props.onOptionClicked(option)} className={`${props.selectedOptionIndex === index ? 'bg-[#04122D]' : 'bg-transparent'} transition transform-gpu duration-200 whitespace-nowrap ${props.selectedOptionIndex === index ? '' : 'hover:bg-[#04122D80]'} hover:scale-95 p-2 px-4 rounded font-bold`}>
            {option.title}
          </button>
        )
      })}
    </div>
  )
}

export default SingleBarGraph