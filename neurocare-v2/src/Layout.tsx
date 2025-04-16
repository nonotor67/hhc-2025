import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import PatientLeftSidebar from "./components/PatientLeftSidebar";
import PatientRightSidebar from "./components/PatientRightSidebar";
import {Outlet} from "react-router-dom";

import "./Layout.css";

const Layout: React.FC = () => {
    return (
        <Container fluid className="vh-100 d-flex flex-column">
            <Row>
                <Col xs={2} className="right-sidebar">
                    <PatientLeftSidebar/>
                </Col>
                <Col xs={8} className="content middle-content">
                    <Outlet/>
                </Col>
                <Col xs={2} className="left-sidebar">
                    <PatientRightSidebar/>
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
