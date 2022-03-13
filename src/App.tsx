import { FC, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import storage from 'store'

import { INTERNAL_LINKS } from 'constant/InternalLinks'

import { DataContext } from 'context/DataContext'

import Login from 'pages/Login'
import DetailsPage from 'pages/Details'
import MainPage from 'pages/Main'

import PrivateRoute from 'components/PrivsateRoute'

import { RootState } from 'models/state'
import { TicketType } from 'models/task'

import 'antd/dist/antd.css'

const EMAIL = 'test@vroom.com.au'
const PASSWORD = 'frontendtest2022'

const App: FC = () => {
  const [state, updateState] = useState<RootState>({} as RootState)

  const logIn = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === EMAIL && password === PASSWORD) {
          state.user = {
            email,
            password
          }
          updateState(state)
          storage.set('user', email)
          resolve(true)
        } else {
          resolve(false)
        }
      }, 2000)
    })
  }

  const generateID = () => {
    let id = 0

    const topTicket = (state.tickets || []).sort(
      (a: TicketType, b: TicketType) => (a?.id < b?.id ? 1 : -1)
    )[0]

    if (topTicket) {
      id = topTicket.id + 1
    }

    return id
  }

  const createTicket = (
    title: string,
    description?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (title) {
          const newTicket: TicketType = {
            id: generateID(),
            title,
            description,
            status: 'open',
            createdAt: new Date()
          }
          state.tickets = [...(state.tickets || []), newTicket]
          resolve(true)
        } else {
          resolve(false)
        }
      }, 2000)
    })
  }

  return (
    <DataContext.Provider value={{ state, logIn, createTicket }}>
      <div className="bg-white">
        <Switch>
          <Route exact path={INTERNAL_LINKS.LOGIN} render={() => <Login />} />
          <PrivateRoute
            exact
            path={INTERNAL_LINKS.DETAILS}
            render={() => <DetailsPage />}
          />
          <PrivateRoute
            exact
            path={INTERNAL_LINKS.MAIN}
            render={() => <MainPage />}
          />
          <Redirect exact path="/" to={{ pathname: INTERNAL_LINKS.MAIN }} />
        </Switch>
      </div>
    </DataContext.Provider>
  )
}

export default App
