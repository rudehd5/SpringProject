import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Navi from './Navi';
import Button from "react-bootstrap/Button";
import $ from 'jquery';
import axios from "axios";
import AOS from "aos";
import '../css/boardview.css';

function formatDate(rawDate) {
  const date = new Date(rawDate);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
  return date.toLocaleDateString('ko-KR', options);
}

const Board_list_details = () => {
  useEffect(() => {
      AOS.init({ duration: 2000 });
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [qMem, setQMem] = useState([]);
  const [mem, setMem] = useState('');
  const id = searchParams.get("board_id");

  // post 방식
  const reqBoard = async () => {
    try {
      await axios.post("/api/boardView", {
          id: id
      })
      .then(response => {
        console.log(response.data);
        setQMem(response.data[0]);
        $(".list_details_id").text(response.data[0].board_ID);
        $(".list_details_date").text(response.data[0].board_DATE);
        $(".list_details_hit").text(response.data[0].board_VIEW);
        $(".list_details3").text(response.data[0].board_TITLE);
        $(".list_details4").text(response.data[0].board_DESC);
        axios.post("/api/getSession")
        .then(res => {
          setMem(res.data);
          if (response.data[0].member_MEM_ID != res.data) {
            $("#edit").css("visibility", "hidden");
            $("#delete").css("visibility", "hidden");
          }
        })
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("오류가 발생했습니다.");
    }
  }

  useEffect(() => {
    reqBoard();
    // getSession();
  }, [id]); // id가 변경될 때마다 useEffect가 실행되도록 설정

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  //수정
  const handleEditClick = () => {
    $(".changeBtn").css("visibility", "visible");
    setIsEditing(true);
    setEditedTitle(qMem.board_TITLE);
    setEditedContent(qMem.board_DESC);
  };

  const editCancle = () => {
    window.location.href = "/board";
    // $(".changeBtn").css("visibility", "hidden");
    // setIsEditing(false);
    // $(".list_details3").text(qMem.board_TITLE);
    // $(".list_details4").text(qMem.board_DESC);
  };

  //(수정)저장
  const handleSaveClick = async  () => {
    const data = {
      id:id,
      title:$(".title_modify").val(),
      content:$(".content_modify").val(),
    }
    try {
      // 수정된 제목과 내용을 서버에 전송
        await axios.post("/api/updateBoard", data)
        .then(res => {
          if (res.data === 1) {
            alert("게시판 수정을 성공했습니다.");
            setIsEditing(false);
            reqBoard();
            $(".changeBtn").css("visibility", "hidden");
          }
        });
    } catch (error) {
      console.error('Error updating data:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  // 삭제 처리
  const handleDeleteClick = async () => {
    try {
      // 서버에 삭제 요청을 보냄
      await axios.delete("/api/deleteBoard", {
        data: {id}})
        .then(res => {
          if (res.data === 1) {
            alert("게시글 삭제를 성공했습니다.");
            window.location.href = "/board";
          }
        });
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div><Navi />
      <div className='list_details1' data-aos="fade-right">
        <table className="list_details2">
          <tbody>
            <tr>
              <td className='li_box1'>게시글 아이디: </td>
              <td className='list_details_id'>{qMem.id}</td>
              <td className='li_box2'>작 성 일: </td>
              <td className='list_details_date'>{formatDate(qMem.date)}</td>
              <td className='li_box3'>조 회 수: </td>
              <td className='list_details_hit'>{qMem.hit}</td>
            </tr>
            <tr>
              <td className='li_box4'>제 목: </td>
            </tr>
            <tr>
              <td className='li_box5'>내 용: </td>
            </tr>
          </tbody>
        </table>
        <td>
          {isEditing ? (
            <input className='title_modify' type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            ) : (
            <div className='list_details3'>{qMem.title}</div>
          )}
        </td>
        <td>
          {isEditing ? (
          <input className='content_modify' value={editedContent} onChange={(e) => setEditedContent(e.target.value)}/>
          ) : (
          <div className='list_details4'>
            {qMem.content}
          </div>
          )}
          <div className='li_box6'>
          <img src={`/images/${qMem.board_IMG_NAME1}.${qMem.board_IMG_EXT}`} alt="login_logo"></img>
          </div>
          </td>
          <Button className='changeBtn' onClick={handleSaveClick}>
            저장
          </Button>
          <Button className='changeBtn' onClick={editCancle}>
            취소
          </Button>
          {!isEditing && (
          <>
          <Button href='/board' className='list'>목록보기</Button>
          <Button className='list' id='edit' onClick={handleEditClick}>수정</Button>
          <Button className='list' id='delete' onClick={handleDeleteClick}>삭제</Button>
          </>
          )}
      </div>
    </div>
  );
};

export default Board_list_details;