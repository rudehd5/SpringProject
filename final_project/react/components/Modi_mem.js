import React, { useState, useEffect } from 'react';
import Navi from './Navi';
import Footer from './Foot';
import AOS from "aos";
import $ from 'jquery';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import '../css/modi_mem.css';

const Modi_mem = () => {

    const [mem, setMem] = useState([]);
    // 다음 주소 API
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        AOS.init({ duration: 2000 });
        getMem();
    },[]);

    // 다음 주소 API
    const postCodeStyle = {
        width: '400px',
        height: '400px',
        display: visible ? 'block' : 'none',
    };  

    // 다음 주소 API
    const onCompletePost = (data) => {
        setVisible(false);
        if (data) {
            $(".md_new_addr1").val(data.address); // 주소 데이터 저장
        }
    };

    // 다음 주소 API
    const handleAdressSearch = () => {
        // 주소 검색 버튼 클릭 이벤트에 대한 로직 추가
        setVisible(true); // 주소 검색 모달 열기
    };

    async function getMem() {
        const res = await (await axios.get("/api/view_mem")).data;
        setMem(res);
    }

    const change_pw_api = async () => {
        const data = {
            oldPw : $(".md_old_pw").val(),
            newPw1 : $(".md_new_pw").val(),
            newPw2 : $(".md_new_pw_check").val()
        };
        const res = await axios.post("/api/modiPw", data);
        console.log(res.data);
        if (res.data === -1) {
            alert("입력하신 현재 비밀번호가 틀립니다.");
            return false;
        } else if (res.data === 0) {
            alert("입력하신 새 비밀번호가 다릅니다.");
            return false;
        } else {
            alert("비밀번호 변경 성공! 다시 로그인 해주세요.");
            window.location.href = "/logout";
        }
    }

    const change_nname_api = async () => {
        const data = {
            newNname : $(".md_new_nname").val(),
        };
        const res = await axios.post("/api/modiNn", data);
        console.log(res.data);
        if (res.data == 0) {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            alert("닉네임 변경에 성공했습니다.");
            window.location.href = "/view_mem";
        }
    }

    const change_num_api = async () => {
        const data = {
            newNum : $(".md_new_num").val(),
        };
        const res = await axios.post("/api/modiNum", data);
        console.log(res.data);
        if (res.data == 0) {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            alert("전화번호 변경에 성공했습니다.");
            window.location.href = "/view_mem";
        }
    }

    const change_addr_api = async () => {
        const data = {
            newAddr1 : $(".md_new_addr1").val(),
            newAddr2 : $(".md_new_addr2").val(),
        };
        if (data.newAddr1 !== '' && data.newAddr2 !== '') {
            const res = await axios.post("/api/modiAddr", data);
            console.log(res.data);
            if (res.data == 0) {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("주소 변경에 성공했습니다.");
                window.location.href = "/view_mem";
            }
        } else {
            alert("주소를 모두 입력해주세요.");
            return false;
        }
    }

    const change_email_api = async () => {
        const data = {
            newEmail : $(".md_new_email").val(),
        };
        const res = await axios.post("/api/modiEamil", data);
        console.log(res.data);
        if (res.data == 0) {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            alert("이메일 변경에 성공했습니다.");
            window.location.href = "/view_mem";
        }
    }

    // 이메일 형식 검사
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
  
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

    const change_pw = () => {
        $(".md_check_menu").css("display","none");
        $(".md_change_pw").css("display","flex").hide().fadeIn(1500);
    }
    const change_email = () => {
        $(".md_old_email").val(mem.mem_email);
        $(".md_check_menu").css("display","none");
        $(".md_change_email").css("display","flex").hide().fadeIn(1500);
    }
    const change_nname = () => {
        $(".md_old_nname").val(mem.mem_nname);
        $(".md_check_menu").css("display","none");
        $(".md_change_nname").css("display","flex").hide().fadeIn(1500);
    }
    const change_addr = () => {
        $(".md_old_addr").val(mem.mem_addr1 + " " + mem.mem_addr2);
        $(".md_check_menu").css("display","none");
        $(".md_change_addr").css("display","flex").hide().fadeIn(1500);
    }
    const change_num = () => {
        $(".md_old_num").val(mem.mem_num);
        $(".md_check_menu").css("display","none");
        $(".md_change_num").css("display","flex").hide().fadeIn(1500);
    }
    
    const back_pw = () => {
        $(".md_change_pw").css("display","none");
        $(".md_check_menu").css("display","flex").hide().fadeIn(1500);
    }
    const back_email = () => {
        $(".md_change_email").css("display","none");
        $(".md_check_menu").css("display","flex").hide().fadeIn(1500);
    }
    const back_nname = () => {
        $(".md_change_nname").css("display","none");
        $(".md_check_menu").css("display","flex").hide().fadeIn(1500);
    }
    const back_addr = () => {
        $(".md_change_addr").css("display","none");
        $(".md_check_menu").css("display","flex").hide().fadeIn(1500);
    }
    const back_num = () => {
        $(".md_change_num").css("display","none");
        $(".md_check_menu").css("display","flex").hide().fadeIn(1500);
    }

    return (
        <div className="App">
            <Navi />
            <div className='md_container' data-aos="zoom-in">
                <div className="md_check_menu">
                    <div className='md_ch_bt' id='md_ch_pw' onClick={change_pw}>비밀번호 변경</div>
                    <div className='md_ch_bt' id='md_ch_email' onClick={change_email}>이메일 변경</div>
                    <div className='md_ch_bt' id='md_ch_nname' onClick={change_nname}>닉네임 변경</div>
                    <div className='md_ch_bt' id='md_ch_addr' onClick={change_addr}>주소 변경</div>
                    <div className='md_ch_bt' id='md_ch_num' onClick={change_num}>전화번호 변경</div>
                </div>
                <div className='md_change_pw'>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>현재 비밀번호</span>
                        <input type='text' className='md_old_pw'></input>
                    </div>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>새 비밀번호</span>
                        <input type='text' className='md_new_pw'></input>
                    </div>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>새 비밀번호 확인</span>
                        <input type='text' className='md_new_pw_check'></input>
                    </div>
                    <div className='md_bts'>
                        <button onClick={change_pw_api}>변경</button>
                        <button onClick={back_pw}>뒤로가기</button>
                    </div>
                </div>
                <div className='md_change_email'>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>현재 이메일</span>
                        <input type='text' className='md_old_email' readOnly></input>
                    </div>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>새로운 이메일</span>
                        <input type='text' className='md_new_email' onChange={handleEmailChange}></input>
                        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    </div>
                    <div className='md_bts'>
                        <button onClick={change_email_api}>변경</button>
                        <button onClick={back_email}>뒤로가기</button>
                    </div>
                </div>
                <div className='md_change_nname'>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>현재 닉네임</span>
                        <input type='text' className='md_old_nname' readOnly></input>
                    </div>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>새로운 닉네임</span>
                        <input type='text' className='md_new_nname'></input>
                    </div>
                    <div className='md_bts'>
                        <button onClick={change_nname_api}>변경</button>
                        <button onClick={back_nname}>뒤로가기</button>
                    </div>
                </div>
                <div className='md_change_addr'>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>현재 주소</span>
                        <input type='text' className='md_old_addr' readOnly></input>
                    </div>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>새로운 주소</span>
                        <input type='text' className='md_new_addr1' readOnly></input>
                        {visible &&
                            <div className='daumAPI'>
                                <button className='daumAPI_bt' onClick={() => setVisible(false)}>닫기</button>
                                <DaumPostcode
                                style={postCodeStyle}
                                onComplete={onCompletePost}
                                ></DaumPostcode>
                            </div>
                        }
                        <button className='md_addr_api' onClick={handleAdressSearch}>주소 검색</button>
                    </div>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>상세 주소</span>
                        <input type='text' className='md_new_addr2'></input>
                    </div>
                    <div className='md_bts'>
                        <button onClick={change_addr_api}>변경</button>
                        <button onClick={back_addr}>뒤로가기</button>
                    </div>
                </div>
                <div className='md_change_num'>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>현재 전화번호</span>
                        <input type='text' className='md_old_num' readOnly></input>
                    </div>
                    <div className='md_col_box'>
                        <span className='md_input_tag'>새로운 전화번호</span>
                        <input type='text' className='md_new_num'></input>
                    </div>
                    <div className='md_bts'>
                        <button onClick={change_num_api}>변경</button>
                        <button onClick={back_num}>뒤로가기</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Modi_mem;