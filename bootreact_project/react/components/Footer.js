import React from "react";
import '../css/footer.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return (
        <footer id="footer">
            <div className="container">
                <div className="footer">
                    <div className="f_logo">
                        <img src="../images/logo.png" alt="푸터_로고이미지"/>
                    </div>
                    <div className="f_menu">
                        <a href="/">이용약관</a>
                        <a href="/">개인정보처리방침</a>
                        <a href="/">고객문의</a>
                        <a href="/">이메일 문의</a>
                    </div>
                    <div className="f_made">
                        <span>제작</span>
                        <span>이경동</span>
                        <span>이경동</span>
                        <span>이경동</span>
                        <span>이경동</span>
                        <span>이경동</span>
                        <span>이경동</span>
                    </div>
                    <div className="f_copy">
                        Copyright A PET PHOTO STUDIO. All Rights Reserved.
                    </div>
                    <div className="f_sns">
                        {/*<i className="fa-brands fa-instagram"></i>*/}
                        {/*<i className="fa-brands fa-youtube"></i>*/}
                        <a href={"https://www.instagram.com/"}>
                            <FontAwesomeIcon icon={faInstagram} className={"sns"} id={"sns1"}/>
                            {/*style={{color: 'rgb(255, 200, 146)'}}*/}
                        </a>
                        <a href={"https://www.youtube.com/"}>
                            <FontAwesomeIcon icon={faYoutube} className={"sns"} id={"sns2"}/>
                            {/*style={{color: 'rgb(255, 42, 42, 0.5)'}}*/}
                        </a>
                        {/*<i className="fa-brands fa-youtube" style="color: #e30d0d;"></i>*/}
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;