import React from "react";
import { Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PatientLeftSidebar: React.FC = () => {
  const navLinks = [
    { path: "informations", label: "👤 Mes Informations" },
    { path: "synthesis", label: "📋 Synthèse" },
    { path: "practionners", label: "👨‍⚕️ Mes Praticiens" },
    { path: "documents", label: "📂 Mes Documents" },
    { path: "agenda", label: "📅 Agenda" },
  ];

  return (
    <Col className="bg-light vh-100 d-flex flex-column p-3">
      <div className="text-center mb-4">
        <img
          src="https://imgs.search.brave.com/LiuI83vxS82ZNllheTy12yvXkniiyov184EFUIuThsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzYxL2Y3/LzVlLzYxZjc1ZWE5/YTY4MGRlZjJlZDFj/NjkyOWZlNzVhZWVl/LmpwZw"
          alt="Profil utilisateur"
          title="Photo de profil"
          className="rounded-circle mb-2"
          style={{ width: "100px", height: "100px" }}
        />
        <h5>Nom Utilisateur</h5>
        <p className="text-muted">Mon compte</p>
      </div>

      <Nav className="flex-column">
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className="nav-link py-3"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "blue" : "black",
            })}
          >
            {label}
          </NavLink>
        ))}
      </Nav>
    </Col>
  );
};

export default PatientLeftSidebar;
