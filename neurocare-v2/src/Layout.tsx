import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <Container fluid className="p-0">
      <Row>
        <Col xs={2} className="bg-light sidebar">
          <Sidebar />
        </Col>
        <Col xs={8} className="content">
          <Outlet />
        </Col>
        <Col xs={2} className="bg-light sidebar">
          <div className="p-4">
            <h5>Notifications</h5>
            <p>Vous avez 3 nouvelles notifications.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
