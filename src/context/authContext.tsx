import React, { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";

type AuthState = {
  accessToken: string | null
}

const initialState: AuthState = {
  accessToken: null
}

const AuthContext = createContext<{dispatch: Function; state: AuthState}>({dispatch: () => {}, state: {...initialState}})

let reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setAccessToken':
      return {...state, accessToken: action.value}
    default:
      return {...state}
  }
}

interface AuthContextProviderProps {
  children: ReactNode;
}

type AuthContextValue = {
  state: AuthState;
  dispatch: Function;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
  let defaultState: AuthState = {...initialState}
  let [state, dispatch] = useReducer(reducer, defaultState)
  let value: AuthContextValue = {state, dispatch}

  useEffect(() => {
    //initData()
    console.log('The useEffect hook ran: ',)
  }, [])

  const initData = async () => {}

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

let AuthContextConsumer = AuthContext.Consumer

export { AuthContext, AuthContextProvider, AuthContextConsumer };
export type { AuthContextValue };
