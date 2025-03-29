import React from "react";
import { Card } from "react-bootstrap";

const MesDocuments: React.FC = () => {
  return (
    <Card className="p-4 shadow-sm">
      <Card.Title>Mes Documents</Card.Title>
      <Card.Body>
        <p>Accédez à vos documents personnels.</p>
      </Card.Body>
    </Card>
  );
};

export default MesDocuments;
