import React, { useState } from 'react';
import logo from './assets/logo.svg';
import './App.css';

import Patients from './Patients';
import Professionals from './Professionals';

type PageType = 'MainPage' | 'Patients' | 'Professionals';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('MainPage');

  // Fonction pour changer de page
  const navigateTo = (page: PageType): void => {
    setCurrentPage(page);
  };

  // Afficher la page correspondante
  const renderPage = (): React.ReactNode => {
    if (currentPage === 'Patients') 
      return <Patients />;
    else if (currentPage === 'Professionals')
      return <Professionals />;
    else {
      return (
        <div className="NeuroCare">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="title-container">
              <h1 className="title">NeuroCare</h1>
              <p className="subtitle">Avancer Ensemble</p>
            </div>
            <div className='nav-container'>
              <nav className='button-container'>
                <button className='user-button left' onClick={() => navigateTo('Professionals')}>Je suis professionnel de santé</button>
                <button className='user-button right' onClick={() => navigateTo('Patients')}>Je suis patients</button>
              </nav>
            </div>
          </header>
        </div>
      );
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default App;