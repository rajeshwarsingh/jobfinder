import React from 'react'
import { patchService } from '../../Actions'

export class BlockService extends React.Component {
  constructor () {
    super()
    this.state = {
      serviceData: {},
      wishlistId: '',
      isWishlisted: false
    }
    this.handleBlock = this.handleBlock.bind(this)
  }

  handleBlock () {
    const { serviceId, block } = this.props.serviceData
    if (Array.isArray(block)) {
      block.push(this.props.serviceData.userId)
      patchService(serviceId, { block }, (err, pdata) => {
        if (err) {
          alert('something went wrong!')
          return
        }
        // log here
        alert('blocked successfully')
      })
    } else {
      alert('something wrong in block', block)
    }
  }

  render () {
    return (
      <div><h3>Block Service</h3>

        {/* <!-- Bookmark Button --> */}
        <button onClick={this.handleBlock} className='bookmark-button margin-bottom-25'>

          <span className='bookmark-text'>Block</span>
          <span className='bookmarked-text'>Block</span>
        </button>
      </div>
    )
  }
}
