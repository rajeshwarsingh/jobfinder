import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../Auth/auth'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log('protected route :')
  return (
    <Route
      {...rest} render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={
                        {
                          pathname: '/',
                          state: {
                            from: props.location
                          }
                        }
                    }
            />
          )
        }
      }}
    />
  )
}
