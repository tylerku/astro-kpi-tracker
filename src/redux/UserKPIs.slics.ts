import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DailyKPI } from '@/models'

export interface DailyKPIsState {
  kpis: DailyKPI[] 
}

const initialState: DailyKPIsState = {
  kpis: []
}

export const dailyKPIsSlice = createSlice({
  name: 'DailyKPIs',
  initialState,
  reducers: {
    incrementKPI: (state, action: PayloadAction<DailyKPI>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const existingKpiIndex = state.kpis.indexOf(action.payload)
      const kpiExists = existingKpiIndex > -1
      if (kpiExists) {
        state.kpis[existingKpiIndex].current += 1
      } else {
        state.kpis.push(action.payload)
      }
    },
    decrementKPI: (state, action: PayloadAction<DailyKPI>) => {
      const existingKpiIndex = state.kpis.findIndex(kpi => kpi.id === action.payload.id)
      const kpiExists = existingKpiIndex > -1
      if (kpiExists) {
        state.kpis[existingKpiIndex].current += 1
      } else {
        state.kpis.push(action.payload)
      } 
    },
    updateKPI: (state, action: PayloadAction<DailyKPI>) => {
      const actionIndex = state.kpis.findIndex(kpi => kpi.id === action.payload.id)
      if (actionIndex > -1) {
        state.kpis[actionIndex] = action.payload
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementKPI, decrementKPI, updateKPI } = dailyKPIsSlice.actions

export default dailyKPIsSlice.reducer