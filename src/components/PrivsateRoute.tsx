import { Route, Redirect } from 'react-router-dom'
import { INTERNAL_LINKS } from 'constant/InternalLinks'
import storage from 'store'

const PrivateRoute = ({ ...props }) => {
  const redirect = INTERNAL_LINKS.LOGIN

  const isAuthenticated = storage.get('user')

  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: redirect
      }}
    />
  )
}

export default PrivateRoute
