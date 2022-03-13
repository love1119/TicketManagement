import { useState, useContext } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { TicketType } from 'models/task'
import { DataContext, DataContextType } from 'context/DataContext'

type TicketFormProps = {
  onDismiss: () => void
}

const TicketForm = ({ onDismiss }: TicketFormProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { createTicket } = useContext<DataContextType>(DataContext)

  const onFinish = async (values: TicketType): Promise<void> => {
    try {
      setLoading(true)
      await createTicket(values.title, values.description)
      notification.success({
        message: `New Ticket "${values.title}" is created.`
      })
      onDismiss()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = () => {
    console.log('Finish Failed')
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          disabled={loading}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TicketForm
