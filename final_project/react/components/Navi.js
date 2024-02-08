import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/nav.css';
import Session from 'react-session-api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import $ from 'jquery';

function Navi() {

  const [login, setLogin] = useState(false);

  async function check_login() {
      const res = await (await axios.get("/api/getSession")).data;
      console.log(res);
      if (res !== '') {
        setLogin(true);
        $(".loginout").html("로그아웃");
        $(".loginout").attr("href","/logout");
        $(".signupviewmem").html("회원정보");
        $(".signupviewmem").attr("href","/view_mem");
      }
  }

  useEffect(() => {
    check_login();
  },[])

  return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className='nv'>
          <Navbar.Brand href="/">걔모임</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='loginout' href="/login">로그인</Nav.Link>
              <Nav.Link className='signupviewmem' href="/sign_up">회원가입</Nav.Link>
              {login && <Nav.Link className='viewMyDogs' href="/mydogs">반려견</Nav.Link>}
              <Nav.Link className='gatheringLink' href="/gat_home">모임</Nav.Link>
              <Nav.Link className='boardLink' href="/board">게시판</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Navi;