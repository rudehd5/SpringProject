import React, { useEffect, useState  } from "react";

import Button from "react-bootstrap/Button";
import { Input } from "reactstrap";
import AOS from "aos";
import '../css/aos.css'
import DaumPostcode from 'react-daum-postcode';
import $ from 'jquery';
import axios from "axios";
// import qs from "qs";
import Navi from './Navi';
import Foot from './Foot';
import '../css/sign-up.css';


const Sign_up = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    });

    const [memberId, setMemberId] = useState(''); // 아이디 상태 추가
    const [memberPw, setMemberPw] = useState(''); // 비밀번호 상태 추가
    const [memberPwOk, setMemberPwOk] = useState(''); // 비밀번호 확인 상태 추가
    // 이메일 상태 추가
    const [memberEmail, setMemberEmail] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [memberName, setMemberName] = useState(''); // 이름 상태 추가
    const [memberPhone, setMemberPhone] = useState(''); // 휴대폰 번호 상태 추가
    const [memberNickname, setMemberNickname] = useState(''); // 닉네임 상태 추가
    const [birthDay, setBirthDay] = useState(''); // 생년월일 상태 추가

    const handleMemberIdChange = (event) => {
        const newMemberId = event.target.value;
        setMemberId(newMemberId);
    };
    // const handleMemberIdBlur = () => {
    //     if (memberId.trim() === '') {
    //       alert('아이디를 입력해 주세요!');
    //     }
    // };

    const passwordChk = () => {
        if (memberId.trim() === '') {
            alert('아이디를 입력해 주세요!');
        } else if (memberPw.length < 6) {
            alert("비밀번호를 6글자 이상으로 입력해 주세요!");
        } else if (memberPw !== memberPwOk) {
            alert("비밀번호가 일치하지 않습니다.");
        } else if (!isValidEmail(email)) {
            alert("올바른 이메일 형식이 아닙니다!");
        } else if (memberName.length < 1) {
            alert('이름을 입력해 주세요!');
        } else if (memberPhone.length < 1) {
            alert('휴대폰 번호를 입력해 주세요!');
        } else if (memberNickname.length < 1) {
            alert('닉네임을 입력해 주세요!');
        } else if (memberNickname.length > 10) {
            alert('닉네임을 10자리 이하로 작성해주세요!');
        } else if (birthDay.length < 1) {
            alert('생년월일을 입력해 주세요!');
        } else if (!inputZipCodeValue || !inputAddressValue) {
            alert("주소를 입력해 주세요!");
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
    const handleIdChange = (e) => setMemberId(e.target.value); // 아이디 상태 추가
    const handlePwChange = (e) => setMemberPw(e.target.value); // 비밀번호 상태 추가
    const handlePwOkChange = (e) => setMemberPwOk(e.target.value); // 비밀번호 확인 상태 추가
    const memberEmailChange = (e) => setMemberEmail(e.target.value); // 이메일 상태 추가
    const memberNameChange = (e) => setMemberName(e.target.value); // 이름 상태 추가
    const memberPhoneChange = (e) => setMemberPhone(e.target.value); // 휴대폰 번호 상태 추가
    const memberNicknameChange = (e) => setMemberNickname(e.target.value); // 닉네임 상태 추가
    const birthDayChange = (e) => setBirthDay(e.target.value); // 생년월일 상태 추가
    
    const handleAdressSearch = () => {
      // 주소 검색 버튼 클릭 이벤트에 대한 로직 추가
      setModalState(true); // 주소 검색 모달 열기
    };
    
    const reqMem = async () => {
      const data = {
        mem_id: $("#memberId").val(),
        mem_pw: $("#memberPw").val(),
        mem_email: $("#memberEmail").val(),
        mem_name: $("#memberName").val(),
        mem_num: $("#memberPhone").val(),
        mem_nname: $("#memberNickname").val(),
        mem_bir: $(".birthDay").val(),
        mem_addr1: $("#memberAdr2").val(),
        mem_addr2: $("#memberAdr3").val(),
      };
    
      try {
        const res = await axios.post("/api/signUp", data);
        console.log(res.data);
    
        if (res.data == 1) {
          // 회원가입 되었을때
          alert("회원가입 되었습니다.");
          window.location.href = "/Login";
        } else {
          alert("회원가입에 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("오류가 발생했습니다.");
      }
    };
    
    return (
      <div className="container_signup">
        <div><Navi /></div>
        <div className="join_table" data-aos="zoom-in">
            <div className="background2">
                <div className="join_header">
                    <p className="joinText">회원가입</p>
                </div>
                <div className="join_id">
                {/* onBlur={handleMemberIdBlur} */}
                *아이디<Input type="text" id="memberId" placeholder="아이디를 입력해 주세요!" onChange={handleMemberIdChange} />
                </div>
                <div className="join_pw">
                *비밀번호<Input type="password" id="memberPw" value={memberPw} onChange={(e) => setMemberPw(e.target.value)} placeholder="비밀번호를 입력해 주세요!" />
                </div>
                <div className="join_pw_ok">
                *비밀번호 확인<Input type="password" id="memberPwOk" value={memberPwOk} onChange={(e) => setMemberPwOk(e.target.value)} placeholder="비밀번호를 다시 입력해 주세요!" />
                </div>
                <div className="join_email">
                    *이메일<Input type="text" id="memberEmail" placeholder="이메일을 입력해 주세요!" value={email} onChange={handleEmailChange} />
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                </div>
                <div className="join_name">
                    *이름<Input type="text" id="memberName" onChange={(e) => setMemberName(e.target.value)} placeholder="이름을 입력해 주세요!" />
                </div>
                <div className="join_phone">
                    *휴대폰 번호<Input type="text" id="memberPhone" onChange={(e) => setMemberPhone(e.target.value)} placeholder="휴대폰 번호를 입력해 주세요!" />
                </div>
                <div className="join_nickname">
                    *닉네임<Input type="text" id="memberNickname" onChange={(e) => setMemberNickname(e.target.value)} placeholder="닉네임을 입력해 주세요!" />
                </div>
                <div className="join_birthDay">
                    <label htmlFor="birthDay">*생년월일</label>
                    <Input size="30" type="date" className="birthDay" onChange={(e) => setBirthDay(e.target.value)} min="1900-01-01" max="2099-12-31" required />
                </div>
                <div className="gender">
                <Input type="radio" className="chk_gender" value="남자" />남자
                <Input type="radio" className="chk_gender" value="여자" />여자
                </div>
                <div className="join_text">
                    *주소<br></br>
                    <Input type="text" className="adr1" id="memberAdr1" placeholder="우편번호"/><br></br>

                    {modalState &&
                      <div className='daumAPI'>
                        <button className='daumAPI_bt' onClick={() => setModalState(false)}>닫기</button>
                        <DaumPostcode
                        style={postCodeStyle}
                        onComplete={onCompletePost}
                        ></DaumPostcode>
                      </div>
                    }
                    <Button className="address_btn" onClick={handleAdressSearch}>우편번호 찾기</Button><br></br>

                    <Input type="text" className="adr2" id="memberAdr2" placeholder="주소"/><br></br>
                    <Input type="text" className="adr3" id="memberAdr3" placeholder="상세 주소"/>
                </div>
                <div className="btn_start">
                    <Button className="Join_btn" id="id_btn" variant="light" size="lg-3" 
                                    style={{ whiteSpace: 'nowrap', margin: '0 auto', border: '1px solid gray', padding:'7px 15px'}} onClick={passwordChk}>Join</Button>
                </div>
            </div>
        </div>
        <Foot />
      </div>
    );
  };
  
  export default Sign_up;