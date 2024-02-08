import React, { useEffect, useState, useRef } from "react";
import { select } from './select';
import axios from 'axios';
import Navi from './Navi';
import $ from 'jquery';
import '../css/gat_make.css';

function App() {
  const [memberId, setMemberId] = useState('');
  const [mn_title, setMnTitle] = useState('');
  const [mn_textarea, setMnTextarea] = useState('');
  const [imgFile, setImgFile] = useState("");
  const [img, setImg] = useState("");
  const imgRef = useRef();

  // 세션 요청 함수
  const getSession = async () => {
    try {
      await axios.post("/api/getSession")
      .then(res => {
        if (res.data === '') {
          window.location.href="/board";
        }
        setMemberId(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // 이미지 세팅
  const showImage = (e) => {
    setImg(imgRef.current.files[0]);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'mn_title') {
      setMnTitle(value);
    } else if (name === 'mn_textarea') {
      setMnTextarea(value);
    }
  };

  // 모임 등록 요청 함수
  const createMeeting = async () => {
    if (mn_title.length < 2) {
      alert('모임명은 2글자 이상 입력해야합니다.');
    } else if (mn_textarea.length < 10) {
      alert('모임내용은 10글자 이상 입력해야합니다.');
    } else if (img) {
      try {
        const frm = new FormData();
        frm.append("uploadImg", img);
        frm.append("mem_id", memberId);
        frm.append("title", $(".mn_title").val());
        frm.append("desc", $(".mn_textarea").val());
        frm.append("location1", $("#sido1").val());
        frm.append("location2", $("#gugun1").val());
        await axios.post("/api/makeGat", frm)
        .then(res => {
          if (res.data === 1) {
            alert("모임 생성을 성공했습니다.");
            window.location.href = "/gat_home";
          } else {
            alert("모임 생성에 실패했습니다. 다시 시도해주세요.");
            window.location.href = "/gat_home";
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const frm = new FormData();
        frm.append("mem_id", memberId);
        frm.append("title", $(".mn_title").val());
        frm.append("desc", $(".mn_textarea").val());
        frm.append("location1", $("#sido1").val());
        frm.append("location2", $("#gugun1").val());
        await axios.post("/api/makeGatNoFile", frm)
        .then(res => {
          if (res.data === 1) {
            alert("모임 생성을 성공했습니다.");
            window.location.href = "/gat_home";
          } else {
            alert("모임 생성에 실패했습니다. 다시 시도해주세요.");
            window.location.href = "/gat_home";
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    select();
    getSession();
  }, []);

  return (
    <div>
        <Navi />
      <div className='meeting'>
        <div className="meeting-table">
        <h2 className='mn_table_title'>모임 만들기</h2>
          <div>
            <div className='meeting-title'>모임명</div>
              <input 
                className='mn_title' 
                type='text' 
                name='mn_title' 
                value={mn_title}
                onChange={handleInputChange}>
              </input>
          </div>
          <div className='meeting-area'>모임 지역</div>
          <div>            
            <select className='selectbox'  name="sido1" id='sido1'></select>
            <select className='selectbox2'  name="gugun1" id='gugun1'></select>
          </div>
          <div>
            <div className='meeting-content'>모임 내용 
              <div>
                <textarea
                  className='mn_textarea' 
                  name='mn_textarea' 
                  value={mn_textarea}
                  onChange={handleInputChange}>
                </textarea>
              </div>
            </div>
          </div>
          <div className='mn_img'>모임 이미지</div>
          <div className="input-container">
                <input id="imageInput" type="file" accept="image/*" className="input-imageName1" onChange={showImage} ref={imgRef}/> 
          </div>
          <div className='mn_btn'>
            <button className='mn_btn1' onClick={createMeeting} >만들기</button>
            <button className='mn_btn1' onClick={() => {window.location.href = "/gat_home"}}>뒤로가기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
