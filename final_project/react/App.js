import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Sign-up';
import ViewMem from './components/View_mem';
import LogOut from './components/LoggOut';
import Modi_mem from './components/Modi_mem';
import View_Dogs from './components/View_Dogs';
import Gat_home from './components/Gat_home';
import Gat_make from './components/Gat_make';
import Gat_view from './components/Gat_view';
import Board from './components/Board';
import BoardWrite from './components/BoardWrite';
import BoardView from './components/BoardView';
import PlanWrite from './components/PlanWrite';
import PlanView from './components/PlanView';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/view_mem" element={<ViewMem />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/modi_mem" element={<Modi_mem />} />
          <Route path="/mydogs" element={<View_Dogs />} />
          <Route path="/gat_home" element={<Gat_home />} />
          <Route path="/gat_make" element={<Gat_make />} />
          <Route path="/gat_view" element={<Gat_view />} />
          <Route path="/board" element={<Board />} />
          <Route path="/boardWrite" element={<BoardWrite />} />
          <Route path="/boardView" element={<BoardView />} />
          <Route path="/planWrite" element={<PlanWrite />} />
          <Route path="/planView" element={<PlanView />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
