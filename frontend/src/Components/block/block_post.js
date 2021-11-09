import React from 'react'
import ls from 'local-storage'
import { patchPost } from '../../Actions'

export class BlockPost extends React.Component {
  constructor () {
    super()
    this.state = {
      postData: {},
      wishlistId: '',
      isWishlisted: false
    }
    this.handleBlock = this.handleBlock.bind(this)
  }

  handleBlock () {
    const { postId, block } = this.props.postData
    if (Array.isArray(block)) {
      block.push(ls.get('userId'))
      patchPost(postId, { block }, (err, pdata) => {
        if (err) {
          alert('something went wrong!')
          return
        }
        alert('blocked successfully')
      })
    } else {
      alert('something wrong in block', block)
    }
  }

  render () {
    return (
      <div><h3>Block Post</h3>

        {/* <!-- Bookmark Button --> */}
        <button onClick={this.handleBlock} className='bookmark-button margin-bottom-25'>

          <span className='bookmark-text'>Block</span>
          <span className='bookmarked-text'>Block</span>
        </button>
      </div>
    )
  }
}
