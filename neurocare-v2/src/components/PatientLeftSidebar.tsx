import React, {useState, useEffect} from "react";
import {Col, Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const PatientLeftSidebar: React.FC = () => {
    const defaultFirstName = import.meta.env.VITE_DEFAULT_FIRSTNAME || "Prénom";
    const defaultLastName = import.meta.env.VITE_DEFAULT_LASTNAME || "Nom";
    
    const [firstName, setFirstName] = useState(
        () => localStorage.getItem("firstName") || defaultFirstName
    );
    const [lastName, setLastName] = useState(
        () => localStorage.getItem("lastName") || defaultLastName
    );
    
    // Écouter les changements dans le localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setFirstName(localStorage.getItem("firstName") || defaultFirstName);
            setLastName(localStorage.getItem("lastName") || defaultLastName);
        };
        
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [defaultFirstName, defaultLastName]);
    
    const navLinks = [
        {path: "accueil", label: "📂 Accueil"},
        {path: "informations", label: "👤 Mes Informations"},
        {path: "practionners", label: "👨‍⚕️ Mes Praticiens"},
        {path: "documents", label: "📂 Mes Documents"},
    ];
    
    return (
        <Col className="right-sidebar vh-100 d-flex flex-column p-3">
            <div className="text-center mb-4">
                <img
                    src="https://imgs.search.brave.com/LiuI83vxS82ZNllheTy12yvXkniiyov184EFUIuThsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzYxL2Y3/LzVlLzYxZjc1ZWE5/YTY4MGRlZjJlZDFj/NjkyOWZlNzVhZWVl/LmpwZw"
                    alt="Profil utilisateur"
                    title="Photo de profil"
                    className="rounded-circle mb-2"
                    style={{width: "100px", height: "100px"}}
                />
                <h5 className="text-white">
                    {firstName} {lastName}
                </h5>
                <p className="text-white">Mon compte</p>
            </div>
            
            <Nav className="flex-column">
                {navLinks.map(({path, label}) => (
                    <NavLink
                        key={path}
                        to={path}
                        className="nav-link py-3"
                        style={({isActive}) => ({
                            fontWeight: isActive ? "bold" : "normal",
                            color: "white",
                            backgroundColor: isActive ? "#607d8b" : "transparent",
                            fontSize: "20px",
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
