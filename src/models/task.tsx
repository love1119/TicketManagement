export type TicketType = {
  id: number
  title: string
  description?: string
  status?: 'open' | 'in-progress' | 'completed'
  createdAt: Date
}
