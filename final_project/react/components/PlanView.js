// 쿼리스트링 추출
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect ,useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navi from './Navi'
import axios from 'axios';
import $ from 'jquery';
import '../css/planview.css'

function Gat_plan() {
  const [plan, setPlan] = useState([]);
  const [mine, setMine] = useState(false);
  const [planid, setPlanId] = useState('');
  const location = useLocation(); // React Router의 useLocation 훅을 사용하여 현재 페이지의 location 정보를 가져옴

  const getgplist = async () => {
    const params = new URLSearchParams(location.search)
    const id = params.get("id");
    setPlanId(id);
    console.log(id);
    const data = {
      gat_plan_id :id
    }
    await axios.post("/api/getPlan",data)
    .then((res) => {
      setPlan(res.data);
      console.log(res.data);
      $(".gpleader").text(res.data.gat_PLAN_LEADER);
      $(".gpdate").text(res.data.gat_PLAN_DATE);
      $(".gpaddr").text(res.data.gat_PLAN_ADDR);
      $(".gptitle").text(res.data.gat_PLAN_TITLE);
      $(".gpdesc").text(res.data.gat_PLAN_DESC);
      axios.post("api/plan/isMine", {mem_nName:res.data.gat_PLAN_LEADER})
      .then((response) => {
        console.log(response.data);
        if (response.data === 1) {
          setMine(true);
        }
      });
    }
  )
}

const delPlan = async () => {
  const data = {
    gat_plan_id :planid
  }
  await axios.post("/api/delPlan", data)
  .then((res) => {
    console.log(res.data);
    if (res.data === 1) {
      alert("성공적으로 삭제했습니다!");
      window.history.back()
    } else {
      alert("삭제를 실패했습니다!");
      return false;
    }
  });
}

useEffect(() => {
  getgplist();
}, []);

  return  (
    <div>
      <Navi />
      <div className='pv_container'>
        <div className='gpfull'>
          <table className='gptable'>
            <thead>
              <tr>
                <td className='gpplan' colSpan={3}>
                  <h1 className='gpplan2'>PLAN</h1>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>주최자</td>
                <td>날짜</td>
              </tr>
              <tr>
                <td className='gpleader'></td>
                <td className='gpdate'></td>
              </tr>
              <tr>
                <td colSpan={3}>주소</td>
              </tr>
              <tr>
                <td className="gpaddr" colSpan={3}></td>
              </tr>
              <tr>
                <td colSpan={3}>제목</td>
              </tr>
              <tr>
                <td colSpan={3} className='gptitle'></td>
              </tr>
              <tr>
                <td colSpan={3}>내용</td>
              </tr>
              <tr>
                <td colSpan={3} className='gpdesc'></td>
              </tr>
            </tbody>
          </table>
          <div className='gpmove'>
            {mine && <div onClick={delPlan}>삭제하기</div>}
            <div onClick={() => {window.history.back()}}>뒤로가기</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gat_plan;