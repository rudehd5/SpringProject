import React, { useEffect, useState } from 'react';

import '../css/register.css';
import Footer from '../components/Footer.js';

import axios from "axios";
import $ from 'jquery';
import AOS from "aos";
import 'aos/dist/aos.css';
import DaumPostcode from 'react-daum-postcode';


const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const [memberPw, setMemberPw] = useState(''); // 비밀번호 상태 추가
    const [memberPwOk, setMemberPwOk] = useState(''); // 비밀번호 확인 상태 추가
    // 이메일 상태 추가
    // const [memberEmail, setMemberEmail] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const passwordChk = () => {
        if (memberPw.length < 6) {
            alert("비밀번호를 6글자 이상으로 입력해 주세요!");
        } else if (memberPw !== memberPwOk) {
            alert("비밀번호가 일치하지 않습니다.");
        } else {
            reqMem();
        }
    };
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        // 이메일 형식 검사
        if (newEmail.trim() === '') {
            setErrorMessage('이메일을 입력해 주세요!');
        } else if (!isValidEmail(newEmail)) {
            setErrorMessage('올바른 이메일 형식이 아닙니다!');
        } else {
            setErrorMessage('');
        }
    };

    const isValidEmail = (value) => {
        // 간단한 이메일 형식 정규표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    // 주소 Api
    const [modalState, setModalState] = useState(false);
    const [inputAddressValue, setInputAddressValue] = useState('');
    const [inputZipCodeValue, setInputZipCodeValue] = useState('');

    const handleAdressSearch = () => {
        // 주소 검색 버튼 클릭 이벤트에 대한 로직 추가
        setModalState(true); // 주소 검색 모달 열기
    };
    const postCodeStyle = {
        width: '400px',
        height: '400px',
        display: modalState ? 'block' : 'none',
    };
    const onCompletePost = (data) => {
        setModalState(false);
        if (data) {
            setInputAddressValue(data.address || '');
            setInputZipCodeValue(data.zonecode || '');
            $(".adr1").val(data.zonecode); // 우편번호 데이터 저장
            $(".adr2").val(data.address); // 주소 데이터 저장
        }
    };

    // 이용약관 toggle
    const [isCollapsedOne, setIsCollapsedOne] = useState(true);
    const [isCollapsedTwo, setIsCollapsedTwo] = useState(true);
    const [isCollapsedThree, setIsCollapsedThree] = useState(true);
    const [isCollapsedFour, setIsCollapsedFour] = useState(true);
    const toggleText = (accordionNumber) => {
        switch (accordionNumber) {
            case 1:
                setIsCollapsedOne(!isCollapsedOne);
                break;
            case 2:
                setIsCollapsedTwo(!isCollapsedTwo);
                break;
            case 3:
                setIsCollapsedThree(!isCollapsedThree);
                break;
            case 4:
                setIsCollapsedFour(!isCollapsedFour);
                break;
            default:
                break;
        }
    };

    const reqMem = async () => {
        const data = {
            userid: $("#id").val(),
            password: $("#password01").val(),
            email: $("#email").val(),
            name: $("#name").val(),
            bir: $(".birthDay").val(),
            addr1: $("#memberAdr2").val(),
            addr2: $("#memberAdr3").val(),
        };

        try {
            const res = await axios.post("/api/signUp", data);
            console.log(res.data);

            if (res.data === 1) {
                // 회원가입 되었을때
                alert("회원가입 되었습니다.");
                window.location.href = "/login";
            } else {
                alert("회원가입에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            console.log(data);
            alert("오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <a href="/">
                <img className="register_logo" src="../images/sign_up_logo.png" alt="반려동물사진관_로그인_로고이미지"/>
            </a>
            <br/>
            <p className="logo_text">회원가입</p>
            <div className="register container right-panel-active" data-aos="zoom-in" data-aos-duration="2500">
                <img className="bg" src="../images/sign_dog.png" alt=""/>
                <input className="button" type="submit" value="친구하기" onClick={passwordChk}/>
                <div className="signup">
                    {/*<form>*/}
                        <div className="text1">
                            <div className="signup-box">
                                <label htmlFor="id">
                                    *아이디 <br/>
                                    <input className="bar" type="text" name="id" id="id" autoComplete="on"
                                           placeholder="아이디를 입력해주세요" style={{width: "430px"}} required/>
                                </label><br/>

                                *비밀번호<br/>
                                <input className="bar" type="password" name="password01" id="password01" value={memberPw} onChange={(e) => setMemberPw(e.target.value)}
                                       placeholder="비밀번호를 입력해 주세요" style={{width: "430px"}} required/><br/>
                                *비밀번호 확인<br/>
                                <input className="bar" type="password" name="password02" id="password02" value={memberPwOk} onChange={(e) => setMemberPwOk(e.target.value)}
                                       placeholder="비밀번호를 다시 입력해주세요" style={{width: "430px"}} required/><br/>
                                <label htmlFor="email">
                                    *이메일<br/>
                                    <input className="bar" type="email" name="email" id="email" style={{width: "430px"}}
                                           autoComplete="on" value={email} onChange={handleEmailChange} placeholder="  이메일을 입력해 주세요!" required/>
                                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                                </label><br/>
                                *이름<br/>
                                <input className="bar" type="text" name="name" id="name" style={{width: "430px"}}
                                       placeholder="이름을 입력해 주세요" required/>
                            </div>
                            <br/>
                            <label htmlFor="birthDay">*생년월일</label>
                            <input size="30" type="date" className="birthDay" name="birthDay" min="1900-01-01" max="2099-12-31" required/>

                            <div className="gender">
                                <input type="radio" name="chk_gender" value="남자"/>남자
                                <input type="radio" name="chk_gender" value="여자"/>여자
                            </div>

                            <div className="join_text">
                                {/*회원가입: Daum 다음 카카오 주소 API연동 소스(시작)*/}
                                *주소<br/>
                                <input type="text" className="adr1" id="memberAdr1" placeholder="우편번호"/><br></br>

                                {modalState &&
                                    <div className='daumAPI'>
                                        <button className='daumAPI_bt' onClick={() => setModalState(false)}>닫기</button>
                                        <DaumPostcode
                                            style={postCodeStyle}
                                            onComplete={onCompletePost}
                                        ></DaumPostcode>
                                    </div>
                                }
                                <button className="address_btn" onClick={handleAdressSearch}>우편번호 찾기</button><br></br>

                                <input type="text" className="adr2" id="memberAdr2" placeholder="주소"/><br></br>
                                <input type="text" className="adr3" id="memberAdr3" placeholder="상세 주소"/>
                            </div>
                        </div>
                    {/*</form>*/}
                    *필수 입력사항<br/>
                    <div className="text2">
                        <p className="title">[필수] 홈페이지 이용약관</p>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className={`accordion-button ${isCollapsedOne ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <label><input type="checkbox" required onClick={() => toggleText(1)}/> 홈페이지 이용약관</label>
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className={`accordion-collapse collapse ${isCollapsedOne ? '' : 'show'}`}
                                     aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">제1조(목적) 이 약관은 반려동물사진관(이하 "회사"라 한다.)이 운영하는 인터넷 홈페이지(이하"홈페이지라 한다.) 에서 제공하는 인터넷 관련 서비스(이하"서비스"라한다)를 이용함에 있어 홈페이지와 이용자의 권리ㆍ의무 및 책임, 기타 제반 사항의 규정을 목적으로 합니다.<br/></div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className={`accordion-button ${isCollapsedTwo ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <label><input type="checkbox" required onClick={() => toggleText(2)}/> 개인정보 수집 및 이용 동의</label>
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className={`accordion-collapse collapse ${isCollapsedTwo ? '' : 'show'}`}
                                     aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">A PET PHOTO STUDIO 주식회사 서비스 이용을 위해 아래와 같이 개인정보를 수집 ・ 이용합니다.고객님께서는 동의를 거부할 권리가 있으며, 동의 거부 시 A PET PHOTO STUDIO 주식회사 서비스 이용이 불가합니다.</div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className={`accordion-button ${isCollapsedThree ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <label><input type="checkbox" required onClick={() => toggleText(3)}/> 통합 서비스 이용 약관</label>
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className={`accordion-collapse collapse ${isCollapsedThree ? '' : 'show'}`}
                                     aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <b>제1장<br/>
                                            총칙 제1조 (목적)</b><br/>
                                        A PET PHOTO STUDIO 주식회사(이하 "회사"라 합니다)는 회사가 제공하는 서비스에 대한 약관(이하 '본 약관'이라 합니다)을 마련하였습니다. 본 약관은 회사와 서비스 이용자의 권리와 의무, 책임관계, 기타 필요한 사항을 규정하고 있습니다.</div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <p className="title">[선택] 마케팅 활용 동의/철회</p>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingFour">
                                    <button className={`accordion-button ${isCollapsedFour ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                        <label><input type="checkbox" onClick={() => toggleText(4)}/> 마케팅 활용 동의/철회</label>
                                    </button>
                                </h2>
                                <div id="flush-collapseFour" className={`accordion-collapse collapse ${isCollapsedFour ? '' : 'show'}`}
                                     aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">상품 소개 및 홍보, 영리목적 광고성 정보, 이벤트 및 혜택 등 다양한 정보를 전화, 이메일, 문자/전자적수단, 앱 등으로 알림을 받아보실 수 있습니다. 마케팅정보 수신 및 활용 동의 여부와 관계없이 회원가입 및 서비스를 시용하실 수 있습니다. 또한 서비스의 중요안내사항에 대한 정보는 마케팅 정보 수신 동의 여부와 관계없이 발송됩니다.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;