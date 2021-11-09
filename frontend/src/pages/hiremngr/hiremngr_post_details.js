import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getPostById } from '../../Actions'
import { PostDetails } from '../../Components/post'

export class HiremngrPostDetails extends React.Component {
  constructor () {
    super()
    this.state = {
      postData: {}
    }
  }

  componentDidMount () {
    getPostById(this.props.match.params.postId, {}, (err, res) => {
      console.log('check post :', err, res)
      if (err) {
        alert(err)
        return
      }

      this.setState({ postData: res })
    })
  }

  render () {
    return (
      <>
        <PostDetails userType='hiremanager' {...this.props} />
      </>
    )
  }
}
