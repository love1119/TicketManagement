export type TicketStatus = 'open' | 'in-progress' | 'complete'

export type TicketType = {
  id: number
  title: string
  description?: string
  status?: TicketStatus
  createdAt: Date
}
