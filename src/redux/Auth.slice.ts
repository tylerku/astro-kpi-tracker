import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../models/User'

export interface AuthState {
  currentUser?: User
}

const initialState: AuthState = {
  currentUser: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.currentUser = undefined
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentUser, logout } = authSlice.actions

export default authSlice.reducer