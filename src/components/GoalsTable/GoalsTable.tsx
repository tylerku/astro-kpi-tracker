import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import notionAPIService from '../../services/NotionAPIService'
import { notionKPI } from '../../services/NotionAPIService';

const sizeClasses = {
  nameColumn: 'w-4/12',
  goalColumn: 'w-2/12',
  progressColumn: 'w-5/12',
  buttonColumn: 'w-1/12',
  containerXPadding: 'px-12'
}

interface GoalsTableProps {
  kpiMetrics: notionKPI[]
  onKpiUpdated: (kpi: notionKPI) => void
}

const GoalsTable: React.FC<GoalsTableProps> = (props) => {

  const handleRowValueUpdate = (kpi: notionKPI) => {
    props.onKpiUpdated(kpi)
  }

  return (
    <div className="w-full flex-grow mt-5 space-y-4 flex flex-col">
      <TableHeader/>
      <div className='w-full space-y-4 flex-grow overflow-auto'>
        {props.kpiMetrics?.map((kpi: notionKPI, index: number) => {
          return (
            <TableRow kpi={kpi} rowKey={index} key={index} onValueUpdate={(updatedValue: notionKPI) => handleRowValueUpdate(updatedValue)}/>
          )
        })}
      </div>
    </div>
  );
}

interface TableHeaderProps {
}

const TableHeader:React.FC<TableHeaderProps> = (props) => {
  return (
    <div className={`w-full bg-[#212046] rounded-lg`}>
      <div className={`${sizeClasses.containerXPadding} w-[94%] ml-[3%] flex py-4 font-bold text-lg text-[#BCBCBC]`}>
        <div className={`${sizeClasses.nameColumn}`}>
          Name
        </div>
        <div className={`${sizeClasses.goalColumn}`}>
          Goal
        </div>
        <div className={`${sizeClasses.progressColumn}`}>
          Progress
        </div>
        <div className={`${sizeClasses.buttonColumn}`}>
        </div>
      </div>
    </div>
  )
}

interface TableRowProps {
  kpi: notionKPI
  rowKey: number
  onValueUpdate: (kpi: notionKPI) => void
}

const TableRow:React.FC<TableRowProps> = (props) => {

  const updateKPITimeoutId = useRef<NodeJS.Timeout | null>(null)
  const [kpiValue, setKpiValue] = useState<number>(props.kpi.value)

  const updateTodayKPI = async (newValue: number) => {
    const res = await fetch('/api/notion/updateTodayKPI', {
        method: 'POST',
        body: JSON.stringify({ kpiName: props.kpi.key, kpiNumber: newValue }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return res
  }

  const handleButtonClicked = () => {
    try {
      const incrementedValue = kpiValue + 1
      setKpiValue(incrementedValue)
      props.onValueUpdate({ ...props.kpi, value: incrementedValue })

      if (updateKPITimeoutId.current) {
        clearTimeout(updateKPITimeoutId.current)
      }

      const waitTime = 1000
      updateKPITimeoutId.current = setTimeout(() => {
        updateTodayKPI(incrementedValue).then(() => {
          updateKPITimeoutId.current = null
        })
      }, waitTime)
    } catch(error) {
      console.log('Error incrementing cell: ', error)
    }
  }



  return (
    <div className={`ml-[3%] w-[94%] flex justify-center items-center bg-[#212046] rounded-lg py-6 ${sizeClasses.containerXPadding} font-bold text-lg`}>
      <div className={`${sizeClasses.nameColumn}`}>
        {props.kpi.key}
      </div>
      <div className={`${sizeClasses.goalColumn}`}>
        {kpiValue} / {props.kpi.goal}
      </div>
      <div className={`${sizeClasses.progressColumn} pr-12`}>
        <ProgressBar current={kpiValue} goal={props.kpi.goal} animationDelay={props.rowKey * 100}/>
      </div>
      <div className={`${sizeClasses.buttonColumn}`}>
        <button onClick={() => handleButtonClicked()}className='transition-all duration-200 hover:scale-90 w-[90%] max-w-[46px] aspect-square p-2 bg-[#121939] hover:bg-[#6E6E8199] rounded'>
          <div className='aspect-square relative'>
            <Image src='/upArrow.svg' alt='logo' fill/>
          </div>
        </button>
      </div>
    </div>
  )
}

interface ProgressBarProps {
  goal: number
  current: number
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     // const percentage = ((props.current / props.goal) * 100) > 100 ? 100 : ((props.current / props.goal) * 100)
  //     const percentage = Math.round(((props.current / props.goal) + Number.EPSILON) * 100)
  //     const safePercentage = percentage > 100 ? 100 : percentage
  //     setProgressPercentage(safePercentage)
  //   }, props.animationDelay ?? 500)
  // }, [])

  useEffect(() => {
    const percentage = Math.round(((props.current / props.goal) + Number.EPSILON) * 100)
    const safePercentage = percentage > 100 ? 100 : percentage
    setProgressPercentage(safePercentage)  
  }, [props.current, props.goal])

  return (
    <div className='w-full h-3 bg-[#41C66650] rounded-xl relative'>
      <button onClick={() => setShowTip(!showTip)} className={`absolute top-0 left-0 transition-all duration-500 h-full ${percentageWidthClasses[progressPercentage]} hover:animate-pulse bg-[#41C666] rounded-xl`}/>
      { showTip && 
        <div className={'rounded-xl absolute -top-10 left-0 text-sm bg-white p-2 px-4 text-slate-500'}>
          {progressPercentage}% complete
        </div>
      }
    </div>
  )
}

export default GoalsTable