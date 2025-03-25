import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { FaProjectDiagram, FaUserCog, FaClipboardList, FaArrowRight, FaUsers, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "80vh", padding: "20px" }}>
            <Container className="mt-4">
                <h2 className="mb-4 text-white p-3 d-flex justify-content-left display-6" style={{ backgroundColor: '#0b5eb0', borderRadius: 5 }}>Resource Management System</h2>

                <Row>
                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100" style={{ backgroundColor: "#ffffff" }}>
                            <CardBody className="text-center d-flex flex-column justify-content-between">
                                <div>
                                    <FaProjectDiagram size={40} color="#007bff" />
                                    <CardTitle tag="h5" className="mt-3">Projects</CardTitle>
                                    <CardText><code>Manage your projects</code></CardText>
                                </div>
                                <Link to="/projects" className="btn btn-primary d-flex justify-content-center align-items-center gap-2 w-100">
                                    <FaArrowRight /> Go to Projects
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100" style={{ backgroundColor: "#ffffff" }}>
                            <CardBody className="text-center d-flex flex-column justify-content-between">
                                <div>
                                    <FaUsers size={40} color="#007bff" />
                                    <CardTitle tag="h5" className="mt-3">Assign Developers</CardTitle>
                                    <CardText><code>Raise request to assign Devs</code></CardText>
                                </div>
                                <Link to="/assign-devs" className="btn btn-success d-flex justify-content-center align-items-center gap-2 w-100">
                                    <FaUserCog /> Assign Devs
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100" style={{ backgroundColor: "#ffffff" }}>
                            <CardBody className="text-center d-flex flex-column justify-content-between">
                                <div>
                                    <FaClipboardList size={40} color="#007bff" />
                                    <CardTitle tag="h5" className="mt-3">Requests</CardTitle>
                                    <CardText><code>View raised Requests status</code></CardText>
                                </div>
                                <Link to="/requests" className="btn btn-warning text-white d-flex justify-content-center align-items-center gap-2 w-100">
                                    <FaTicketAlt /> Manage Tickets
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default Home;