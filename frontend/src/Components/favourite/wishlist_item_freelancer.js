import React from 'react'

export class WishlistItemFreelancer extends React.Component {

    render() {
        return (
            <li>
                {/* <!-- Overview --> */}
                <div className="freelancer-overview">
                    <div className="freelancer-overview-inner">

                        {/* <!-- Avatar --> */}
                        <div className="freelancer-avatar">
                            <a href="/"><img src="images/user-avatar-placeholder.png" alt="" /></a>
                        </div>

                        {/* <!-- Name --> */}
                        <div className="freelancer-name">
                            <h4><a href="/">Marcin Kowalski <img className="flag" src="images/flags/pl.svg" alt="" title="Poland" data-tippy-placement="top" /></a></h4>
                            <span>Front-End Developer</span>
                            {/* <!-- Rating --> */}
                            <div className="freelancer-rating">
                                <div className="star-rating" data-rating="4.7"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Buttons --> */}
                <div className="buttons-to-right">
                    <a href="/" className="button red ripple-effect ico" title="Remove" data-tippy-placement="left"><i className="icon-feather-trash-2"></i></a>
                </div>
            </li>
        )
    }
}










