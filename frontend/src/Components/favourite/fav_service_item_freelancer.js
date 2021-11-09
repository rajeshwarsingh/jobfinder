import React from 'react'

export class FavServiceItemFreelancer extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <li>
        {/* <!-- Overview --> */}
        <div class='freelancer-overview'>
          <div class='freelancer-overview-inner'>

            {/* <!-- Avatar --> */}
            <div class='freelancer-avatar'>
              <a href='#'><img src='images/user-avatar-placeholder.png' alt='' /></a>
            </div>

            {/* <!-- Name --> */}
            <div class='freelancer-name'>
              <h4><a href='#'>Marcin Kowalski <img class='flag' src='images/flags/pl.svg' alt='' title='Poland' data-tippy-placement='top' /></a></h4>
              <span>Front-End Developer</span>
              {/* <!-- Rating --> */}
              <div class='freelancer-rating'>
                <div class='star-rating' data-rating='4.7' />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Buttons --> */}
        <div class='buttons-to-right'>
          <a href='#' class='button red ripple-effect ico' title='Remove' data-tippy-placement='left'><i class='icon-feather-trash-2' /></a>
        </div>
      </li>
    )
  }
}
