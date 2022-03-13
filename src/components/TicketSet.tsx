import { TICKET_STATUS } from 'constant/constants'

type TicketSetProps = {
  status: 'open' | 'in-progress' | 'complete'
}

const TicketSet = ({ status }: TicketSetProps) => {
  return (
    <div className="p-4 w-64 bg-white rounded-md border">
      <h1>{TICKET_STATUS[status]}</h1>
    </div>
  )
}

export default TicketSet
