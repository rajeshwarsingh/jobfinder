import React, { Fragment } from 'react'
import './invoice.css'
import { getInvoiceById } from '../../../Actions'

export class Invoice extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: '',
      productId: '',
      productProposalId: ''
    }
  }

  componentDidMount () {
    const invoiceId = this.props.match.params.invoiceId
    getInvoiceById(invoiceId, {}, (err, data) => {
      console.log('**************', err, data)
    })
  }

  render () {
    return (
      <>

        {/* <!-- Print Button --> */}
        <div className='print-button-container'>
          <a href='javascript:window.print()' className='print-button'>Print this invoice</a>
        </div>

        {/* <!-- Invoice --> */}
        <div id='invoice'>

          {/* <!-- Header --> */}
          <div className='row'>
            <div className='col-xl-6'>
              <div id='logo'><img src={require('../../../assets/images/logo.png').default} alt='' /></div>
            </div>

            <div className='col-xl-6'>

              <p id='details'>
                <strong>Order:</strong> #00124 <br />
                <strong>Issued:</strong> 20/08/2019 <br />
                Due 7 days from date of issue
              </p>
            </div>
          </div>

          {/* <!-- Client & Supplier --> */}
          <div className='row'>
            <div className='col-xl-12'>
              <h2>Invoice</h2>
            </div>

            <div className='col-xl-6'>
              <strong className='margin-bottom-5'>Supplier</strong>
              <p>
                Jugaad Ltd. <br />
                21 St joseph lu <br />
                UK <br />
              </p>
            </div>

            <div className='col-xl-6'>
              <strong className='margin-bottom-5'>Customer</strong>
              <p>
                John lu <br />
                36 Edgewater Street <br />
                Melbourne, 2540, Australia <br />
              </p>
            </div>
          </div>

          {/* <!-- Invoice --> */}
          <div className='row'>
            <div className='col-xl-12'>
              <table className='margin-top-20'>
                <tr>
                  <th>Description</th>
                  <th>Price</th>
                  <th>VAT (20%)</th>
                  <th>Total</th>
                </tr>

                <tr>
                  <td>Standard Plan</td>
                  <td>$49.00</td>
                  <td>$9.80</td>
                  <td>$58.80</td>
                </tr>
              </table>
            </div>

            <div className='col-xl-4 col-xl-offset-8'>
              <table id='totals'>
                <tr>
                  <th>Total Due</th>
                  <th><span>$58.80</span></th>
                </tr>
              </table>
            </div>
          </div>

          {/* <!-- Footer --> */}
          <div className='row'>
            <div className='col-xl-12'>
              <ul id='footer' style={{ backgroundColor: 'transparent' }}>
                <li><span>www.example.com</span></li>
                <li>office@example.com</li>
                <li>(123) 123-456</li>
              </ul>
            </div>
          </div>

        </div>

      </>
    )
  }
}
