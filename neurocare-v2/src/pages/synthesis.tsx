import React from "react";
import { Card } from "react-bootstrap";

const Synthese: React.FC = () => {
  return (
    <Card className="p-4 shadow-sm">
      <Card.Title>Synthèse</Card.Title>
      <Card.Body>
        <p>Voici un résumé de vos données.</p>
      </Card.Body>
    </Card>
  );
};

export default Synthese;
