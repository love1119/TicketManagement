import { IUserDetails } from './userdetails'
import { TicketType } from './task'

export interface RootState {
  user?: IUserDetails
  tickets: TicketType[]
}
