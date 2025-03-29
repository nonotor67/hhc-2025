import React from "react";
import { Col } from "react-bootstrap";

const PatientRightSidebar: React.FC = () => {
  return (
    <Col className="bg-light vh-100 d-flex flex-column p-3 border-end">
      <h3 className="text-center mb-4">Mes Informations</h3>
    </Col>
  );
};

export default PatientRightSidebar;
