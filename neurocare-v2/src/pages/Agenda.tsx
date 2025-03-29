import React from "react";
import { Card } from "react-bootstrap";

const Agenda: React.FC = () => {
  return (
    <Card className="p-4 shadow-sm">
      <Card.Title>Agenda</Card.Title>
      <Card.Body>
        <p>Consultez vos rendez-vous.</p>
      </Card.Body>
    </Card>
  );
};

export default Agenda;
