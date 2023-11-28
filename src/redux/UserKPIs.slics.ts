import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DailyKPI } from '@/models'

type DateKey = `${number}-${number}-${number}` // YYYY-MM-DD  example: 2021-01-01 
type DailyKPIPayloadAction = PayloadAction<{
  date: DateKey
  kpi: DailyKPI
}>

export interface DailyKPIsState {
  kpis: Record<DateKey, DailyKPI[]>
}

const initialState: DailyKPIsState = {
  kpis: {}
}

export const dailyKPIsSlice = createSlice({
  name: 'DailyKPIs',
  initialState,
  reducers: {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    incrementKPI: (state, action: PayloadAction<{date: DateKey, kpi: DailyKPI}>) => {
      const kpisAtDate = state.kpis[action.payload.date]
      const kpi = kpisAtDate.find(kpi => kpi.definitionId === action.payload.kpi.definitionId)
      if (!kpi) {
        kpisAtDate.push({...action.payload.kpi, current: 1})
      } else {
        kpi?.current ? kpi.current += 1 : kpi.current = 1
      }
    },
    decrementKPI: (state, action: PayloadAction<{date: DateKey, kpi: DailyKPI}>) => {
      const kpisAtDate = state.kpis[action.payload.date]
      const kpi = kpisAtDate.find(kpi => kpi.definitionId === action.payload.kpi.definitionId)
      if (kpi) {
        kpi.current ? kpi.current -= 1 : null
      }
    },
    updateKPI: (state, action: PayloadAction<{date: DateKey, kpi: DailyKPI}>) => {
      const kpisAtDate = state.kpis[action.payload.date]
      const kpi = kpisAtDate.find(kpi => kpi.definitionId === action.payload.kpi.definitionId)
      if (kpi) {
        kpi.current = action.payload.kpi.current
        kpi.goal = action.payload.kpi.goal
        kpi.name = action.payload.kpi.name
        kpi.dataType = action.payload.kpi.dataType

        console.log('kpi updated: ', kpi.current)
      } 
    },
    initializeKPIs: (state, action: PayloadAction<Record<DateKey, DailyKPI[]>>) => {
      state.kpis = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { incrementKPI, decrementKPI, updateKPI, initializeKPIs } = dailyKPIsSlice.actions

export default dailyKPIsSlice.reducer