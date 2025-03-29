import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./assets/logo.svg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Simuler une connexion réussie
      setTimeout(() => {
        navigate("/patients/synthesis");
      }, 1000);
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleRegister = () => {
    navigate("/patients/register");
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Espace patient</h2>
        <p className="login-subtitle">
          Connectez-vous pour accéder à votre espace
        </p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="password">Mot de passe</label>
              <a href="#" className="forgot-password">
                Mot de passe oublié
              </a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              Se connecter
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleRegister}
            >
              S'inscrire
            </button>
          </div>
        </form>
        <p className="footer">© 2025 NeuroCare. Tous droits réservés.</p>
      </div>
    </div>
  );
}
