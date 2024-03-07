import React, {Component} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Register from './components/Register';


class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />

                </Routes>
            </Router>
        );
    }
}


// function selectData(){
//   axios.post('/testData',["가","나","다"])
//       .then(function (res){
//         console.log(res)
//       });
// }
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo"/>
//         <div>
//           <button onClick={() => selectData()}>조회</button>
//         </div>
//       </header>
//     </div>
//   );
// }

export default App;
