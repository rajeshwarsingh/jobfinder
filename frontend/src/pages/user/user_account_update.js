import React from 'react'
import { Link } from 'react-router-dom'

export const UserAccountUpdate = (props) => {
  return (
    <div>
      <Link to='/freelancer/posts'>back to post</Link> or <Link to='/user/account/view'>account Setting</Link>
      <div><h1>Update User Account</h1></div>
      <div><div><text>update username: jugaad</text></div></div>
      <div><text>update first name: joseph</text></div>
      <div><text>update last name: lu</text></div>
      <div><text>update password: *****</text></div>
    </div>
  )
}
