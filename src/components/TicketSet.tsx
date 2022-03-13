import { useContext, useEffect, useState } from 'react'
import { TICKET_STATUS } from 'constant/constants'
import { Space } from 'antd'

import { DataContext, DataContextType } from 'context/DataContext'
import { TicketType, TicketStatus } from 'models/task'
import Ticket from './Ticket'

type TicketSetProps = {
  status: TicketStatus
}

const TicketSet = ({ status }: TicketSetProps) => {
  const { state } = useContext<DataContextType>(DataContext)

  const [tickets, setTickets] = useState<TicketType[]>([])

  useEffect(() => {
    if (status) {
      setTickets(
        (state.tickets || []).filter(
          (ticket: TicketType): boolean => ticket.status === status
        )
      )
    } else {
      setTickets([])
    }
  }, [status, state])

  return (
    <div className="p-4 w-64 max-w-xs bg-white rounded-md border">
      <h1>{TICKET_STATUS[status]}</h1>
      <Space direction="vertical" className="w-full">
        {tickets.map((ticket: TicketType) => (
          <Ticket key={ticket.id} task={ticket} />
        ))}
      </Space>
    </div>
  )
}

export default TicketSet
