import { FC, useState } from 'react'
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect
} from 'react-router-dom'
import storage from 'store'
import { Button } from 'antd'

import { INTERNAL_LINKS } from 'constant/InternalLinks'

import { DataContext } from 'context/DataContext'

import Login from 'pages/Login'
import DetailsPage from 'pages/Details'
import MainPage from 'pages/Main'

import PrivateRoute from 'components/PrivsateRoute'

import { RootState } from 'models/state'
import { TicketType, TicketStatus } from 'models/task'

import 'antd/dist/antd.css'

const EMAIL = 'test@vroom.com.au'
const PASSWORD = 'frontendtest2022'

const App: FC = () => {
  const history = useHistory()
  const { pathname } = useLocation()

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

  const onLogout = () => {
    storage.remove('user')
    state.user = {
      email: '',
      password: ''
    }
    updateState(state)
    history.push(INTERNAL_LINKS.LOGIN)
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
          updateState({ ...state })
          resolve(true)
        } else {
          resolve(false)
        }
      }, 2000)
    })
  }

  const updateTicketDetails = (
    id: number,
    title: string,
    description?: string,
    status?: TicketStatus
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ticketIndex = (state.tickets || []).findIndex(
          (ticket: TicketType) => ticket.id === id
        )

        if (ticketIndex >= 0) {
          state.tickets[ticketIndex] = {
            ...state.tickets[ticketIndex],
            title,
            description,
            status
          }
          updateState({ ...state })
          resolve(true)
        } else {
          resolve(false)
        }
      }, 2000)
    })
  }

  const updateTicketStatus = (
    id: number,
    status: TicketStatus
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ticketIndex = (state.tickets || []).findIndex(
          (ticket: TicketType) => ticket.id === id
        )

        if (ticketIndex >= 0) {
          state.tickets[ticketIndex].status = status
          updateState({ ...state })
          resolve(true)
        } else {
          resolve(false)
        }
      }, 2000)
    })
  }

  const deleteTicket = (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ticketIndex = (state.tickets || []).findIndex(
          (ticket: TicketType) => ticket.id === id
        )

        if (ticketIndex >= 0) {
          state.tickets = [
            ...state.tickets.slice(0, ticketIndex),
            ...state.tickets.slice(ticketIndex + 1)
          ]
          updateState({ ...state })
          resolve(true)
        } else {
          resolve(false)
        }
      }, 2000)
    })
  }

  return (
    <DataContext.Provider
      value={{
        state,
        logIn,
        createTicket,
        updateTicketStatus,
        deleteTicket,
        updateTicketDetails
      }}
    >
      <div className="bg-white">
        <Switch>
          <Route exact path={INTERNAL_LINKS.LOGIN} render={() => <Login />} />
          <PrivateRoute
            exact
            path={`${INTERNAL_LINKS.DETAILS}/:ticketid`}
            render={() => <DetailsPage />}
          />
          <PrivateRoute
            exact
            path={INTERNAL_LINKS.MAIN}
            render={() => <MainPage />}
          />
          <Redirect path="*" to={{ pathname: INTERNAL_LINKS.MAIN }} />
        </Switch>
        {pathname !== INTERNAL_LINKS.LOGIN && (
          <div className="absolute top-8 right-8" onClick={onLogout}>
            <Button>Log Out</Button>
          </div>
        )}
      </div>
    </DataContext.Provider>
  )
}

export default App
