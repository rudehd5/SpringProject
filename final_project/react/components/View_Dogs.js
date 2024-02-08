import React, { useState, useEffect, useRef } from 'react';
import Navi from './Navi';
import Foot from './Foot';
import axios from 'axios';
import $, { isEmptyObject } from 'jquery';
import AOS from "aos";
import '../css/view_dogs.css';

const App = () => {

    // 이미지 업로드
    const [imgFile, setImgFile] = useState("");
    const [img, setImg] = useState("");
    const [dogs, setDogs] = useState([]);
    const imgRef = useRef();

    useEffect(() => {
        AOS.init({ duration: 2000 });
        getMyDogs();
    },[]);

    // 강아지 리스트 요청 함수
    const getMyDogs = async () => {
        await axios.post("/api/dog/getDogs")
            .then(res => {
                setDogs(res.data);
            })
        console.log(dogs);
    }

    // 이미지 미리보기 및 img state 에 file 추가해주는 함수
    const showImage = (e) => {
        setImg(imgRef.current.files[0]);
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        }
    }

    // 반려견 등록 서버 요청 (데이터 및 이미지)
    const submit_dog_data = async () => {
        const frm = new FormData();
        frm.append("uploadImg", img);
        frm.append("dog_name", $("#vd_input_dog_name").val());
        const config = {
            Headers: {
                'content-type':'multipart/form-data',
            },
        };
        const data = {
            name : $("#vd_input_dog_name").val(),
            age : $("#vd_input_dog_age").val(),
            kind : $("#vd_input_dog_kind").val(),
            birthday : $("#vd_input_dog_bir").val(),
            gender : $(".vd_select_gender").val()
        }
        if (img !== "") {
            const res_data = await axios.post("/api/dog/register", data);
            console.log(res_data);
            if (res_data.data == 1) {
                const res_image = await axios.post("/api/dog/upload", frm, config);
                if (res_image.data == 1) {
                    alert("등록에 성공하였습니다.");
                    window.location.href = "/mydogs";
                } else {
                    alert("등록에 실패했습니다. 다시 시도해주세요.");
                }
            } else {
                alert("등록에 실패했습니다. 다시 시도해주세요.");
            }
        } else {
            alert("사진을 등록해주세요 !");
            return false;
        }
    }

    // 강아지 데이터 삭제 버튼 이벤트
    const remove_Dog = async (e) => {
        const data = {
            name : e.target.value
        };
        const res = await axios.post("/api/dog/remove", data);
        if (res.data === 1) {
            alert(e.target.value + " 친구와 이별하였습니다 /(ㄒoㄒ)/~~");
            window.location.href = "/mydogs";
        }
    }

    const change_view = () => {
        $(".vd_viewMyDogs").fadeOut(1000, () => {
            $(".vd_viewAddDog").css("display","flex").hide().fadeIn(1000);
        });
    }

    const return_view = () => {
        window.location.href = "/mydogs";
    }

    // 강아지 수에 따라 컨테이너 크기 변환
    if (dogs.length > 4) {
        $(".vd_container").css("height", 700 + ((dogs.length - 4) * 160));
    }

    return (
        <div className="vd_div">
            <Navi />
            <div className='vd_con' data-aos="zoom-in">
                <div className='vd_container'>
                    <div className='vd_viewMyDogs'>
                        <div className='vd_addBtArea'>
                            <button className='vd_addBt' onClick={change_view}>+ 등록</button>
                        </div>
                        {isEmptyObject(dogs) &&
                            <div className='vd_dogCon'>
                                반려견을 등록해주세요.
                            </div>
                        }
                        {!isEmptyObject(dogs) && dogs.map((dog, ind) => {
                            return (
                                <div key={ind} className='vd_dogCon'>
                                    <div className='vd_dogCon_img'>
                                        <img src={`/images/${dog.dog_file_name1}.${dog.dog_file_ext}`} />
                                    </div>
                                    <div className='vd_dogCon_desc'>
                                        <div>이름 : {dog.dog_name}</div>
                                        <div>나이 : {dog.dog_age}</div>
                                        <div>성별 : {dog.dog_gender}</div>
                                        <div>생일 : {dog.dog_bir}</div>
                                    </div>
                                    <div className='vd_delbt_area'>
                                        <button className='vd_delete_bt' value={dog.dog_name} onClick={remove_Dog}>이별</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='vd_viewAddDog'>
                        <div id='vd_add_title'>반려견 등록</div>
                        <div id='vd_add_photo'>
                            <img src={imgFile ? imgFile : '/images/cameraIcon.png'} alt='프로필 이미지'/>
                            <label htmlFor='vd_add_input'>
                                <div className='vd_make_bt'>이미지 업로드</div>
                            </label>
                            <input type='file' id='vd_add_input' className='vd_add_input' accept='image/*' onChange={showImage} ref={imgRef}></input>
                        </div>
                        <div className='vd_input_area' id='vd_add_name'>
                            <span className='vd_add_inputT'>이름</span>
                            <span>
                                <input type='text' className='vd_add_input' id='vd_input_dog_name'></input>
                            </span>
                        </div>
                        <div className='vd_input_area' id='vd_add_age'>
                            <span className='vd_add_inputT'>나이</span>
                            <span>
                                <input type='text' className='vd_add_input' id='vd_input_dog_age'></input>
                            </span>
                        </div>
                        <div className='vd_input_area' id='vd_add_kind'>
                            <span className='vd_add_inputT'>견종</span>
                            <span>
                                <input type='text' className='vd_add_input' id='vd_input_dog_kind'></input>
                            </span>
                        </div>
                        <div className='vd_input_area' id='vd_add_bir'>
                            <span className='vd_add_inputT'>생일</span>
                            <span>
                                <input type='date' className='vd_add_input' min="1900-01-01" max="2099-12-31" id='vd_input_dog_bir'></input>
                            </span>
                        </div>
                        <div className='vd_input_area' id='vd_add_gender'>
                            <span className='vd_add_inputT'>성별</span>
                            <select className='vd_select_gender' selected>
                                <option key='default' value='n'>-선택-</option>
                                <option key='man' value='m'>수컷</option>
                                <option key='woman' value='w'>암컷</option>
                            </select>
                        </div>
                        <div className='vd_bt_area'>
                            <button className='vd_make_bt2' onClick={submit_dog_data}>등록</button>
                            <button className='vd_make_bt2' onClick={return_view}>뒤로가기</button>
                        </div>
                    </div>
                </div>
            </div>
            <Foot />
        </div>
    );
}

export default App;