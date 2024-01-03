import react, {useEffect, useState} from 'react'
import Image from 'next/image'
import { DailyKPI } from '@/models'
import { DropdownMenu, SettingsButton } from '@/components'

export type GoalProgressItem = {
  title: string
  value: number
  goal: number
}

export type GoalsCardOption = {
  daysUntilGoalEnds: number
  buttonTitle: string
  dateRange: {
    begin: Date
    end: Date
  },
  goalProgressItems: GoalProgressItem[]
}

interface GoalsCardProps {
  className?: string
  options: GoalsCardOption[]
}

const GoalsBoard: React.FC<GoalsCardProps> = (props) => {

  const [selectedOption, setSelectedOption] = useState<GoalsCardOption | undefined>(props.options?.length ? props.options[0] : undefined)

  return (
    <div className={`p-3 pr-4 pl-7 w-full h-full rounded-lg bg-gradient-to-b from-spaceGray to-transparent flex flex-col space-y-3 ${props.className ?? ''}`}>
      <div className='flex flex-row space-x-3'>
        <div className='font-bold text-[lightGray] text-3xl mr-auto'>GOALS</div>
        <DropdownMenu 
          onOptionSelected={() => null} 
          buttonBgClass="bg-darkGray"
          options={selectedOption?.buttonTitle ? [selectedOption.buttonTitle] : []}          
        />
        <SettingsButton className='bg-darkGray'/>
      </div>
      <div className='grid grid-cols-2 gap-6 overflow-auto no-scollbar'>
        {selectedOption?.goalProgressItems.map((progressItem) => (
          <ProgressItemCard {...progressItem} />
        ))}
      </div>
    </div>
  )
}

const ProgressItemCard: React.FC<GoalProgressItem> = (props) => (
  <div className='w-full bg-transparent space-y-2'>
    <div className='flex flex-row justify-between items-center font-bold'>
      <div className='text-subtle-gray font-bold text-xs'>
        {props.title.toUpperCase()}
      </div>
      <div className={`text-white text-xs`}>
        {props.value} / {props.goal * 5}
      </div>
    </div>
    <ProgressBar goal={props.goal*5} value={props.value}/>
  </div>
)


interface ProgressBarProps {
  goal: number
  value: number
  animationDelay?: number
}

const ProgressBar:React.FC<ProgressBarProps> = (props) => {

  const [progressPercentage, setProgressPercentage] = useState<number>(0)
  const [showTip, setShowTip] = useState<boolean>(false)

  const percentageWidthClasses: {[key: number]: string} = {
    0: 'w-0',
    1: 'w-[1%]',
    2: 'w-[2%]',
    3: 'w-[3%]',
    4: 'w-[4%]',
    5: 'w-[5%]',
    6: 'w-[6%]',
    7: 'w-[7%]',
    8: 'w-[8%]',
    9: 'w-[9%]',
    10: 'w-[10%]',
    11: 'w-[11%]',
    12: 'w-[12%]',
    13: 'w-[13%]',
    14: 'w-[14%]',
    15: 'w-[15%]',
    16: 'w-[16%]',
    17: 'w-[17%]',
    18: 'w-[18%]',
    19: 'w-[19%]',
    20: 'w-[20%]',
    21: 'w-[21%]',
    22: 'w-[22%]',
    23: 'w-[23%]',
    24: 'w-[24%]',
    25: 'w-[25%]',
    26: 'w-[26%]',
    27: 'w-[27%]',
    28: 'w-[28%]',
    29: 'w-[29%]',
    30: 'w-[30%]',
    31: 'w-[31%]',
    32: 'w-[32%]',
    33: 'w-[33%]',
    34: 'w-[34%]',
    35: 'w-[35%]',
    36: 'w-[36%]',
    37: 'w-[37%]',
    38: 'w-[38%]',
    39: 'w-[39%]',
    40: 'w-[40%]',
    41: 'w-[41%]',
    42: 'w-[42%]',
    43: 'w-[43%]',
    44: 'w-[44%]',
    45: 'w-[45%]',
    46: 'w-[46%]',
    47: 'w-[47%]',
    48: 'w-[48%]',
    49: 'w-[49%]',
    50: 'w-[50%]',
    51: 'w-[51%]',
    52: 'w-[52%]',
    53: 'w-[53%]',
    54: 'w-[54%]',
    55: 'w-[55%]',
    56: 'w-[56%]',
    57: 'w-[57%]',
    58: 'w-[58%]',
    59: 'w-[59%]',
    60: 'w-[60%]',
    61: 'w-[61%]',
    62: 'w-[62%]',
    63: 'w-[63%]',
    64: 'w-[64%]',
    65: 'w-[65%]',
    66: 'w-[66%]',
    67: 'w-[67%]',
    68: 'w-[68%]',
    69: 'w-[69%]',
    70: 'w-[70%]',
    71: 'w-[71%]',
    72: 'w-[72%]',
    73: 'w-[73%]',
    74: 'w-[74%]',
    75: 'w-[75%]',
    76: 'w-[76%]',
    77: 'w-[77%]',
    78: 'w-[78%]',
    79: 'w-[79%]',
    80: 'w-[80%]',
    81: 'w-[81%]',
    82: 'w-[82%]',
    83: 'w-[83%]',
    84: 'w-[84%]',
    85: 'w-[85%]',
    86: 'w-[86%]',
    87: 'w-[87%]',
    88: 'w-[88%]',
    89: 'w-[89%]',
    90: 'w-[90%]',
    91: 'w-[91%]',
    92: 'w-[92%]',
    93: 'w-[93%]',
    94: 'w-[94%]',
    95: 'w-[95%]',
    96: 'w-[96%]',
    97: 'w-[97%]',
    98: 'w-[98%]',
    99: 'w-[99%]',
    100: 'w-[100%]',
  }

  useEffect(() => {
    const percentage = Math.round(((props.value / props.goal) + Number.EPSILON) * 100)
    const safePercentage = percentage > 100 ? 100 : percentage
    setProgressPercentage(safePercentage)  
  }, [props.value, props.goal])

  return (
    <div className='w-full h-2.5 bg-[#41C66650] rounded-xl relative'>
      <button onClick={() => setShowTip(!showTip)} className={`absolute top-0 left-0 transition-all duration-500 h-full ${percentageWidthClasses[progressPercentage]} hover:animate-pulse bg-[#41C666] rounded-xl`}/>
      { showTip && 
        <div className={'rounded-xl absolute -top-10 left-0 text-sm bg-white p-2 px-4 text-slate-500'}>
          {progressPercentage}% complete
        </div>
      }
    </div>
  )
}

export default GoalsBoard