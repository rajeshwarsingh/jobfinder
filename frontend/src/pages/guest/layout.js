import React from 'react'
import auth from '../../Auth/auth'

export const Layout = (props) => {
  return (
    <div>
      <div>app layout</div>
      <button onClick={
            () => {
              auth.logout(() => {
                props.history.push('/')
              })
            }
        }
      >logout
      </button>
    </div>
  )
}
