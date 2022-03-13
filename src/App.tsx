import { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { INTERNAL_LINKS } from 'constant/InternalLinks'

import Login from 'pages/Login'
import DetailsPage from 'pages/Details'
import MainPage from 'pages/Main'

import 'antd/dist/antd.css'

const App: FC = () => {
  return (
    <div className="bg-white">
      <Switch>
        <Route exact path={INTERNAL_LINKS.LOGIN} render={Login} />
        <Route exact path={INTERNAL_LINKS.DETAILS} render={DetailsPage} />
        <Route exact path={INTERNAL_LINKS.MAIN} render={MainPage} />
        <Redirect exact path="/" to={{ pathname: INTERNAL_LINKS.MAIN }} />
      </Switch>
    </div>
  )
}

export default App
