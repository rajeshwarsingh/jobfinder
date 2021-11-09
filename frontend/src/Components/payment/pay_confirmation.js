import React from 'react'
import qs from 'qs'

export class PayConfirmation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      invoiceId: '',
      type: '',
      productId: '',
      productProposalId: ''
    }
  }

  componentDidMount () {
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    const { invoiceId, productProposalId = '', type = '', productId, userId = '' } = search
    this.setState({ invoiceId, type, productProposalId, productId, userId })
  }

  render () {
    const url = (this.state.type === 'service' ? `/freelancer/service/${this.state.productId}`
      : this.state.type === 'post' ? `/freelancer/search_details/${this.state.userId}?currPraposalId=${this.state.productProposalId}` : '#')

    return (
      <div>
        {/* <!-- Content================================================== --> */}
        <div id='titlebar' class='gradient'> </div>

        {/* <!-- Container --> */}
        <div class='container'>
          <div class='row'>
            <div class='col-md-12'>

              <div class='order-confirmation-page'>
                <div class='breathing-icon'><i class='icon-feather-check' /></div>
                <h2 class='margin-top-30'>Thank you for your payment!</h2>
                <p>Your payment has been processed successfully.</p>
                <a href={`/invoice/${this.state.invoiceId}`} class='button ripple-effect-dark button-sliding-icon margin-top-30'>View Invoice <i class='icon-material-outline-arrow-right-alt' /></a> &nbsp;&nbsp;
                <a href={url} class='button ripple-effect-dark button-sliding-icon margin-top-30'>View <i class='icon-material-outline-arrow-right-alt' /></a>
              </div>

            </div>
          </div>
        </div>
        {/* <!-- Container / End --> */}
      </div>
    )
  }
}
