import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function LogOut() {
    let navigate = useNavigate();

    async function log_out() {
        const res = await (await axios.get("/api/logout")).data;
        console.log(res);
        if (res == 1) {
        window.location.href="/";
        } else {
        alert("로그아웃에 실패했습니다.");
        navigate(-1);
        }
    }

    useEffect(() => {
        log_out();
    },[])
}

export default LogOut;