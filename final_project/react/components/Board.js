import { useEffect, useState } from 'react';
import "aos/dist/aos.css";
import Navi from './Navi';
import '../css/home.css';
import '../css/board.css';
import axios from 'axios';
import $ from 'jquery';

const App = () => {
    const [list, setList] = useState([]);
    const [search, setSearchList] = useState([]);
    const [csearch,setCSearchList]= useState([]);
    const [inputSearch , setInputSearch] = useState("");
    const [inputCSearch , setInputCSearch] = useState("");
    const [hit, setHit] = useState([]);
    const [catem,setCateList]= useState([]);
    const [inputCate,setInputCate] = useState('전체보기');
    // 페이징을 위한 함수
    const pageSize = 30; // 한 페이지당 표시할 게시글 수
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearchPage, setCurrentSearchPage] = useState(1);
    const [cateSearchPage, setCateSearchPage]= useState(1);
    const [CurrentCatePage,setCurrentCatePage] = useState(1);
    const [login, setLogin] = useState('');

  // 세션 요청 함수
  const getSession = async () => {
    try {
      await axios.post("/api/getSession")
      .then(res => {
        if (res.data === '') {
          $(".buttonWrite").css("visibility", "hidden");
          return false;
        }
        setLogin(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

    // 전체 리스트를 가져오는 함수 --- ok
    const getList = async (page) => {
        try {
        await axios.get(`/api/boardCheck?page=${page}&pageSize=${pageSize}`)
        .then(res => {
            console.log(res.data);
            setList(res.data);
        });
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    }

    // 검색 결과를 가져오는 함수 -- ok
    const getSearchList = async (page) => {
        const Selec = $("#selec").val();
        const searchVal = $("#searchVal").val();
        try {
        await axios.get(`/api/boardSearch?page=${page}&pageSize=${pageSize}&selec=${Selec}&searchVal=${searchVal}`)
        .then(res => {
            setSearchList(res.data);
        });

        // 검색 결과를 가져왔을 때 currentPage 상태를 업데이트
        setCurrentSearchPage(page);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    }

    //카테고리 전체보기(0)클릭시 카테고리 값을 false 로 바꿈으로 list와 hot 출력함 -- ok
    const handleCateClick = async (page,catemenu) => {
        if (catemenu == "전체보기") {
            setInputCate('전체보기');
            setSearchList([]);
            setInputSearch('');
            setInputCSearch('');
        } else  {
            setInputCSearch('');
            setCurrentCatePage(1);
            setInputCate(catemenu);
            getCate(page,catemenu);
        }
    }

    //카테고리 전용 함수들 -- ok
    const getCate = async (page,catemenu) => {
        try {
        await axios.get(`/api/boardCate?page=${page}&pageSize=${pageSize}&catemenu=${catemenu}`)
        .then(res => {
            setCateList(res.data);
            // 검색 결과를 가져왔을 때 currentPage 상태를 업데이트
            setCurrentCatePage(page);
        });
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    }

    // 카테고리 검색 -- ok
    const cateSearch = () => {
        setInputCSearch($("#cateVal").val()); // 사용자가 입력한 값을 변수에 넣었음
        if (inputCSearch != '') {
          setCateSearchPage(1); // 검색할 때 currentPage를 1로 초기화하여 첫 번째 페이지부터 검색 결과를 보여줌
          getCSearchList(1); //1번 페이지 리스트가꼬옴
        } else {
          alert("검색값을 입력하여주세요");
        }
    }

    // 카테고리 검색 결과를 가져오는 함수 -- ok
    const getCSearchList = async (page) => {
        const cateSelec = $("#cateSelec").val();
        const cateVal = $("#cateVal").val();
        const catemenu2 = inputCate;
        try {
        // const res = await axios.post(`/cateSearch`,data);
        const res = await axios.get(`/api/cateSearch?page=${page}&pageSize=${pageSize}&catemenu2=${catemenu2}&cateSelec=${cateSelec}&cateVal=${cateVal}`);
        console.log(res.data);
        setCSearchList(res.data);
        console.log("cspage==>"+page);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    }

  // 조회수 높은 5개 상단 표시 함수 -- ok
  const getHit = async () => {
    try {
      const res = await axios.get("/api/getHit");
      setHit(res.data);
    } catch (error) {
      console.error("데이터를 불러오는 중 에러 발생:", error);
    }
  }

  // 클릭 시 getSearchList()값 가져오는 함수
  const handleSearchClick =  async() => {
    setInputSearch($("#searchVal").val()); // 사용자가 입력한 값을 변수에 넣었음
    if (inputSearch != '') {
        setCurrentSearchPage(1); // 검색할 때 currentPage를 1로 초기화하여 첫 번째 페이지부터 검색 결과를 보여줌
        getSearchList(1); //1번 페이지 리스트가꼬옴
    } else {
      alert("검색값을 입력하여주세요");
    }
  }

  // 전체 게시판 가져옴
  useEffect(() => {
    getList(currentPage);
    getHit();
    setInputCate('전체보기');
  }, [currentPage]);

  useEffect(() =>  {
    getCate(CurrentCatePage,inputCate);
  }, [CurrentCatePage])
  

  //  검색페이지를 currentSearchPage로 셋팅해줌

  useEffect(() => {
    if (inputSearch !== '' && currentSearchPage > 0) {
        getSearchList(currentSearchPage);
    }
}, [currentSearchPage, inputSearch]);

//지금하는거
  useEffect(() => {
    if (inputCSearch !== '') {
      getCSearchList(cateSearchPage);
    }
}, [cateSearchPage, inputCSearch]);

getSession();

  return (
    <div className="view_mem">
      <Navi />


    {inputCate === '전체보기' && 
      <div className='searchform'>
        {/* 검색 폼 */}
        <form className='searchForm'>
          <select className='selec' id='selec'>
            <option value="boardWriter">작성자</option>
            <option value="boardTitle">글제목</option>
          </select>
          <input type='text' placeholder='all검색' id='searchVal' name='searchVal' className='buttonSearch' onChange={(e) => {setInputSearch(e.target.value); console.log(inputSearch)}}></input> &nbsp;
          <input type='button' value={"검색 하기"} className='buttonInput' onClick={handleSearchClick}></input>
          <input type='button' value={"글작성"} className='buttonWrite' onClick={() => {window.location.href="/boardWrite"}}></input>
        </form>
      </div>
    }

    {inputCate !== '전체보기' && 
      <div className='searchform2'>
        {/* 카테고리검색 폼 */}
        <form className='searchForm'>
          <select className='selec' id='cateSelec'>
            <option value="boardWriter">작성자</option>
            <option value="boardTitle">글제목</option>
          </select>
          <input type='text' placeholder='cate검색' id='cateVal' name='cateVal' className='buttonSearch' onChange={(e) => {setInputCSearch(e.target.value); console.log(inputCSearch)}}></input> &nbsp;
          <input type='button' value={"검색 하기"} className='buttonInput' onClick={cateSearch}></input>
          <input type='button' value={"글작성"} className='buttonWrite' onClick={() => {window.location.href="/boardWrite"}}></input>
        </form>
      </div>
    }

      <div className='bl_flex_box'>
        <div>
          <table className='tablehead'>
            <thead>
              <tr>
                <th className='boardNum'>글번호</th>
                <th className='boardTitle'>글제목</th>
                <th className='boardWriter'>작성자</th>
                <th className='boardDate'>작성일</th>
                <th className='boardHit'>조회수</th>
              </tr>
            </thead>
            <thead>
           
          </thead>
          <tbody>
  {/* 카테고리 출력하는 것 */}
  {/* 인기글 표시 */}
  {hit.map((hit2) => (
    <tr key={hit2.board_ID} className='hit'>
      <td><div className='hot'>HOT</div></td>
      <td className='bTitle'><a href={`/boardView?board_id=${hit2.board_ID}`}>{hit2.board_TITLE}</a></td>
      <td>{hit2.member_MEM_NNAME}</td>
      <td>{hit2.board_DATE}</td>
      <td>{hit2.board_VIEW}</td>
    </tr>
  ))}

    {/* {카테고리별 출력} */}
  {inputCate !== '전체보기' && !inputCSearch && catem.map((ctemm) => (
    <tr key={ctemm.board_ID} className='catem'>
      <td>{ctemm.board_ID}</td>
      <td className='bTitle'><a href={`/boardView?board_id=${ctemm.board_ID}`}>{ctemm.board_TITLE}</a></td>
      <td>{ctemm.member_MEM_NNAME}</td>
      <td>{ctemm.board_DATE}</td>
      <td>{ctemm.board_VIEW}</td>
    </tr>
  ))}

  {/* 카테고리 검색 출력 */}
  { inputCSearch && csearch.map((cslist) => (
    <tr key={cslist.board_ID} className='CSearch'>
      <td>{cslist.board_ID}</td>
      <td className='bTitle'><a href={`/boardView?board_id=${cslist.board_ID}`}>{cslist.board_TITLE}</a></td>
      <td>{cslist.member_MEM_NNAME}</td>
      <td>{cslist.board_DATE}</td>
      <td>{cslist.board_VIEW}</td>
    </tr>
  ))}

    {/* 검색된 내용 출력 search.length가 0인 경우 list.map 출력 */}
    {search.length > 0 && inputCate == '전체보기' && (
        search.map((result) => (
        <tr key={result.board_ID} className='reresult'>
            <td>{result.board_ID}</td>
            <td className='bTitle'><a href={`/boardView?board_id=${result.board_ID}`}>{result.board_TITLE}</a></td>
            <td>{result.member_MEM_NNAME}</td>
            <td>{result.board_DATE}</td>
            <td>{result.board_VIEW}</td>
        </tr>
        ))
    )}
    { search.length === 0 && inputCate == '전체보기' && (
        // 검색된 내용이 없으면 전체 리스트 출력
        list.map((board) => (
        /* 게시글 목록 표시 */
        <tr key={board.board_ID} className='boboard'>
            <td>{board.board_ID}</td>
            <td className='bTitle'><a href={`/boardView?board_id=${board.board_ID}`}>{board.board_TITLE}</a></td>
            <td>{board.member_MEM_NNAME}</td>
            <td>{board.board_DATE}</td>
            <td>{board.board_VIEW}</td>
        </tr>
        ))
    )}
      </tbody>
      </table>
        

        {/* 전체 리스트 페이징 */}
        <div className='paging'>
        {/* (전체o검색x카테x) */}
        {search.length === 0 && inputCate === '전체보기' && (
          <><><button className='previousBtn'
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전 페이지
          </button><span> &nbsp; 현재 페이지 : {currentPage} &nbsp;</span></><button className='nextBtn'
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={(list.length  < 30 )}
          >
              다음 페이지
            </button></>
        )}
        {/* search를 위한 페이징  (전체x검색o카테x)*/}
        {search.length > 0 && inputCate === '전체보기' && (
          <><><button className='previousBtn'
            onClick={() => setCurrentSearchPage(currentSearchPage - 1)}
            disabled={currentSearchPage === 1}
          >
            이전 페이지
          </button><span> &nbsp; 현재 페이지 : {currentSearchPage} &nbsp;</span></><button className='nextBtn'
            onClick={() => setCurrentSearchPage(currentSearchPage + 1)}
            disabled={(search.length < 30 ) }
            >
              다음 페이지
            </button></>
        )}

{/* CATEsearch를 위한 페이징 */}
{inputCSearch !== '' && (
  <>
    <button className='previousBtn'
      onClick={() => setCateSearchPage(cateSearchPage - 1)}
      disabled={cateSearchPage === 1}
    >
      이전 페이지
    </button>
    <span> &nbsp; 현재 페이지 : {cateSearchPage} &nbsp;</span>
    <button className='nextBtn'
      onClick={() => setCateSearchPage(cateSearchPage + 1)}
      disabled={(csearch.length < 30)}
    >
      다음 페이지
    </button>
  </>
)}

       
        {/* cate 만 search 말고 */}
          {inputCate !== '전체보기' &&!inputCSearch && (
            <div>
              <button className='previousBtn'
                onClick={() => {
                  setCurrentCatePage(CurrentCatePage - 1);
                }}
                disabled={CurrentCatePage === 1}
              >
                이전 페이지
              </button>
              <span> &nbsp; 현재 페이지 : {CurrentCatePage} &nbsp;</span>
              <button className='nextBtn'
                onClick={() => {
                  setCurrentCatePage(CurrentCatePage + 1);
                }}
                disabled={catem.length < 30}
              >
                다음 페이지
              </button>
            </div>
          )}
        </div>
        </div>
       
        <div className='cateTable'>
         <ul className='cate'><h1 className='catemain'>카테고리</h1>
            <li id="cate1" name="cate1" className="gohome" onClick={() => handleCateClick(1,"전체보기")}>전체보기</li>
            <li id="cate1" name="cate1" className="gohome1" onClick={() => handleCateClick(1,"반려견자랑")}>반려견 자랑</li>
            <li id="cate2" name="cate2" className="gohome1" onClick={() => handleCateClick(1,"동물병원추천")}>동물병원 추천</li>
            <li id="cate3" name="cate3" className="gohome1" onClick={() => handleCateClick(1,"애견카페추천")}>애견카페 추천</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
