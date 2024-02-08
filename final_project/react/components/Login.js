import '../css/login.css';  // 해당 CSS 파일 import
import React, { useState, useEffect } from 'react';
import $ from 'jquery'
import Navi from './Navi';
import Foot from './Foot';
import axios from 'axios';
import qs from 'qs';
import Session from 'react-session-api';
import AOS from "aos";
import { Modal, Button, Form } from 'react-bootstrap'


function App() {
  const [res, setRes] = useState(0);
  const [inputNewPw, setInputNewPw] = useState('');
  const [inputNewPw2, setInputNewPw2] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userInputCode, setUserInputCode] = useState('');

  useEffect(() => {
    AOS.init({ duration: 2000 });
  });

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  const reqApiLogin = async () => {
    const res = await (await axios.post("/api/login", {
        id:$("#input-id").val(),
        pw:$("#input-pw").val(),
    })).data;
    setRes(res);
    if (res == 0) {
      alert("존재하지 않는 아이디입니다.");
      return false;
    } else if (res == -1) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      Session.set("id", $("#input-id").val());
      document.location.href="/";
    }
  }

  const [response, setResponse] = useState(null);
  const sendEmail = async () => {
    console.log('sendEmail function is called!');
    try {
      const response = await axios.get('/api/email', {
        params: {
          id: id,
          name: name,
          email: email,
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'brackets' });
        },
      });

      console.log(response.data.code); // 서버에서의 응답 확인
      console.log(response.data.res); // 서버에서의 응답 확인

      setResponse(response);
      
      if (response.data.res === '0') {
        // 아이디가 존재하지 않는 경우
        console.log('입력하신 정보가 존재하지 않습니다.');
        alert('입력하신 정보가 존재하지 않습니다.');
      }else if(response.data.res === '-1'){
        alert('이메일 발송에 실패했습니다.');
      }
      else {
        // 모두 일치하는 경우
        console.log('이메일이 발송되었습니다.');
        handleShow(); // 모달 열기
        // const userInputCode = prompt('이메일로 받은 인증 코드를 입력하세요:');
        // if (userInputCode === response.data.code) {
        //   // 검증 성공
        //   console.log('인증 성공');
        //   change_view3();
        // } else {
        //   // 검증 실패
        //   console.log('인증 실패');
        //   alert('인증 코드가 올바르지 않습니다. 새로운 인증코드를 받아서 입력해주세요');
        // }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // 서버 에러 또는 다른 이유로 이메일 발송이 실패한 경우
      alert('이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleVerification = () => {
    // 인증 확인 로직
    if (response && response.data && userInputCode === response.data.code) {
      console.log('인증 성공');
      change_view3();
      handleClose(); // 모달 닫기
    } else {
      console.log('인증 실패');
      alert('인증 코드가 올바르지 않습니다. 새로운 인증코드를 받아서 입력해주세요');
    }
  };

  const change_pw = async () => {
    const data = {
      id : id,
      newPw : $("#inputNewPw").val(),
    }
    const res = await axios.post("/api/login/changePw", data);
    console.log(res.data);

    if (res.data === 0) {
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    } else {
      alert("비밀번호 변경에 성공했습니다 !");
    }
    window.location.href = '/login';
  }

  function change_view1() {
    $(".forgot-pw").fadeOut(500, () => {
      $(".find-pw").slideDown(1000);
    });
    $(".login-view").slideUp(500, () => {
      $(".go-login").fadeIn(1000);
    });
  }

  function login_check() {
    let id_length = $("#input-id").val().length;
    let pw_length = $("#input-pw").val().length;
    if (id_length < 1) {
      alert("아이디를 입력해주세요.");
      return false;
    }
    if (pw_length < 1) {
      alert("비밀번호를 입력해주세요.");
      return false;
    } else {
      reqApiLogin();
    }
  }

  function find_pw_check() {
    let id_length = $("#find_pw_id").val().length;
    let name_length = $("#find_pw_name").val().length;
    let email_length = $("#find_pw_email").val().length;
    if (id_length < 1) {
      alert("아이디를 입력해주세요.");
      return false;
    }
    if (name_length < 1) {
      alert("이름을 입력해주세요.");
      return false;
    }
    if (email_length < 1) {
      alert("이메일을 입력해주세요.");
      return false;
    } else {
      sendEmail();
    }
  }

  function change_view2() {
    $(".find-pw").slideUp(500, () => {
      $(".forgot-pw").fadeIn(1000);
    });
    $(".go-login").fadeOut(500, () => {
      $(".login-view").slideDown(1000);
    });
  }

  function change_view3() {
    $(".find-pw").fadeOut(500, () => {
      $(".change-pw").fadeIn(1000);
    });
  }

  const keyPress = (a) =>{
    if (a.key === 'Enter'){
      login_check();
    }
  };

  return (
    <div className='App'>
      <Navi />
      <div className='lg_container' data-aos="zoom-in">
        <div className='real-container'>
          <div className='left-view'>
            <div className='forgot-pw'>
              <button className='btn1' onClick={change_view1}>비밀번호를 잃어버리셨습니까?</button>
            </div>
            <div className='find-pw'>
              <div className='title'>
                비밀번호 찾기
              </div>
              <div className='input-id'>
                <input type="text" placeholder='아이디' className='input' id='find_pw_id' onChange={(e) => setId(e.target.value)}></input>
              </div>
              <div className='input-name'>
                <input type="text" placeholder='이름' className='input' id='find_pw_name' onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className='input-email'>
                <input type="email" placeholder='이메일' className='input' id='find_pw_email' onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div className='sbm'>
                <input className='btn2' type="button" value="다음" onClick={find_pw_check}></input>
              </div>
            </div>
            <div className='change-pw'>
              <div className='title2'>
                비밀번호 변경
              </div>
              <div className='input-newpw'>
                <input type="password" placeholder='새로운 비밀번호' className='input' id='inputNewPw'
                value={inputNewPw}
                onChange={(e) => setInputNewPw(e.target.value)}
                ></input>
              </div>
              <div className='input-newpw2'>
                <input type="password" placeholder='한번더 입력해주세요' className='input'
                value={inputNewPw2}
                onChange={(e) => setInputNewPw2(e.target.value)}
                ></input>
              </div>
              <div className='sbm'>
                <input className='btn2' type="button" value="확인" onClick={change_pw}></input>
              </div>
            </div>
          </div>
          <div className='right-view'>
            <div className='go-login'>
              <button className='btn2' onClick={change_view2}>로그인 하러가기</button>
            </div>
            <div className='login-view'>
              <div className='title'>
                방문을 환영합니다.
              </div>
              <div className='input-id'>
                <input type="text" placeholder='아이디' className='input' id='input-id'></input>
              </div>
              <div className='input-pw'>
                <input type="password" placeholder='비밀번호' className='input' id='input-pw' onKeyDown={keyPress}></input>
              </div>
              <div className='go-sign-up'>
                <a href='/sign_up'>회원가입 하러가기</a>
              </div>
              <div className='sbm'>
                <input className='btn1' type="button" value="로그인" onClick={login_check}></input>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>이메일 인증</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>이메일로 받은 인증 코드를 입력하세요:</p>
          <Form.Control
            type='text'
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleVerification}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>

      <Foot />
    </div>
  );
}

export default App;
