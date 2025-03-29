import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import "./Informations.css";

const MesInfo: React.FC = () => {
  const defaultFirstName = import.meta.env.VITE_DEFAULT_FIRSTNAME || "Prénom";
  const defaultLastName = import.meta.env.VITE_DEFAULT_LASTNAME || "Nom";

  const [firstName, setFirstName] = useState(() => localStorage.getItem("firstName") || defaultFirstName);
  const [lastName, setLastName] = useState(() => localStorage.getItem("lastName") || defaultLastName);
  const [height, setHeight] = useState(() => localStorage.getItem("height") || "170");
  const [weight, setWeight] = useState(() => localStorage.getItem("weight") || "65");
  const [bloodGroup, setBloodGroup] = useState(() => localStorage.getItem("bloodGroup") || "A+");
  const [age, setAge] = useState(() => localStorage.getItem("age") || "30");
  const [allergies, setAllergies] = useState(() => localStorage.getItem("allergies") || "Aucune");

  useEffect(() => {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
  }, [firstName, lastName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sauvegarder les valeurs dans le localStorage
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);
    localStorage.setItem("bloodGroup", bloodGroup);
    localStorage.setItem("age", age);
    localStorage.setItem("allergies", allergies);
    
    alert(
      `Profil mis à jour :\nNom : ${lastName}\nPrénom : ${firstName}\nTaille : ${height} cm\nPoids : ${weight} kg\nGroupe sanguin : ${bloodGroup}\nÂge : ${age} ans\nAllergies : ${allergies}`
    );

    // Rafraîchir la page après l'alerte
    window.location.reload();
  };

  return (
    <Container fluid className="info-container">
      <h1 className="info-title">Mes Infos</h1>
      <Card className="info-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={defaultFirstName}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={defaultLastName}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formHeight">
                  <Form.Label>Taille (cm)</Form.Label>
                  <Form.Control
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Ex : 170"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formWeight">
                  <Form.Label>Poids (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Ex : 65"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formBloodGroup">
                  <Form.Label>Groupe Sanguin</Form.Label>
                  <Form.Control
                    as="select"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="A+">A+</option>
                    <option value="A−">A−</option>
                    <option value="B+">B+</option>
                    <option value="B−">B−</option>
                    <option value="AB+">AB+</option>
                    <option value="AB−">AB−</option>
                    <option value="O+">O+</option>
                    <option value="O−">O−</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formAge">
                  <Form.Label>Âge</Form.Label>
                  <Form.Control
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Ex : 30"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formAllergies">
              <Form.Label>Allergies</Form.Label>
              <Form.Control
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="Ex : pollen, gluten..."
              />
            </Form.Group>

            <div className="text-center mt-4">
              <Button type="submit" variant="primary">
                Enregistrer les informations
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MesInfo;
