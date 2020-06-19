import React from 'react';

function Header() {

    // function


    return (
        <div className="header">
            <div className="header-top">
                {/* <span>欢迎, {username}</span> */}
                {/* <LinkButton onClick={this.logout}>退出</LinkButton> */}
            </div>
            <div className="header-bottom">
                {/* <div className="header-bottom-left">{title}</div> */}
                <div className="header-bottom-right">
                    {/* <span>{currentTime}</span>
                    <img src={dayPictureUrl} alt="weather" />
                    <span>{weather}</span> */}
                </div>
            </div>
        </div>
    )
}

export default Header