import { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Navi from './Navi';
import Foot from './Foot';
import axios from 'axios';
import qs from 'qs';
import $, { param } from 'jquery';
import '../css/home.css';

function Home() {
  
	useEffect(() => {
		AOS.init({ duration: 2000 });
	})
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const clickEv = async () => {
    if ($(".Search-input").val().length < 2) {
      alert("검색 키워드를 2자 이상 작성해주세요.");
      return false;
    }
    const res = await (await axios.post("/api/getGat", {
        search: $(".Search-input").val()
    })).data;
    console.log(res);
    if (res[0] == undefined) {
      alert("해당 검색어와 매칭되는 모임이 존재하지 않습니다.");
      return false;
    }
    $(".searchArea").animate({ marginTop: "10px" }, 1000, function () {});
    $(".aos").css("visibility", "visible").hide().fadeIn(1000);
    for (let i = 0; i < res.length; i++) {
      $(`#item${i+1} .h_item_pic img`).attr("src", `images/${res[i].GAT_IMG_NAME1}.${res[i].GAT_IMG_EXT}`);
      $(`#item${i+1} .h_item_title a`).text(res[i].GAT_TITLE);
      $(`#item${i+1} .h_item_title a`).attr("href", `/gat_view?id=${res[i].GAT_ID}`);
      $(`#item${i+1} .h_item_desc`).text(res[i].GAT_DESC);
    }
  };

  const keyPress = (a) =>{
    if (a.key === 'Enter'){
      clickEv();
    }
  };

  const click_logo = () => {
    document.location.href="/";
  }

	return (
        <div className="App">
          <Navi />
          <div className='searchArea' data-aos="zoom-in">
            <div className='logo' onClick={click_logo}><h1>Dog's Life</h1></div>
            <div className='Search'>
              <input
                className="Search-input"
                type='text'
                placeholder='주제별, 지역별 인기 모임을 검색해보세요~'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={keyPress}
              />
              <button className="submit-button"  onClick={clickEv}>검 색</button>
            </div>
            <div className='aos'>
              <div className='h_item' id='item1'>
                <div className='h_item_pic'>
                  <img src="/images/cameraIcon.png" alt='결과없음'></img>
                </div>
                <div className='h_item_title'><a></a></div>
                <div className='h_item_desc'></div>
              </div>
              <div className='h_item' id='item2'>
                <div className='h_item_pic'>
                  <img src="/images/cameraIcon.png" alt='결과없음'></img>
                </div>
                <div className='h_item_title'><a></a></div>
                <div className='h_item_desc'></div>
              </div>
              <div className='h_item' id='item3'>
                <div className='h_item_pic'>
                  <img src="/images/cameraIcon.png" alt='결과없음'></img>
                </div>
                <div className='h_item_title'><a></a></div>
                <div className='h_item_desc'></div>
              </div>
              <div className='h_item' id='item4'>
                <div className='h_item_pic'>
                  <img src="/images/cameraIcon.png" alt='결과없음'></img>
                </div>
                <div className='h_item_title'><a></a></div>
                <div className='h_item_desc'></div>
              </div>
              <div className='h_item' id='item5'>
                <div className='h_item_pic'>
                  <img src="/images/cameraIcon.png" alt='결과없음'></img>
                </div>
                <div className='h_item_title'><a></a></div>
                <div className='h_item_desc'></div>
              </div>
            </div>
          </div>
          <Foot />
        </div>
  );
}

export default Home;
