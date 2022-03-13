import { useState, useEffect } from 'react'
import { Card, Space, Select, Button } from 'antd'

import { TicketType, TicketStatus } from 'models/task'
import { TICKET_STATUS } from 'constant/constants'

const { Option } = Select

type TicketProps = {
  task: TicketType
}

const Ticket = ({ task }: TicketProps) => {
  const [statusList, setStatusList] = useState<string[]>([])

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
        <Select defaultValue={task.status}>
          {statusList.map((sts: string) => (
            <Option key={sts} value={sts}>
              {TICKET_STATUS[sts as TicketStatus]}
            </Option>
          ))}
        </Select>
      </Space>
      <Space className="mt-4">
        <Button type="primary">Edit</Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </Space>
    </Card>
  )
}

export default Ticket
