import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import "./Practionners.css";

interface Professional {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  city: string;
  contact: string;
}

const MesPraticiens: React.FC = () => {
  // États pour les professionnels
  const [healthProfessionals, setHealthProfessionals] = useState<
    Professional[]
  >(() => {
    const saved = localStorage.getItem("healthProfessionals");
    return saved ? JSON.parse(saved) : [];
  });
  const [complementaryTherapies, setComplementaryTherapies] = useState<
    Professional[]
  >(() => {
    const saved = localStorage.getItem("complementaryTherapies");
    return saved ? JSON.parse(saved) : [];
  });

  // États pour les formulaires
  const [newHealthProfessional, setNewHealthProfessional] =
    useState<Professional>({
      id: "",
      firstName: "",
      lastName: "",
      specialty: "",
      city: "",
      contact: "",
    });
  const [newComplementaryTherapy, setNewComplementaryTherapy] =
    useState<Professional>({
      id: "",
      firstName: "",
      lastName: "",
      specialty: "",
      city: "",
      contact: "",
    });

  useEffect(() => {
    localStorage.setItem(
      "healthProfessionals",
      JSON.stringify(healthProfessionals)
    );
    localStorage.setItem(
      "complementaryTherapies",
      JSON.stringify(complementaryTherapies)
    );
  }, [healthProfessionals, complementaryTherapies]);

  const handleAddHealthProfessional = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newHealthProfessional.firstName &&
      newHealthProfessional.lastName &&
      newHealthProfessional.specialty &&
      newHealthProfessional.city
    ) {
      const professional = {
        ...newHealthProfessional,
        id: Date.now().toString(),
      };
      setHealthProfessionals([...healthProfessionals, professional]);
      setNewHealthProfessional({
        id: "",
        firstName: "",
        lastName: "",
        specialty: "",
        city: "",
        contact: "",
      });
    }
  };

  const handleAddComplementaryTherapy = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newComplementaryTherapy.firstName &&
      newComplementaryTherapy.lastName &&
      newComplementaryTherapy.specialty &&
      newComplementaryTherapy.city
    ) {
      const therapy = {
        ...newComplementaryTherapy,
        id: Date.now().toString(),
      };
      setComplementaryTherapies([...complementaryTherapies, therapy]);
      setNewComplementaryTherapy({
        id: "",
        firstName: "",
        lastName: "",
        specialty: "",
        city: "",
        contact: "",
      });
    }
  };

  const deleteHealthProfessional = (id: string) => {
    setHealthProfessionals(
      healthProfessionals.filter((prof) => prof.id !== id)
    );
  };

  const deleteComplementaryTherapy = (id: string) => {
    setComplementaryTherapies(
      complementaryTherapies.filter((therapy) => therapy.id !== id)
    );
  };

  return (
    <Container fluid className="practionners-container">
      <h1 className="practionners-title">Mes Praticiens</h1>
      <Row className="cards-row">
        {/* Carte des professionnels de santé */}
        <Col xs={12} md={6} className="d-flex">
          <Card className="practionners-card health-professionals-card flex-fill">
            <Card.Body>
              <h3 className="mb-3">Professionnels de santé</h3>
              <Form onSubmit={handleAddHealthProfessional} className="mb-4">
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Prénom"
                    value={newHealthProfessional.firstName}
                    onChange={(e) =>
                      setNewHealthProfessional({
                        ...newHealthProfessional,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Nom"
                    value={newHealthProfessional.lastName}
                    onChange={(e) =>
                      setNewHealthProfessional({
                        ...newHealthProfessional,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    as="select"
                    placeholder="Spécialité"
                    value={newHealthProfessional.specialty}
                    onChange={(e) =>
                      setNewHealthProfessional({
                        ...newHealthProfessional,
                        specialty: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Sélectionner une spécialité...</option>
                    <option value="Neurologue">Neurologue</option>
                    <option value="Infirmier / Infirmière">
                      Infirmier / Infirmière
                    </option>
                    <option value="Aide-soignant(e)">Aide-soignant(e)</option>
                    <option value="Kinésithérapeute">Kinésithérapeute</option>
                    <option value="Ergothérapeute">Ergothérapeute</option>
                    <option value="Professionnel APA">Professionnel APA</option>
                    <option value="Psychologue">Psychologue</option>
                    <option value="Ostéopathie">Ostéopathie</option>
                    <option value="Chirurgien">Chirurgien</option>
                    <option value="Medecin traitant">Medecin traitant</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Ville"
                    value={newHealthProfessional.city}
                    onChange={(e) =>
                      setNewHealthProfessional({
                        ...newHealthProfessional,
                        city: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Contact (téléphone ou email)"
                    value={newHealthProfessional.contact}
                    onChange={(e) =>
                      setNewHealthProfessional({
                        ...newHealthProfessional,
                        contact: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Ajouter
                </Button>
              </Form>

              <div className="professionals-list">
                {healthProfessionals.map((professional) => (
                  <Card
                    key={professional.id}
                    className="mb-2 professional-item"
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5>
                            {professional.firstName} {professional.lastName}
                          </h5>
                          <p className="mb-0">{professional.specialty}</p>
                          <p className="mb-0">{professional.city}</p>
                          <p className="mb-0">{professional.contact}</p>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            deleteHealthProfessional(professional.id)
                          }
                        >
                          Supprimer
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Carte des thérapies complémentaires */}
        <Col xs={12} md={6} className="d-flex">
          <Card className="practionners-card complementary-therapies-card flex-fill">
            <Card.Body>
              <h3 className="mb-3">Thérapies complémentaires</h3>
              <Form onSubmit={handleAddComplementaryTherapy} className="mb-4">
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Prénom"
                    value={newComplementaryTherapy.firstName}
                    onChange={(e) =>
                      setNewComplementaryTherapy({
                        ...newComplementaryTherapy,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Nom"
                    value={newComplementaryTherapy.lastName}
                    onChange={(e) =>
                      setNewComplementaryTherapy({
                        ...newComplementaryTherapy,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Spécialité"
                    value={newComplementaryTherapy.specialty}
                    onChange={(e) =>
                      setNewComplementaryTherapy({
                        ...newComplementaryTherapy,
                        specialty: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Ville"
                    value={newComplementaryTherapy.city}
                    onChange={(e) =>
                      setNewComplementaryTherapy({
                        ...newComplementaryTherapy,
                        city: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Contact (téléphone ou email)"
                    value={newComplementaryTherapy.contact}
                    onChange={(e) =>
                      setNewComplementaryTherapy({
                        ...newComplementaryTherapy,
                        contact: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Ajouter
                </Button>
              </Form>

              <div className="therapies-list">
                {complementaryTherapies.map((therapy) => (
                  <Card key={therapy.id} className="mb-2 therapy-item">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5>
                            {therapy.firstName} {therapy.lastName}
                          </h5>
                          <p className="mb-0">{therapy.specialty}</p>
                          <p className="mb-0">{therapy.city}</p>
                          <p className="mb-0">{therapy.contact}</p>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteComplementaryTherapy(therapy.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MesPraticiens;
