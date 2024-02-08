import React, { useState, useEffect, useRef } from 'react';
import Navi from './Navi';
import Foot from './Foot';
import $ from 'jquery';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import '../css/gat_home.css';

const Gat_home = () => {

    const [gatList, setGatList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [mem, setMem] = useState([]);
    const [gatToggle, setGatToggle] = useState(false);

    // useEffect(() => {
    //     get_all_gathering();
    // }, [])

    // 로그인 정보 session 요청 함수
    const get_session = async () => {
        await axios.post("/api/getSession")
        .then(res => {
            setMem(res.data);
            if (res.data == []) {
                $(".gh_side_mygat").css("display","none");
            }
        });
    }

    // 모임 정보를 view 순으로 요청하는 함수
    const get_all_gathering = async () => {
        await axios.post('/api/gat/searchAll')
            .then((res) => {
                console.log(res.data);
                setGatList(res.data);
                if (res.data.length >= 6) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].GAT_IMG_NAME1 !== 'noImg') {
                            $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/gathering/${res.data[i].GAT_IMG_NAME1}.${res.data[i].GAT_IMG_EXT}`);
                        } else {
                            $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/cameraIcon.png`);
                        }
                        $(`#gh_item${i+1} .gh_res_desc_title`).text(res.data[i].GAT_TITLE);
                        $(`#gh_item${i+1} .gh_res_desc_date`).text(res.data[i].GAT_DATE);
                        $(`#gh_item${i+1} .gh_res_desc_memNum #memNum`).text(res.data[i].GAT_MEMNUM);
                        $(`#gh_item${i+1} .gh_res_desc_view #view`).text(res.data[i].GAT_VIEW);      
                        $(`#gh_item${i+1} .gh_res_bt`).val(res.data[i].GAT_ID);      
                    }
                } else {
                    for (let i = 0; i < 6; i++) {
                        if (i < res.data.length) {
                            if (res.data[i].GAT_IMG_NAME1 !== 'noImg') {
                                $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/gathering/${res.data[i].GAT_IMG_NAME1}.${res.data[i].GAT_IMG_EXT}`);
                            } else {
                                $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/cameraIcon.png`);
                            }
                            $(`#gh_item${i+1} .gh_res_desc_title`).text(res.data[i].GAT_TITLE);
                            $(`#gh_item${i+1} .gh_res_desc_date`).text(res.data[i].GAT_DATE);
                            $(`#gh_item${i+1} .gh_res_desc_memNum #memNum`).text(res.data[i].GAT_MEMNUM);
                            $(`#gh_item${i+1} .gh_res_desc_view #view`).text(res.data[i].GAT_VIEW);      
                            $(`#gh_item${i+1} .gh_res_bt`).val(res.data[i].GAT_ID);      
                        } else {
                            $(`#gh_item${i+1}`).css("visibility", "hidden");
                        }
                    }
                }
            });
    }

    const get_search_gathering = async () => {
        await axios.post("/api/getGat", {search:$(".gh_search_input").val()})
        .then(res => {
            setGatList(res.data);
            console.log(res.data);
            if (res.data.length >= 6) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].GAT_IMG_NAME1 !== 'noImg') {
                        $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/gathering/${res.data[i].GAT_IMG_NAME1}.${res.data[i].GAT_IMG_EXT}`);
                    } else {
                        $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/cameraIcon.png`);
                    }
                    $(`#gh_item${i+1} .gh_res_desc_title`).text(res.data[i].GAT_TITLE);
                    $(`#gh_item${i+1} .gh_res_desc_date`).text(res.data[i].GAT_DATE);
                    $(`#gh_item${i+1} .gh_res_desc_memNum #memNum`).text(res.data[i].GAT_MEMNUM);
                    $(`#gh_item${i+1} .gh_res_desc_view #view`).text(res.data[i].GAT_VIEW);      
                    $(`#gh_item${i+1} .gh_res_bt`).val(res.data[i].GAT_ID);      
                }
            } else {
                for (let i = 0; i < 6; i++) {
                    if (i < res.data.length) {
                        if (res.data[i].GAT_IMG_NAME1 !== 'noImg') {
                            $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/gathering/${res.data[i].GAT_IMG_NAME1}.${res.data[i].GAT_IMG_EXT}`);
                        } else {
                            $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/cameraIcon.png`);
                        }
                        $(`#gh_item${i+1} .gh_res_desc_title`).text(res.data[i].GAT_TITLE);
                        $(`#gh_item${i+1} .gh_res_desc_date`).text(res.data[i].GAT_DATE);
                        $(`#gh_item${i+1} .gh_res_desc_memNum #memNum`).text(res.data[i].GAT_MEMNUM);
                        $(`#gh_item${i+1} .gh_res_desc_view #view`).text(res.data[i].GAT_VIEW);      
                        $(`#gh_item${i+1} .gh_res_bt`).val(res.data[i].GAT_ID);      
                    } else {
                        $(`#gh_item${i+1}`).css("visibility", "hidden");
                    }
                }
            }
        })
    }

    // 페이징 처리
    const change_newPage = (page, gatList) => {
        if (page * 6 + 6 <= gatList.length) {
            for (let i = 6 * page, j = 0; i < page * 6 + 6; i++, j++) {
                if (gatList[i].GAT_IMG_NAME1 !== 'noImg') {
                    $(`#gh_item${j+1} .gh_res_img img`).attr("src",`/images/gathering/${gatList[i].GAT_IMG_NAME1}.${gatList[i].GAT_IMG_EXT}`);
                } else {
                    $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/cameraIcon.png`);
                }
                $(`#gh_item${j+1} .gh_res_desc_title`).text(gatList[i].GAT_TITLE);
                $(`#gh_item${j+1} .gh_res_desc_date`).text(gatList[i].GAT_DATE);
                $(`#gh_item${j+1} .gh_res_desc_memNum #memNum`).text(gatList[i].GAT_MEMNUM);
                $(`#gh_item${j+1} .gh_res_desc_view #view`).text(gatList[i].GAT_VIEW);   
                $(`#gh_item${i+1} .gh_res_bt`).val(gatList[i].GAT_ID);         
            }
        } else {
            for (let i = 6 * page, j = 0; i < page * 6 + 6; i++, j++) {
                if (i < gatList.length) {
                    if (gatList[i].GAT_IMG_NAME1 !== 'noImg') {
                        $(`#gh_item${j+1} .gh_res_img img`).attr("src",`/images/gathering/${gatList[i].GAT_IMG_NAME1}.${gatList[i].GAT_IMG_EXT}`);
                    } else {
                        $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/cameraIcon.png`);
                    }
                    $(`#gh_item${j+1} .gh_res_desc_title`).text(gatList[i].GAT_TITLE);
                    $(`#gh_item${j+1} .gh_res_desc_date`).text(gatList[i].GAT_DATE);
                    $(`#gh_item${j+1} .gh_res_desc_memNum #memNum`).text(gatList[i].GAT_MEMNUM);
                    $(`#gh_item${j+1} .gh_res_desc_view #view`).text(gatList[i].GAT_VIEW);
                    $(`#gh_item${i+1} .gh_res_bt`).val(gatList[i].GAT_ID);      
                } else {
                    $(`#gh_item${j+1}`).css("visibility", "hidden");
                }
            }
        }
    }
    
    // 페이징 처리 마지막 페이지에서 다시 이전으로 돌아갈때 숨겨둔 아이템 모두 보이게하는 함수
    const show_all_item = () => {
        for (let i = 0; i < 6; i++) {
            $(`#gh_item${i+1}`).css("visibility", "visible");
        }
    }
    
    // 나의 모임 요청 함수
    const get_mygat = async () => {
        await axios.post("/api/gat/getMemGat")
        .then(res => {
            console.log("mygat");
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
                $(".gh_mygat_list").append(`<li id='li${i}'><a href='/gat_view?id=${res.data[i].GATHERING_GAT_ID}'>${res.data[i].GATHERING_GAT_TITLE}</a></li>`);
            }
            setGatToggle(true);
        });
    }

    // 나의 모임 숨기기 or 보이기
    const toggle_mygat = () => {
        if ($("#li0").css("display") == 'list-item') {
            for (let i = 0; i < $(".gh_mygat_list").children().length; i++) {
                $(`#li${i}`).css("display","none");
            }
        } else {
            for (let i = 0; i < $(".gh_mygat_list").children().length; i++) {
                $(`#li${i}`).css("display","list-item");
            }
        }
    }

    // 카테고리 토글 함수
    const toggle_location = () => {
        if ($(".gh_area_list").css("display") == 'none') {
            $(".gh_area_list").css("display", "block");
        } else {
            $(".gh_area_list").css("display", "none");
        }
    }

    // 시/군 토글 함수
    const toggle_locations = (res) => {
        if ($("#"+res.target.innerHTML).css("display") == 'none') {
            $("#"+res.target.innerHTML).css("display", "block");
        } else {
            $("#"+res.target.innerHTML).css("display", "none");
        }
    }

    // 지역별 모임 요청 API
    const get_location_gats = async (res) => {
        console.log(res.target.innerHTML);
        const data = {
            location1 : res.target.parentElement.previousSibling.innerHTML,
            location2 : res.target.innerHTML,
        }
        await axios.post("api/gat/locationGats", data)
        .then(result => {
            show_all_item();
            console.log(result.data);
            setPage(0);
            setGatList(result.data);
            // change_newPage(0, result.data);
            if (result.data.length >= 6) {
                for (let i = 0; i < 6; i++) {
                    if (result.data[i].GAT_IMG_NAME1 !== 'noImg') {
                        $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/gathering/${result.data[i].GAT_IMG_NAME1}.${result.data[i].GAT_IMG_EXT}`);
                    } else {
                        $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/cameraIcon.png`);
                    }
                    $(`#gh_item${i+1} .gh_res_desc_title`).text(result.data[i].GAT_TITLE);
                    $(`#gh_item${i+1} .gh_res_desc_date`).text(result.data[i].GAT_DATE);
                    $(`#gh_item${i+1} .gh_res_desc_memNum #memNum`).text(result.data[i].GAT_MEMNUM);
                    $(`#gh_item${i+1} .gh_res_desc_view #view`).text(result.data[i].GAT_VIEW);     
                    $(`#gh_item${i+1} .gh_res_bt`).val(result.data[i].GAT_ID); 
                }
            } else {
                for (let i = 0; i < 6; i++) {
                    if (i < result.data.length) {
                        if (result.data[i].GAT_IMG_NAME1 !== 'noImg') {
                            $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/gathering/${result.data[i].GAT_IMG_NAME1}.${result.data[i].GAT_IMG_EXT}`);
                        } else {
                            $(`#gh_item${i+1} .gh_res_img img`).attr("src",`/images/cameraIcon.png`);
                        }
                        $(`#gh_item${i+1} .gh_res_desc_title`).text(result.data[i].GAT_TITLE);
                        $(`#gh_item${i+1} .gh_res_desc_date`).text(result.data[i].GAT_DATE);
                        $(`#gh_item${i+1} .gh_res_desc_memNum #memNum`).text(result.data[i].GAT_MEMNUM);
                        $(`#gh_item${i+1} .gh_res_desc_view #view`).text(result.data[i].GAT_VIEW); 
                        $(`#gh_item${i+1} .gh_res_bt`).val(result.data[i].GAT_ID);     
                    } else {
                        $(`#gh_item${i+1}`).css("visibility", "hidden");
                    }
                }
            }
        });
    }

    useEffect (() => {
        get_session();
        get_all_gathering();
    }, []);

    return (
        <div className='gh_container'>
            <Navi />
            <div className='gh_content_box'>
                <div className='gh_search_area'>
                    <input className='gh_search_input'></input>
                    <button className='gh_search_bt1' onClick={get_search_gathering}>검색</button>
                    {mem && <button className='gh_search_bt1' onClick={() => {window.location.href = "/gat_make"}}>모임만들기</button>}
                </div>
                <div className='gh_content_area'>
                    <div className='gh_res_area'>
                        <div className='gh_item_area'>
                            <div className='gh_res_item' id='gh_item1'>
                                <div className='gh_res_img'>
                                    <img src={`/images/cameraIcon.png`} alt='이미지가 없습니다.'></img>
                                </div>
                                <div className='gh_res_desc'>
                                    <div className='gh_res_desc_title'>
                                        title
                                    </div>
                                    <div className='gh_res_desc_date'>
                                        date
                                    </div>
                                    <div className='gh_res_desc_memNum'>
                                        <FontAwesomeIcon icon={faUser} /><span id='memNum'></span>
                                    </div>
                                    <div className='gh_res_desc_view'>
                                        <FontAwesomeIcon icon={faEye} /><span id='view'></span>
                                    </div>
                                </div>
                                <div className='gh_res_btArea'>
                                    <button className='gh_res_bt' onClick={(e) => {window.location.href = `/gat_view?id=${e.target.value}`}}>보기</button>
                                </div>
                            </div>
                            <div className='gh_res_item' id='gh_item2'>
                                <div className='gh_res_img'>
                                    <img src={`/images/cameraIcon.png`} alt='이미지가 없습니다.'></img>
                                </div>
                                <div className='gh_res_desc'>
                                    <div className='gh_res_desc_title'>
                                        title
                                    </div>
                                    <div className='gh_res_desc_date'>
                                        date
                                    </div>
                                    <div className='gh_res_desc_memNum'>
                                        <FontAwesomeIcon icon={faUser} /><span id='memNum'></span>
                                    </div>
                                    <div className='gh_res_desc_view'>
                                        <FontAwesomeIcon icon={faEye} /><span id='view'></span>
                                    </div>
                                </div>
                                <div className='gh_res_btArea'>
                                    <button className='gh_res_bt' onClick={(e) => {window.location.href = `/gat_view?id=${e.target.value}`}}>보기</button>
                                </div>
                            </div>
                            <div className='gh_res_item' id='gh_item3'>
                                <div className='gh_res_img'>
                                    <img src={`/images/cameraIcon.png`} alt='이미지가 없습니다.'></img>
                                </div>
                                <div className='gh_res_desc'>
                                    <div className='gh_res_desc_title'>
                                        title
                                    </div>
                                    <div className='gh_res_desc_date'>
                                        date
                                    </div>
                                    <div className='gh_res_desc_memNum'>
                                        <FontAwesomeIcon icon={faUser} /><span id='memNum'></span>
                                    </div>
                                    <div className='gh_res_desc_view'>
                                        <FontAwesomeIcon icon={faEye} /><span id='view'></span>
                                    </div>
                                </div>
                                <div className='gh_res_btArea'>
                                    <button className='gh_res_bt' onClick={(e) => {window.location.href = `/gat_view?id=${e.target.value}`}}>보기</button>
                                </div>
                            </div>
                            <div className='gh_res_item' id='gh_item4'>
                                <div className='gh_res_img'>
                                    <img src={`/images/cameraIcon.png`} alt='이미지가 없습니다.'></img>
                                </div>
                                <div className='gh_res_desc'>
                                    <div className='gh_res_desc_title'>
                                        title
                                    </div>
                                    <div className='gh_res_desc_date'>
                                        date
                                    </div>
                                    <div className='gh_res_desc_memNum'>
                                        <FontAwesomeIcon icon={faUser} /><span id='memNum'></span>
                                    </div>
                                    <div className='gh_res_desc_view'>
                                        <FontAwesomeIcon icon={faEye} /><span id='view'></span>
                                    </div>
                                </div>
                                <div className='gh_res_btArea'>
                                    <button className='gh_res_bt' onClick={(e) => {window.location.href = `/gat_view?id=${e.target.value}`}}>보기</button>
                                </div>
                            </div>
                            <div className='gh_res_item' id='gh_item5'>
                                <div className='gh_res_img'>
                                    <img src={`/images/cameraIcon.png`} alt='이미지가 없습니다.'></img>
                                </div>
                                <div className='gh_res_desc'>
                                    <div className='gh_res_desc_title'>
                                        title
                                    </div>
                                    <div className='gh_res_desc_date'>
                                        date
                                    </div>
                                    <div className='gh_res_desc_memNum'>
                                        <FontAwesomeIcon icon={faUser} /><span id='memNum'></span>
                                    </div>
                                    <div className='gh_res_desc_view'>
                                        <FontAwesomeIcon icon={faEye} /><span id='view'></span>
                                    </div>
                                </div>
                                <div className='gh_res_btArea'>
                                    <button className='gh_res_bt' onClick={(e) => {window.location.href = `/gat_view?id=${e.target.value}`}}>보기</button>
                                </div>
                            </div>
                            <div className='gh_res_item' id='gh_item6'>
                                <div className='gh_res_img'>
                                    <img src={`/images/cameraIcon.png`} alt='이미지가 없습니다.'></img>
                                </div>
                                <div className='gh_res_desc'>
                                    <div className='gh_res_desc_title'>
                                        title
                                    </div>
                                    <div className='gh_res_desc_date'>
                                        date
                                    </div>
                                    <div className='gh_res_desc_memNum'>
                                        <FontAwesomeIcon icon={faUser} /><span id='memNum'></span>
                                    </div>
                                    <div className='gh_res_desc_view'>
                                        <FontAwesomeIcon icon={faEye} /><span id='view'></span>
                                    </div>
                                </div>
                                <div className='gh_res_btArea'>
                                    <button className='gh_res_bt' onClick={(e) => {window.location.href = `/gat_view?id=${e.target.value}`}}>보기</button>
                                </div>
                            </div>
                        </div>
                        <div className='gh_bt_area'>
                            <button className='gh_search_bt2' disabled={page + 1 == 1} 
                            onClick={() => {
                                setPage(page - 1);
                                show_all_item();
                                change_newPage(page - 1, gatList);
                            }}>
                                이전
                            </button>
                            <div className='gh_search_page'>{page + 1}</div>
                            <button className='gh_search_bt2' disabled={gatList.length % 6 == 0 ? page + 1 == gatList.length / 6 : page + 1 == Math.floor(gatList.length / 6 + 1)} 
                            onClick={() => {
                                setPage(page + 1)
                                change_newPage(page + 1, gatList);
                            }}>
                                다음
                            </button>
                        </div>
                    </div>
                    <div className='gh_side_bar'>
                        <div className='gh_side_title'>menu</div>
                        <div className='gh_side_mygat'>
                            <div onClick={gatToggle ? toggle_mygat : get_mygat}>내 모임</div>
                            <ul className='gh_mygat_list'>
                            </ul>
                        </div>
                        <div className='gh_side_category'>
                            <div className='gh_category_bt' onClick={toggle_location}>카테고리</div>
                            <div className='gh_area_list'>
                                <ul>
                                    <li>
                                        <div onClick={toggle_locations}>서울특별시</div>
                                        <ul className='gh_locations' id='서울특별시'>
                                            <li onClick={get_location_gats}>강남구</li>
                                            <li onClick={get_location_gats}>강동구</li>
                                            <li onClick={get_location_gats}>강북구</li>
                                            <li onClick={get_location_gats}>강서구</li>
                                            <li onClick={get_location_gats}>관악구</li>
                                            <li onClick={get_location_gats}>광진구</li>
                                            <li onClick={get_location_gats}>구로구</li>
                                            <li onClick={get_location_gats}>금천구</li>
                                            <li onClick={get_location_gats}>노원구</li>
                                            <li onClick={get_location_gats}>도봉구</li>
                                            <li onClick={get_location_gats}>동대문구</li>
                                            <li onClick={get_location_gats}>동작구</li>
                                            <li onClick={get_location_gats}>마포구</li>
                                            <li onClick={get_location_gats}>서대문구</li>
                                            <li onClick={get_location_gats}>서초구</li>
                                            <li onClick={get_location_gats}>성동구</li>
                                            <li onClick={get_location_gats}>성북구</li>
                                            <li onClick={get_location_gats}>송파구</li>
                                            <li onClick={get_location_gats}>양천구</li>
                                            <li onClick={get_location_gats}>영등포구</li>
                                            <li onClick={get_location_gats}>용산구</li>
                                            <li onClick={get_location_gats}>은평구</li>
                                            <li onClick={get_location_gats}>종로구</li>
                                            <li onClick={get_location_gats}>중구</li>
                                            <li onClick={get_location_gats}>중랑구</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>인천광역시</div>
                                        <ul className='gh_locations' id='인천광역시'>
                                            <li onClick={get_location_gats}>계양구</li>
                                            <li onClick={get_location_gats}>미추홀구</li>
                                            <li onClick={get_location_gats}>남동구</li>
                                            <li onClick={get_location_gats}>동구</li>
                                            <li onClick={get_location_gats}>부평구</li>
                                            <li onClick={get_location_gats}>서구</li>
                                            <li onClick={get_location_gats}>연수구</li>
                                            <li onClick={get_location_gats}>중구</li>
                                            <li onClick={get_location_gats}>강화군</li>
                                            <li onClick={get_location_gats}>옹진군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>대전광역시</div>
                                        <ul className='gh_locations' id='대전광역시'>
                                            <li onClick={get_location_gats}>대덕구</li>
                                            <li onClick={get_location_gats}>동구</li>
                                            <li onClick={get_location_gats}>서구</li>
                                            <li onClick={get_location_gats}>유성구</li>
                                            <li onClick={get_location_gats}>중구</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>광주광역시</div>
                                        <ul className='gh_locations' id='광주광역시'>
                                            <li onClick={get_location_gats}>광산구</li>
                                            <li onClick={get_location_gats}>남구</li>
                                            <li onClick={get_location_gats}>동구</li>
                                            <li onClick={get_location_gats}>북구</li>
                                            <li onClick={get_location_gats}>서구</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>대구광역시</div>
                                        <ul className='gh_locations' id='대구광역시'>
                                            <li onClick={get_location_gats}>남구</li>
                                            <li onClick={get_location_gats}>달서구</li>
                                            <li onClick={get_location_gats}>동구</li>
                                            <li onClick={get_location_gats}>북구</li>
                                            <li onClick={get_location_gats}>서구</li>
                                            <li onClick={get_location_gats}>수성구</li>
                                            <li onClick={get_location_gats}>중구</li>
                                            <li onClick={get_location_gats}>달성군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>울산광역시</div>
                                        <ul className='gh_locations' id='울산광역시'>
                                            <li onClick={get_location_gats}>남구</li>
                                            <li onClick={get_location_gats}>동구</li>
                                            <li onClick={get_location_gats}>북구</li>
                                            <li onClick={get_location_gats}>중구</li>
                                            <li onClick={get_location_gats}>울주군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>부산광역시</div>
                                        <ul className='gh_locations' id='부산광역시'>
                                            <li onClick={get_location_gats}>강서구</li>
                                            <li onClick={get_location_gats}>금정구</li>
                                            <li onClick={get_location_gats}>남구</li>
                                            <li onClick={get_location_gats}>동구</li>
                                            <li onClick={get_location_gats}>동래구</li>
                                            <li onClick={get_location_gats}>부산진구</li>
                                            <li onClick={get_location_gats}>북구</li>
                                            <li onClick={get_location_gats}>사상구</li>
                                            <li onClick={get_location_gats}>사하구</li>
                                            <li onClick={get_location_gats}>서구</li>
                                            <li onClick={get_location_gats}>수영구</li>
                                            <li onClick={get_location_gats}>연제구</li>
                                            <li onClick={get_location_gats}>영도구</li>
                                            <li onClick={get_location_gats}>중구</li>
                                            <li onClick={get_location_gats}>해운대구</li>
                                            <li onClick={get_location_gats}>기장군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>경기도</div>
                                        <ul className='gh_locations' id='경기도'>
                                            <li onClick={get_location_gats}>고양시</li>
                                            <li onClick={get_location_gats}>과천시</li>
                                            <li onClick={get_location_gats}>광명시</li>
                                            <li onClick={get_location_gats}>광주시</li>
                                            <li onClick={get_location_gats}>구리시</li>
                                            <li onClick={get_location_gats}>군포시</li>
                                            <li onClick={get_location_gats}>김포시</li>
                                            <li onClick={get_location_gats}>남양주시</li>
                                            <li onClick={get_location_gats}>동두천시</li>
                                            <li onClick={get_location_gats}>부천시</li>
                                            <li onClick={get_location_gats}>성남시</li>
                                            <li onClick={get_location_gats}>수원시</li>
                                            <li onClick={get_location_gats}>시흥시</li>
                                            <li onClick={get_location_gats}>안산시</li>
                                            <li onClick={get_location_gats}>안성시</li>
                                            <li onClick={get_location_gats}>안양시</li>
                                            <li onClick={get_location_gats}>양주시</li>
                                            <li onClick={get_location_gats}>오산시</li>
                                            <li onClick={get_location_gats}>용인시</li>
                                            <li onClick={get_location_gats}>의왕시</li>
                                            <li onClick={get_location_gats}>의정부시</li>
                                            <li onClick={get_location_gats}>이천시</li>
                                            <li onClick={get_location_gats}>파주시</li>
                                            <li onClick={get_location_gats}>평택시</li>
                                            <li onClick={get_location_gats}>포천시</li>
                                            <li onClick={get_location_gats}>하남시</li>
                                            <li onClick={get_location_gats}>화성시</li>
                                            <li onClick={get_location_gats}>가평군</li>
                                            <li onClick={get_location_gats}>양평군</li>
                                            <li onClick={get_location_gats}>여주군</li>
                                            <li onClick={get_location_gats}>연천군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>강원도</div>
                                        <ul className='gh_locations' id='강원도'>
                                            <li onClick={get_location_gats}>강릉시</li>
                                            <li onClick={get_location_gats}>동해시</li>
                                            <li onClick={get_location_gats}>삼척시</li>
                                            <li onClick={get_location_gats}>속초시</li>
                                            <li onClick={get_location_gats}>원주시</li>
                                            <li onClick={get_location_gats}>춘천시</li>
                                            <li onClick={get_location_gats}>태백시</li>
                                            <li onClick={get_location_gats}>고성군</li>
                                            <li onClick={get_location_gats}>양구군</li>
                                            <li onClick={get_location_gats}>양양군</li>
                                            <li onClick={get_location_gats}>영월군</li>
                                            <li onClick={get_location_gats}>인제군</li>
                                            <li onClick={get_location_gats}>정선군</li>
                                            <li onClick={get_location_gats}>철원군</li>
                                            <li onClick={get_location_gats}>평창군</li>
                                            <li onClick={get_location_gats}>홍천군</li>
                                            <li onClick={get_location_gats}>화천군</li>
                                            <li onClick={get_location_gats}>횡성군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>충청북도</div>
                                        <ul className='gh_locations' id='충청북도'>
                                            <li onClick={get_location_gats}>제천시</li>
                                            <li onClick={get_location_gats}>청주시</li>
                                            <li onClick={get_location_gats}>충주시</li>
                                            <li onClick={get_location_gats}>괴산군</li>
                                            <li onClick={get_location_gats}>단양군</li>
                                            <li onClick={get_location_gats}>보은군</li>
                                            <li onClick={get_location_gats}>영동군</li>
                                            <li onClick={get_location_gats}>옥천군</li>
                                            <li onClick={get_location_gats}>음성군</li>
                                            <li onClick={get_location_gats}>증평군</li>
                                            <li onClick={get_location_gats}>진천군</li>
                                            <li onClick={get_location_gats}>청원군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>충청남도</div>
                                        <ul className='gh_locations' id='충청남도'>
                                            <li onClick={get_location_gats}>계룡시</li>
                                            <li onClick={get_location_gats}>공주시</li>
                                            <li onClick={get_location_gats}>논산시</li>
                                            <li onClick={get_location_gats}>보령시</li>
                                            <li onClick={get_location_gats}>서산시</li>
                                            <li onClick={get_location_gats}>아산시</li>
                                            <li onClick={get_location_gats}>천안시</li>
                                            <li onClick={get_location_gats}>금산군</li>
                                            <li onClick={get_location_gats}>당진군</li>
                                            <li onClick={get_location_gats}>부여군</li>
                                            <li onClick={get_location_gats}>서천군</li>
                                            <li onClick={get_location_gats}>연기군</li>
                                            <li onClick={get_location_gats}>예산군</li>
                                            <li onClick={get_location_gats}>청양군</li>
                                            <li onClick={get_location_gats}>태안군</li>
                                            <li onClick={get_location_gats}>홍성군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>전라북도</div>
                                        <ul className='gh_locations' id='전라북도'>
                                            <li onClick={get_location_gats}>군산시</li>
                                            <li onClick={get_location_gats}>김제시</li>
                                            <li onClick={get_location_gats}>남원시</li>
                                            <li onClick={get_location_gats}>익산시</li>
                                            <li onClick={get_location_gats}>전주시</li>
                                            <li onClick={get_location_gats}>정읍시</li>
                                            <li onClick={get_location_gats}>고창군</li>
                                            <li onClick={get_location_gats}>무주군</li>
                                            <li onClick={get_location_gats}>부안군</li>
                                            <li onClick={get_location_gats}>순창군</li>
                                            <li onClick={get_location_gats}>완주군</li>
                                            <li onClick={get_location_gats}>임실군</li>
                                            <li onClick={get_location_gats}>장수군</li>
                                            <li onClick={get_location_gats}>진안군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>전라남도</div>
                                        <ul className='gh_locations' id='전라남도'>
                                            <li onClick={get_location_gats}>광양시</li>
                                            <li onClick={get_location_gats}>나주시</li>
                                            <li onClick={get_location_gats}>목포시</li>
                                            <li onClick={get_location_gats}>순천시</li>
                                            <li onClick={get_location_gats}>여수시</li>
                                            <li onClick={get_location_gats}>강진군</li>
                                            <li onClick={get_location_gats}>고흥군</li>
                                            <li onClick={get_location_gats}>곡성군</li>
                                            <li onClick={get_location_gats}>구례군</li>
                                            <li onClick={get_location_gats}>담양군</li>
                                            <li onClick={get_location_gats}>무안군</li>
                                            <li onClick={get_location_gats}>보성군</li>
                                            <li onClick={get_location_gats}>신안군</li>
                                            <li onClick={get_location_gats}>영광군</li>
                                            <li onClick={get_location_gats}>영암군</li>
                                            <li onClick={get_location_gats}>완도군</li>
                                            <li onClick={get_location_gats}>장성군</li>
                                            <li onClick={get_location_gats}>장흥군</li>
                                            <li onClick={get_location_gats}>진도군</li>
                                            <li onClick={get_location_gats}>함평군</li>
                                            <li onClick={get_location_gats}>해남군</li>
                                            <li onClick={get_location_gats}>화순군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>경상북도</div>
                                        <ul className='gh_locations' id='경상북도'>
                                            <li onClick={get_location_gats}>경산시</li>
                                            <li onClick={get_location_gats}>경주시</li>
                                            <li onClick={get_location_gats}>구미시</li>
                                            <li onClick={get_location_gats}>김천시</li>
                                            <li onClick={get_location_gats}>문경시</li>
                                            <li onClick={get_location_gats}>상주시</li>
                                            <li onClick={get_location_gats}>안동시</li>
                                            <li onClick={get_location_gats}>영주시</li>
                                            <li onClick={get_location_gats}>영천시</li>
                                            <li onClick={get_location_gats}>포항시</li>
                                            <li onClick={get_location_gats}>고령군</li>
                                            <li onClick={get_location_gats}>군위군</li>
                                            <li onClick={get_location_gats}>봉화군</li>
                                            <li onClick={get_location_gats}>성주군</li>
                                            <li onClick={get_location_gats}>영덕군</li>
                                            <li onClick={get_location_gats}>영양군</li>
                                            <li onClick={get_location_gats}>예천군</li>
                                            <li onClick={get_location_gats}>울릉군</li>
                                            <li onClick={get_location_gats}>울진군</li>
                                            <li onClick={get_location_gats}>의성군</li>
                                            <li onClick={get_location_gats}>청도군</li>
                                            <li onClick={get_location_gats}>청송군</li>
                                            <li onClick={get_location_gats}>칠곡군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>경상남도</div>
                                        <ul className='gh_locations' id='경상남도'>
                                            <li onClick={get_location_gats}>거제시</li>
                                            <li onClick={get_location_gats}>김해시</li>
                                            <li onClick={get_location_gats}>마산시</li>
                                            <li onClick={get_location_gats}>밀양시</li>
                                            <li onClick={get_location_gats}>사천시</li>
                                            <li onClick={get_location_gats}>양산시</li>
                                            <li onClick={get_location_gats}>진주시</li>
                                            <li onClick={get_location_gats}>진해시</li>
                                            <li onClick={get_location_gats}>창원시</li>
                                            <li onClick={get_location_gats}>통영시</li>
                                            <li onClick={get_location_gats}>거창군</li>
                                            <li onClick={get_location_gats}>고성군</li>
                                            <li onClick={get_location_gats}>남해군</li>
                                            <li onClick={get_location_gats}>산청군</li>
                                            <li onClick={get_location_gats}>의령군</li>
                                            <li onClick={get_location_gats}>창녕군</li>
                                            <li onClick={get_location_gats}>하동군</li>
                                            <li onClick={get_location_gats}>함안군</li>
                                            <li onClick={get_location_gats}>함양군</li>
                                            <li onClick={get_location_gats}>합천군</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div onClick={toggle_locations}>제주특별자치도</div>
                                        <ul className='gh_locations' id='제주특별자치도'>
                                            <li onClick={get_location_gats}>서귀포시</li>
                                            <li onClick={get_location_gats}>제주시</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Foot />
        </div>
    );
}

export default Gat_home;