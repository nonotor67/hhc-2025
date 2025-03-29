import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import logo from "./assets/logo.svg";
import "./App.css";

import Professionals from "./Professionals";
import PatientLayout from "./Layout";
import Agenda from "./pages/Agenda";
import Informations from "./pages/Informations";
import Synthesis from "./pages/synthesis";
import Practionners from "./pages/Practionners";
import Documents from "./pages/Documents";
import Login from "./Login";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="NeuroCare">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="title-container">
          <h1 className="title">NeuroCare</h1>
          <p className="subtitle">Avancer Ensemble</p>
        </div>
        <div className="nav-container">
          <nav className="button-container">
            <button
              className="user-button left"
              onClick={() => navigate("/Professionals")}
            >
              Je suis professionnel de santé
            </button>
            <button
              className="user-button right"
              onClick={() => navigate("/patients/login")}
            >
              Je suis patient
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/patients/login" element={<Login />}></Route>
      <Route path="/patients" element={<PatientLayout />}>
        <Route path="agenda" element={<Agenda />} />
        <Route path="informations" element={<Informations />} />
        <Route path="synthesis" element={<Synthesis />} />
        <Route path="practionners" element={<Practionners />} />
        <Route path="documents" element={<Documents />} />
      </Route>
      <Route path="/professionals" element={<></>}></Route>
    </Routes>
  );
};

export default App;
