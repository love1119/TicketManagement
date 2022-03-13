import { useState } from 'react'
import { Button, Space, Modal } from 'antd'
import TicketSet from 'components/TicketSet'
import TicketForm from 'components/TicketForm'

const MainPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const dismissModal = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="overflow-auto p-8 h-screen bg-white">
      <Button type="primary" onClick={showModal}>
        New Ticket
      </Button>
      <div className="mt-8">
        <Space align="start" wrap={true}>
          <TicketSet status="open" />
          <TicketSet status="in-progress" />
          <TicketSet status="complete" />
        </Space>
      </div>
      <Modal
        title="New Ticket"
        visible={isModalVisible}
        onCancel={dismissModal}
        footer={null}
      >
        <TicketForm onDismiss={dismissModal} />
      </Modal>
    </div>
  )
}

export default MainPage
