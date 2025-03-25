import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Table, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FaEdit, FaTrash, FaPlus, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectListing = () => {
  const projects = [
    { id: 1, name: "Project Alpha", duration: "6 months", frontendDevs: 2, backendDevs: 3, qa: 1, location: "repo-url-1" },
    { id: 2, name: "Project Beta", duration: "8 months", frontendDevs: 3, backendDevs: 4, qa: 2, location: "repo-url-2" }
  ];

  return (
    <Container className="mt-4">
      <Breadcrumb>
        <BreadcrumbItem><Link to="/"><FaHome />Home</Link></BreadcrumbItem>
        <BreadcrumbItem active>Project Listing</BreadcrumbItem>
      </Breadcrumb>
      <Card className="shadow-sm border-0 p-4">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* <h3 className="text-primary">Project Listing</h3> */}
            <h4 className="mb-4 text-white p-3 d-flex justify-content-left display-6" style={{ backgroundColor: '#0b5eb0', borderRadius: 5 }}>Project Listing</h4>

            <Link to={'/add-project'} color="success" className="btn btn-primary d-flex align-items-center gap-2">
              <FaPlus /> Add Project
            </Link>
          </div>
          <Table bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Duration</th>
                <th>Frontend Devs</th>
                <th>Backend Devs</th>
                <th>QA</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.name}</td>
                  <td>{project.duration}</td>
                  <td>{project.frontendDevs}</td>
                  <td>{project.backendDevs}</td>
                  <td>{project.qa}</td>
                  <td>{project.location}</td>
                  <td>
                    <FaEdit className="me-2"/>
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ProjectListing;
