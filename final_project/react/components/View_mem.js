import React, { useEffect, useState  } from "react";
import Navi from './Navi';
import Footer from './Foot';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import '../css/view_mem.css'

const View_mem = () => {
    
    const [mem, setMem] = useState([]);

    async function getMem() {
        const res = await (await axios.get("/api/view_mem")).data;
        setMem(res);
        console.log(res);
    }

    function goHome() {
        window.location.href='/';
    }

    function goModi() {
        window.location.href='/modi_mem';
    }
    
    useEffect(() => {
        AOS.init({ duration: 2000 });
        getMem();
    },[]);

    return (
        <div className="view_mem">
            <Navi />
            <div className="co_container" data-aos="zoom-in">
                <div className="vm_container">
                    <div className="dt_box">
                        <span className="dt_name">아이디</span>
                        <span className="db_data">{mem.mem_id}</span>
                    </div>
                    <div className="dt_box">
                        <span className="dt_name">이메일</span>
                        <span className="db_data">{mem.mem_email}</span>
                    </div>
                    <div className="dt_box">
                        <span className="dt_name">이름</span>
                        <span className="db_data">{mem.mem_name}</span>
                    </div>
                    <div className="dt_box">
                        <span className="dt_name">닉네임</span>
                        <span className="db_data">{mem.mem_nname}</span>
                    </div>
                    <div className="dt_box">
                        <span className="dt_name">생년월일</span>
                        <span className="db_data">{mem.mem_bir}</span>
                    </div>
                    <div className="dt_box">
                        <span className="dt_name">주소</span>
                        <span className="db_data">{mem.mem_addr1 + " " + mem.mem_addr2}</span>
                    </div>
                    <div className="dt_box">
                        <span className="dt_name">전화번호</span>
                        <span className="db_data">{mem.mem_num}</span>
                    </div>
                    <div className="vm_btBox">
                        <p className="vm_homeLink" onClick={goHome}>홈으로</p>
                        <p className="vm_modiMemLink" onClick={goModi}>정보 수정</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default View_mem;