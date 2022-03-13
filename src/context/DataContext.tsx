import React from 'react'
import { RootState } from 'models/state'

export type DataContextType = {
  state: RootState
  logIn: (email: string, password: string) => Promise<boolean>
  logout?: () => void
  createTicket: (title: string, description?: string) => Promise<boolean>
}

export const DataContext = React.createContext<DataContextType>({
  state: {} as RootState,
  logIn: () => Promise.resolve(false),
  createTicket: () => Promise.resolve(false)
})
