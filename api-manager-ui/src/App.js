import React, { useState } from 'react'
import Login from './modules/login'
import Dashboard from './modules/dashboard'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
}))

const App = () => {

  const [token, setToken] = useState(null)
  const classes = useStyles()

  const handleSetToken = (newToken) => setToken(newToken)

  return (
    <div className={classes.root}>
      {
        token
          ?
          <Dashboard />
          :
          <Login handleSetToken={handleSetToken} />
      }
    </div>
  )
}

export default App