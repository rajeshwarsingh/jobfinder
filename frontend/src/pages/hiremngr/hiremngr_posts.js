
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../../Actions'
import { ShortPostInfo } from '../../Components/post/shortPostInfo'
import { PostList } from '../../Components/post'

export class HiremngrPosts extends React.Component {
  constructor () {
    super()
    this.state = {
      postsData: []
    }
  }

  componentDidMount () {
    getPosts({}, (err, res) => {
      console.log('show all posts:', err, res)
      this.setState({ postsData: res })
    })
  }

  render () {
    const posts = this.state.postsData.map((item, i) => {
      // console.log('check ',data)
      return <ShortPostInfo key={i} data={item} {...this.props} />
    })
    return (
      <>

        <PostList {...this.props} />
      </>
    )
  }
}
