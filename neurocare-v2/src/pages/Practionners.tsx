import React from "react";
import { Card } from "react-bootstrap";

const MesPraticiens: React.FC = () => {
  return (
    <Card className="p-4 shadow-sm">
      <Card.Title>Mes Praticiens</Card.Title>
      <Card.Body>
        <p>Liste de vos praticiens.</p>
      </Card.Body>
    </Card>
  );
};

export default MesPraticiens;
