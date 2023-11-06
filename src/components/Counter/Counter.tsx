import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/Counter.slice'

interface CounterProps {
  className?: string
}
const Counter: React.FC<CounterProps> = (props) => {

  const dispatch = useDispatch()
  const count = useSelector((state: any) => state.counter.value)

  const handleIncrementClicked = () => {
    dispatch(increment())
  }

  const handleDecrementClicked = () => {
    dispatch(decrement())
  }

  return (
    <div className={props.className}>
      <h1>Counter: {count}</h1>
      <button onClick={() => handleIncrementClicked()} className='w-full p-2 m-2'>Increment</button>
      <button onClick={() => handleDecrementClicked()} className='w-full p-2 m-2'>Decrement</button>
    </div>
  )
}

export default Counter