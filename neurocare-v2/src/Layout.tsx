import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PatientLeftSidebar from "./components/PatientLeftSidebar";
import PatientRightSidebar from "./components/PatientRightSidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row>
        <Col xs={2} className="bg-light">
          <PatientLeftSidebar />
        </Col>
        <Col xs={8} className="content">
          <Outlet />
        </Col>
        <Col xs={2} className="bg-light">
          <PatientRightSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
