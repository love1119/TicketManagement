/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react'
import { Card, Space, Select, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { DataContext, DataContextType } from 'context/DataContext'

import { TicketType, TicketStatus } from 'models/task'
import { TICKET_STATUS } from 'constant/constants'
import { INTERNAL_LINKS } from 'constant/InternalLinks'

const { Option } = Select

type TicketProps = {
  task: TicketType
}

const Ticket = ({ task }: TicketProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [statusList, setStatusList] = useState<string[]>([])
  const history = useHistory()

  const { updateTicketStatus, deleteTicket } =
    useContext<DataContextType>(DataContext)

  const onTicketStatusChange = (value: TicketStatus) => {
    updateTicketStatus(task.id, value)
  }

  const onDeleteTicket = async () => {
    try {
      setLoading(true)

      await deleteTicket(task.id)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onEditTicket = () => {
    history.push(`${INTERNAL_LINKS.DETAILS}/${task.id}`)
  }

  useEffect(() => {
    if (task?.status) {
      switch (task.status) {
        case 'open':
          setStatusList(['in-progress', 'complete'])
          break
        case 'in-progress':
          setStatusList(['open', 'complete'])
          break
        case 'complete':
          setStatusList(['open'])
          break
      }
    }
  }, [task])

  return (
    <Card title={task.title}>
      <h6 className="mr-4 font-bold">Description:</h6>
      <h6 className="mb-4">{task.description}</h6>
      <Space>
        <h6 className="mr-4 font-bold">Status:</h6>
        <Select
          defaultValue={task.status}
          onChange={(e: TicketStatus) => onTicketStatusChange(e)}
        >
          {statusList.map((sts: string) => (
            <Option key={sts} value={sts}>
              {TICKET_STATUS[sts as TicketStatus]}
            </Option>
          ))}
        </Select>
      </Space>
      <Space className="mt-4">
        <Button type="primary" onClick={onEditTicket}>
          Edit
        </Button>
        <Button
          type="primary"
          disabled={loading}
          loading={loading}
          danger
          onClick={onDeleteTicket}
        >
          Delete
        </Button>
      </Space>
    </Card>
  )
}

export default Ticket
