import React from "react";
import userlogo from "../../images/img/user-logo.png";
const CompanyHeader = () => {
    return (
        <>
            <section className="headbox">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="user-logo mb-3"><a href="#"><img src={userlogo} alt="User" loading="lazy" /></a></div>
                            <ul className="socialmedia">
                                <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                        <div className="col-lg-6 text-right">
                            <p>Mon, 11 Nov 2022</p>
                            <a href="#" className="btn webClockIn">Web clock button</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CompanyHeader;