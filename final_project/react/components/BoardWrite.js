import React, { useState, useEffect, useRef } from 'react';
import Navi from './Navi';
import axios from 'axios';
import qs from 'qs';
import $ from 'jquery'; // jQuery import 추가
import '../css/boardwrite.css';

const WriteContent = () => {
  const [memberId, setMemberId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // 새로운 state 변수 추가 - 카테고리 선택
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
        $(".writerId").val(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const showImage = (e) => {
    setImg(imgRef.current.files[0] );
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setImgFile(reader.result);
    }
  }

  // 글 등록 요청 함수
  const handleWriteSubmit = async () => {
    try {
      const frm = new FormData();
      if (img) {
        frm.append("uploadImg",img);
        frm.append("mem_id", memberId);
        frm.append("title", $(".input-title").val());
        frm.append("desc", $(".input-desc").val());
        frm.append("category", category);
        await axios.post("/api/boardWrite",frm)
        .then(res => {
          console.log(res);
        });
        // 작성 완료 안내 팝업창
        alert('글이 성공적으로 작성되었습니다.');
        window.location.href="/board";
      } else {
        frm.append("mem_id", memberId);
        frm.append("title", $(".input-title").val());
        frm.append("desc", $(".input-desc").val());
        frm.append("category", category);
        await axios.post("/api/boardWriteNoFile", frm)
        .then(res => {
          console.log(res);
        });
        alert('글이 성공적으로 작성되었습니다.');
        window.location.href="/board";
      }
    } catch (error) {
      console.error('글 작성에 실패했습니다:', error);
      // 실패 시 에러 메시지 팝업창
      alert('글 작성에 실패했습니다.');
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div><Navi />
        <div className="board">
            <h2>글 작성하기</h2>
        
            <label>작성자 ID  </label>
            <input type="text1" className='writerId' readOnly />

            <select className='category' value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">카테고리를 선택하세요</option>
              <option value="반려견자랑">반려견 자랑</option>
              <option value="동물병원추천">동물병원 추천</option>
              <option value="애견카페추천">애견카페 추천</option>
            </select>

            <input type="text2" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)}  className='input-title'/> 

            <textarea placeholder="내용" value={description} onChange={(e) => setDescription(e.target.value)} className='input-desc'/>

            <div className="input-container">
                <input id="imageInput" type="file" accept="image/*" className="input-imageName1" onChange={showImage} ref={imgRef}/> 
            </div>

            <div className="button-container">
                <button onClick={handleWriteSubmit}>작성 완료</button>
                <button onClick={() => window.location.href="/board"}>취소</button>
            </div>
            
        </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <WriteContent />
    </div>
  );
};

export default App;