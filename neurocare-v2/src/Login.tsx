import React, { useState } from 'react';
import logo from './assets/logo.svg';
import './Login.css';

const forgotPassword = (): void => {
  console.log('Forgot password clicked');
};

const Login = (): React.ReactNode => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // État pour afficher les messages

  return (
    <div className="login">
      <form onSubmit={(e) => {
        e.preventDefault();
        setMessage(`Tentative de connexion avec l'email : ${email}`);
      }}>
        <img src={logo} className="App-logo-login" alt="logo" />
        
        <div className="form-group">
          <label htmlFor="email">Login</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <a onClick={() => forgotPassword()} href="#" className="forgot-pass">Mot De Passe Oublié</a>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" onClick={() => 
            {setMessage("Enregistrement en cours...");
            setTimeout(() => 
              {
              setMessage("Bienvenue !");},
               2000);
            }
            }>Se Connecter</button>

          <button className="btn btn-secondary" type="button" onClick={() => 
            {setMessage("Enregistrement en cours...");
            setTimeout(() => 
              {
              setMessage("Bien enregistré !");},
               2000);
            }
            }>S'inscrire</button>
        </div>

        {/* Affichage du message */}
        {message && (
          <div style={{ marginTop: '20px', color: '#4ecdc4', fontWeight: 'bold', textAlign: 'center' }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
