
import React from 'react'
import { removeCookieName } from '../../utility'
import { Redirect } from 'react-router-dom'

export class UserLogout extends React.Component {
  constructor () {
    super()
  }

  render () {
    removeCookieName('verificationToken')
    removeCookieName('userProfile')

    return (
      <Redirect
        to={
                { pathname: '/login' }
            }
      />
    )
  }
}
