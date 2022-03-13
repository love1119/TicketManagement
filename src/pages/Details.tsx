/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { DataContext, DataContextType } from 'context/DataContext'
import { Form, Input, Button, Select, FormInstance } from 'antd'
import { INTERNAL_LINKS } from 'constant/InternalLinks'
import { TICKET_STATUS } from 'constant/constants'

import { TicketType, TicketStatus } from 'models/task'

const { Option } = Select

const DetailsPage = () => {
  const { state } = useContext<DataContextType>(DataContext)
  const history = useHistory()
  const { ticketid } = useParams<{ ticketid: string }>()

  const [loading, setLoading] = useState<boolean>(false)
  const [ticketDetails, setTicketDetails] = useState<TicketType>(
    {} as TicketType
  )
  const [statusList, setStatusList] = useState<TicketStatus[]>([])

  const refForm = useRef<FormInstance<TicketType>>(null)

  const onFinish = (values: TicketType) => {
    console.log(values)
  }

  const onFinishFailed = () => {
    console.log('Failed')
  }

  const onBack = () => {
    history.push(INTERNAL_LINKS.MAIN)
  }

  useEffect(() => {
    if (ticketid) {
      const ticketIndex = (state.tickets || []).findIndex(
        (ticket: TicketType) => ticket.id === Number(ticketid)
      )

      if (ticketIndex >= 0) {
        setTicketDetails(state.tickets[ticketIndex])
      } else {
        onBack()
      }
    } else {
      onBack()
    }
  }, [ticketid])

  useEffect(() => {
    if (ticketDetails?.status) {
      switch (ticketDetails.status) {
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

    if (ticketDetails && refForm && refForm.current) {
      refForm.current.setFieldsValue(ticketDetails)
    }
  }, [ticketDetails])

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="px-8 pt-8 w-96 rounded-lg border">
        <Form
          ref={refForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select>
              {statusList.map((sts: string) => (
                <Option key={sts} value={sts}>
                  {TICKET_STATUS[sts as TicketStatus]}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              className="mr-4"
              disabled={loading}
              loading={loading}
              onClick={onBack}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default DetailsPage
