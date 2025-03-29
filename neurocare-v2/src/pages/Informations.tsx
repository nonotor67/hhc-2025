import React from "react";
import { Card } from "react-bootstrap";

const MesInfo: React.FC = () => {
  return (
    <Card className="p-4 shadow-sm">
      <Card.Title>Mes Informations</Card.Title>
      <Card.Body>
        <p>Bienvenue dans votre espace personnel.</p>
      </Card.Body>
    </Card>
  );
};

export default MesInfo;
