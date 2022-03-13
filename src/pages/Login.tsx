/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'

import { IUserDetails } from 'models/userdetails'
import { DataContext, DataContextType } from 'context/DataContext'
import { INTERNAL_LINKS } from 'constant/InternalLinks'

const Login = () => {
  const { logIn } = useContext<DataContextType>(DataContext)
  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)
  const [errorTxt, setErrorTxt] = useState<string>('')

  const onFinish = async (values: IUserDetails) => {
    setErrorTxt('')
    try {
      setLoading(true)
      const success = await logIn(values.email, values.password)
      if (success) {
        history.push(INTERNAL_LINKS.MAIN)
      } else {
        setErrorTxt('Your email or password is incorrect.')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="px-8 pt-8 w-96 rounded-lg border-none md:border-2 md:border-solid">
        <h1 className="mb-8 w-full text-2xl text-center">Log In</h1>

        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: 'email', message: 'Please input the valid email.' },
              { required: true, message: 'Please input your username!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              disabled={loading}
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="mb-4 text-center text-red-600">{errorTxt}</div>
      </div>
    </div>
  )
}

export default Login
