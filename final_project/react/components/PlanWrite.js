import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import Navi from './Navi';
import $ from 'jquery';
import DaumPostcode from 'react-daum-postcode';
import '../css/planwrite.css';

function App() {
  // 쿼리스트링 값
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  // 주소 Api
  const [modalState, setModalState] = useState(false);
  
  const postCodeStyle = {
      width: '400px',
      height: '400px',
      display: modalState ? 'block' : 'none',
  };  

  const onCompletePost = (data) => {
      setModalState(false);
      if (data) {
          $("#pw_addr1").val(data.address); // 주소 데이터 저장
      }
  };

  const handleAdressSearch = () => {
    // 주소 검색 버튼 클릭 이벤트에 대한 로직 추가
    setModalState(true); // 주소 검색 모달 열기
  };

  const handleWriteSubmit = async () => {
    try {
      const data = {
        gat_id:id,
        plan_date:$("#pw_date").val(),
        plan_addr:`${$("#pw_addr1").val()} ${$("#pw_addr2").val()}`,
        plan_title:$("#pw_title").val(),
        plan_desc:$("#pw_desc").val(),
      }
      await axios.post("/api/addPlan", data)
      .then(res => {
        console.log(res.data);
        if (res.data === 1) {
          alert("계획을 생성하였습니다.");
          window.location.href = `/gat_view?id=${id}`;
        } else {
          alert("계획 생성에 실패했습니다.");
          window.location.href = `/gat_view?id=${id}`;
        }
      });
    } catch (error) {
      alert("계획 등록 중 오류가 발생했습니다 !");
      console.log(error);
    }
  };
  
  return (
    <div>
      <Navi />
      <div className="pw_container">
        <h1 className='pw_h1'>일정 생성</h1>
          <label className='pw_label'>
            만날 날짜:
            <input
              type="date"
              name="GAT_PLAN_DATE"
              className='pw_input_date'
              id='pw_date'
            />
          </label>
          <button className="pw_address_btn" onClick={handleAdressSearch}>우편번호 찾기</button>
          {modalState &&
            <div className='daumAPI'>
              <button className='daumAPI_bt' onClick={() => setModalState(false)}>닫기</button>
              <DaumPostcode
              style={postCodeStyle}
              onComplete={onCompletePost}
              ></DaumPostcode>
            </div>
          }
          <label className='pw_label'>
            만날 장소(도로명 주소):
            <input
              type="text"
              name="GAT_PLAN_ADDR"
              className='pw_input_text'
              id='pw_addr1'
            />
          </label>
          <label className='pw_label'>
          만날 장소(상세 주소):
          <input
            type="text"
            name="GAT_PLAN_ADDR2"
            className='pw_input_text'
            id='pw_addr2'
          />
          </label>
          <label className='pw_label'>
            일정 제목:
            <input
              type="text"
              name="GAT_PLAN_TITLE"
              className='pw_input_text'
              id='pw_title'
            />
          </label>
          <label className='pw_label'>
            일정 설명:
            <textarea
              name="GAT_PLAN_DESC"
              className='pw_input_textarea'
              id='pw_desc'
            />
          </label>
          <button type="button" className='pw_bt' onClick={handleWriteSubmit}>일정 생성</button>
          <button type="button" className='pw_bt' onClick={() => window.location.href = `/gat_view?id=${id}`}>뒤로 가기</button>
      </div>
    </div>
  );
}

export default App;

