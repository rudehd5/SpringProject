import React, { useEffect, useState } from 'react';

import '../css/home.css';
import Footer from '../components/Footer.js';
import Calendar from '../components/Calendar.js';

import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from 'jquery';
import Cookies from 'js-cookie';

// import Slider from 'react-slick';

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const [popupVisible, setPopupVisible] = useState(true);

    const closePopup = () => {
        setPopupVisible(false);

        // 쿠키 처리
        if (document.getElementById('expiresChk').checked) {
            Cookies.set('popup', 'none', { expires: 1, path: '/' }); // 하루 동안 유지
        }
    };

    useEffect(() => {
        // 페이지 로드 시 쿠키 확인 및 팝업 제어
        const cookieValue = Cookies.get('popup');
        if (cookieValue === 'none') {
            setPopupVisible(false);
        }
    }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행

    useEffect(() => {
        $(".menu_btn").click(function (e) {
            e.preventDefault();
            $(".menu").addClass("on");
        });
        $(".close").click(function (e) {
            e.preventDefault();
            $(".menu").removeClass("on");
        });
        $(".menu_title").click(function (e) {
            e.preventDefault();
            $("html").animate({ scrollTop: 0 }, 600);
        });
        $(".menu_list > li").click(function (e) {
            // e.preventDefault();
            // alert("개발중입니다!");
        });
    });

    const leftClick = () => {
        const bannerH1 = $(".bannerH1");
        const bannerH2 = $(".bannerH2");
        const bannerH3 = $(".bannerH3");
        const bannerH4 = $(".bannerH4");

        if (bannerH1.css("visibility") !== "hidden"){
            bannerH1.css("visibility", "hidden");
            bannerH4.css("visibility", "visible");
        } else if(bannerH4.css("visibility") !== "hidden"){
            bannerH4.css("visibility", "hidden");
            bannerH3.css("visibility", "visible");
        } else if(bannerH3.css("visibility") !== "hidden"){
            bannerH3.css("visibility", "hidden");
            bannerH2.css("visibility", "visible");
        } else{
            bannerH2.css("visibility", "hidden");
            bannerH1.css("visibility", "visible");
        }
    };
    const rightClick = () => {
        const bannerH1 = $(".bannerH1");
        const bannerH2 = $(".bannerH2");
        const bannerH3 = $(".bannerH3");
        const bannerH4 = $(".bannerH4");

        if (bannerH1.css("visibility") !== "hidden"){
            bannerH1.css("visibility", "hidden");
            bannerH2.css("visibility", "visible");
        } else if(bannerH2.css("visibility") !== "hidden"){
            bannerH2.css("visibility", "hidden");
            bannerH3.css("visibility", "visible");
        } else if(bannerH3.css("visibility") !== "hidden"){
            bannerH3.css("visibility", "hidden");
            bannerH4.css("visibility", "visible");
        } else{
            bannerH4.css("visibility", "hidden");
            bannerH1.css("visibility", "visible");
        }
    };

    // chatbot
    useEffect(() => {
        // chatbot 스크립트
        (function () {
            var w = window;
            if (w.ChannelIO) {
                return w.console.error("ChannelIO script included twice.");
            }
            var ch = function () {
                ch.c(arguments);
            };
            ch.q = [];
            ch.c = function (args) {
                ch.q.push(args);
            };
            w.ChannelIO = ch;
            function l() {
                if (w.ChannelIOInitialized) {
                    return;
                }
                w.ChannelIOInitialized = true;
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
                var x = document.getElementsByTagName("script")[0];
                if (x.parentNode) {
                    x.parentNode.insertBefore(s, x);
                }
            }
            if (document.readyState === "complete") {
                l();
            } else {
                w.addEventListener("DOMContentLoaded", l);
                w.addEventListener("load", l);
            }
        })();

        // *아래 주석은 ESLint에게 ChannelIO가 전역 변수임을 인식하게함.
        // eslint-disable-next-line no-undef
        ChannelIO('boot', {
            "pluginKey": "da3c8516-7eba-40dc-b8d9-17610ebe9492"
        });
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함



    return (
        <div>
            {popupVisible && (
                <div id="notice_wrap">
                    <img src="../images/popup.png" alt="팝업" />
                    <p className="closewrap">
                        <input type="checkbox" name="expiresChk" id="expiresChk" className={"dayCloseBtn"} />
                        <label htmlFor="expiresChk" className={"dayCloseBtn"}>하루동안 이 창 열지않기</label>
                        <button className="closeBtn" onClick={closePopup}>
                            닫기
                        </button>
                    </p>
                </div>
            )}

            <header id="header">
                <div className="container">
                    <div class="header clearfix">
                        <div className="logo">
                            <a href="/">
                                <img src="../images/logo.png" alt="반려동물사진관_로고이미지"/>
                            </a>
                        </div>
                        <nav className="nav">
                            <div className="menu_bar">
                                <a href="/login" className="login_btn">
                                    {/*<img src="../images/login.png" alt="로그인 이미지"/>*/}
                                    <span className="menu_login">로그인</span>
                                </a>
                                <a href="/register" className="signup_btn">
                                    <span>회원가입</span>
                                </a>
                            </div>
                            <div className="menu_bar2">
                                <a href="#" className="menu_btn">
                                    <img src="../images/menu_bar.png" alt="메뉴바"/>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="menu">
                    <span className="menu_title">A PET PHOTO STUDIO</span>
                    <ul className="menu_list">
                        <li><a href="/about_jui">회사소개</a></li>
                        <li><a href="/gallery_jui">갤러리</a></li>
                        <li><a href="/address_api">찾아오시는길</a></li>
                        <li><a href="/faq_accordion_jee">자주묻는질문</a></li>
                    </ul>
                    <a href="#" className="close">
                        <i className="fa-solid fa-arrow-right-from-bracket">
                            <img src="../images/logout.png" alt="메뉴바"/>
                        </i>
                    </a>
                </div>
            </header>

            <section id="banner">
                <div className="container">
                    <div className="banner">
                        <div className="bxslider">
                            <button className={"bannerBtn1"} onClick={leftClick}><img src="../images/bannerBtn1.png"/></button>
                            <button className={"bannerBtn2"} onClick={rightClick}><img src="../images/bannerBtn2.png"/></button>
                            <div className={"bannerH1"}>
                                <img src="../images/banner1.jpg" alt="사진1"/>
                                <span className="banner1">
                                    <img src="../images/flower.png" alt="꽃 아이콘"/>
                                    인절미들
                                    <img src="../images/flower.png" alt="꽃 아이콘"/>
                                </span>
                            </div>
                            <div className={"bannerH2"}>
                                <img src="../images/banner2.jpg" alt="사진2"/>
                                <span className="banner2">
                                    <img src="../images/cat_foot.png" alt="고양이발바닥"/>
                                    ฅ^•ﻌ•^ฅ
                                </span>
                            </div>
                            <div className={"bannerH3"}>
                                <img src="../images/banner3.png" alt="사진3"/>
                                <span className="banner3">
                                    <img src="../images/book.png" alt="책 사진"/>
                                    거북이를 이길 수 있는 101가지
                                </span>
                            </div>
                            <div className={"bannerH4"}>
                                <img src="../images/banner4.png" alt="사진4"/>
                                <span className="banner4">
                                    <img src="../images/bone.png" alt="뼈사진"/>
                                    U・ᴥ・U
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contents">
                <div className="container">
                    <div className="contents">
                        <div className="concept">
                            <div className="Outside" data-aos="fade-right" data-aos-duration="2000">
                                <section>
                                    <h3># 야외</h3>
                                    <a href="#"><span>더보기 )</span></a>
                                </section>
                                <div className="concept_img">
                                    <div className="light">
                                        <a href="../images/outdoor1.jpg">
                                            <img src="../images/outdoor1.jpg" alt="야외사진1"/>
                                        </a>
                                        <a href="../images/outdoor2.jpg">
                                            <img src="../images/outdoor2.jpg" alt="야외사진2"/>
                                        </a>
                                        <a href="../images/outdoor3.jpg">
                                            <img src="../images/outdoor3.jpg" alt="야외사진3"/>
                                        </a>
                                        <a href="../images/outdoor4.jpg">
                                            <img src="../images/outdoor4.jpg" alt="야외사진4"/>
                                        </a>
                                        <a href="../images/outdoor5.jpg">
                                            <img src="../images/outdoor5.jpg" alt="야외사진5"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="Studio" data-aos="fade-left" data-aos-duration="2000">
                                <section>
                                    <h3># 스튜디오</h3>
                                    <a href="#"><span>더보기 )</span></a>
                                </section>
                                <div className="concept_img">
                                    <div className="light">
                                        <a href="../images/studio1.jpg">
                                            <img src="../images/studio1.jpg" alt="스튜디오사진1"/>
                                        </a>
                                        <a href="../images/studio2.jpg">
                                            <img src="../images/studio2.jpg" alt="스튜디오사진2"/>
                                        </a>
                                        <a href="../images/studio3.jpg">
                                            <img src="../images/studio3.jpg" alt="스튜디오사진3"/>
                                        </a>
                                        <a href="../images/studio4.jpg">
                                            <img src="../images/studio4.jpg" alt="스튜디오사진4"/>
                                        </a>
                                        <a href="../images/studio5.jpg">
                                            <img src="../images/studio5.jpg" alt="스튜디오사진5"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="Profile" data-aos="fade-right" data-aos-duration="2000">
                                <section>
                                    <h3># 프로필</h3>
                                    <a href="#"><span>더보기 )</span></a>
                                </section>
                                <div className="concept_img">
                                    <div className="light">
                                        <a href="../images/profile1.jpg">
                                            <img src="../images/profile1.jpg" className="img-responsive " alt="프로필1"/>
                                        </a>
                                        <a href="../images/profile2.jpg">
                                            <img src="../images/profile2.jpg" className="img-responsive" alt="프로필2"/>
                                        </a>
                                        <a href="../images/profile3.jpg">
                                            <img src="../images/profile3.jpg" className="img-responsive" alt="프로필3"/>
                                        </a>
                                        <a href="../images/profile4.jpg">
                                            <img src="../images/profile4.jpg" className="img-responsive" alt="프로필4"/>
                                        </a>
                                        <a href="../images/profile5.jpg">
                                            <img src="../images/profile5.jpg" className="img-responsive" alt="프로필5"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="review">
                            <h3 data-aos="fade" data-aos-duration="2000"># 리뷰</h3>
                            <div data-aos="fade" data-aos-duration="2000">
                                <img src="../images/review13.png" alt="review13"/>
                                <img src="../images/review14.png" alt="review14"/>
                                <img src="../images/review15.png" alt="review15"/>
                                <img src="../images/review16.png" alt="review16"/>
                            </div>
                            <div data-aos="fade" data-aos-duration="2000">
                                <img src="../images/review17.png" alt="review17"/>
                                <img src="../images/review18.png" alt="review18"/>
                                <img src="../images/review19.png" alt="review19"/>
                                <img src="../images/review20.png" alt="review20"/>
                            </div>
                            <div data-aos="fade" data-aos-duration="2000">
                                <img src="../images/review21.png" alt="review21"/>
                                <img src="../images/review22.png" alt="review22"/>
                                <img src="../images/review23.png" alt="review23"/>
                                <img src="../images/review24.png" alt="review24"/>
                            </div>
                        </div>

                        <Calendar/>
                        {/*<div id='calendar'></div>*/}

                    </div>
                </div>
            </section>

            <Footer/>

            <script>
            </script>
        </div>
    );
};

export default Home;
