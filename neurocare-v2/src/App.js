import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './pp.svg';
import Professionals from './Professionals';
import Patients from './Patients';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './pp.svg';
import Professionals from './Professionals';
import Patients from './Patients';
import './App.css';

function App() {
  return (
    <Router>
      <div className="NeuroCare">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="title-container">
            <h1 className="title">NeuroCare</h1>
            <p className="subtitle">Slogan</p>
          </div>
          <div className="button-container">
            <Link to="/professionals">
              <button className="user-button left">Professionals</button>
            </Link>
            <Link to="/patients">
              <button className="user-button right">Patient</button>
            </Link>
          </div>
        </header>

        <Routes>
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

