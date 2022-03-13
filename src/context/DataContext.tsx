import React from 'react'
import { RootState } from 'models/state'
import { TicketStatus } from 'models/task'

export type DataContextType = {
  state: RootState
  logIn: (email: string, password: string) => Promise<boolean>
  logout?: () => void
  createTicket: (title: string, description?: string) => Promise<boolean>
  updateTicketStatus: (id: number, status: TicketStatus) => void
  deleteTicket: (id: number) => Promise<boolean>
}

export const DataContext = React.createContext<DataContextType>({
  state: {} as RootState,
  logIn: () => Promise.resolve(false),
  createTicket: () => Promise.resolve(false),
  updateTicketStatus: () => ({}),
  deleteTicket: () => Promise.resolve(false)
})
