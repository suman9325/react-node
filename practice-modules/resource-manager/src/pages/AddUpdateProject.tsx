import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaProjectDiagram, FaUserCog, FaClipboardList, FaArrowRight, FaUsers, FaTicketAlt, FaSave, FaHome, FaCheck, FaTimes } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProjectCreationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project name is required"),
    estimatedDuration: Yup.string().required("Estimated duration is required"),
    frontendDevs: Yup.number().min(0, "Must be a positive number").required("Required"),
    backendDevs: Yup.number().min(0, "Must be a positive number").required("Required"),
    qaRequired: Yup.number().min(0, "Must be a positive number").required("Required"),
    specialRequirements: Yup.string(),
    projectLocation: Yup.string().required("Project location is required"),
    notes: Yup.string()
});

const AddUpdateProject = () => {
    return (
        <Container className="mt-4">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/"><FaHome />Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/projects">Project Listing</Link></BreadcrumbItem>
                <BreadcrumbItem active>Add/Update Project</BreadcrumbItem>
            </Breadcrumb>
            <Card className="shadow-sm border-0 p-4">
                <CardBody>
                    <h4 className="mb-4 text-white p-3 d-flex justify-content-left display-6" style={{ backgroundColor: '#0b5eb0', borderRadius: 5 }}>Add Project</h4>

                    <Formik
                        initialValues={{
                            projectName: "",
                            estimatedDuration: "",
                            frontendDevs: "",
                            backendDevs: "",
                            qaRequired: "",
                            specialRequirements: "",
                            projectLocation: "",
                            notes: ""
                        }}
                        validationSchema={ProjectCreationSchema}
                        onSubmit={(values) => {
                            console.log("Project Created:", values);
                        }}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup className="text-start">
                                            <Label for="projectName">Project Name</Label>
                                            <Field as={Input} type="text" name="projectName" id="projectName" placeholder="Enter project name" />
                                            <ErrorMessage name="projectName" component="div" className="text-danger" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="text-start">
                                            <Label for="estimatedDuration">Estimated Duration</Label>
                                            <Field as={Input} type="text" name="estimatedDuration" id="estimatedDuration" placeholder="e.g. 6 months" />
                                            <ErrorMessage name="estimatedDuration" component="div" className="text-danger" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup className="text-start">
                                            <Label for="frontendDevs">Frontend Devs Required</Label>
                                            <Field as={Input} type="number" name="frontendDevs" id="frontendDevs" placeholder="0" />
                                            <ErrorMessage name="frontendDevs" component="div" className="text-danger" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup className="text-start">
                                            <Label for="backendDevs">Backend Devs Required</Label>
                                            <Field as={Input} type="number" name="backendDevs" id="backendDevs" placeholder="0" />
                                            <ErrorMessage name="backendDevs" component="div" className="text-danger" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup className="text-start">
                                            <Label for="qaRequired">QA Required</Label>
                                            <Field as={Input} type="number" name="qaRequired" id="qaRequired" placeholder="0" />
                                            <ErrorMessage name="qaRequired" component="div" className="text-danger" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup className="text-start">
                                    <Label for="specialRequirements">Special Requirements</Label>
                                    <Field as={Input} type="text" name="specialRequirements" id="specialRequirements" placeholder="Enter any special requirements" />
                                </FormGroup>
                                <FormGroup className="text-start">
                                    <Label for="projectLocation">Project Location / Repo Path</Label>
                                    <Field as={Input} type="text" name="projectLocation" id="projectLocation" placeholder="Enter project repo path" />
                                    <ErrorMessage name="projectLocation" component="div" className="text-danger" />
                                </FormGroup>
                                <FormGroup className="text-start">
                                    <Label for="notes">Description</Label>
                                    <Field as={Input} type="textarea" name="notes" id="notes" placeholder="Project Description" />
                                </FormGroup>
                                <div className="d-flex justify-content-end gap-2 mt-3">
                                    <Button color="danger"><FaTimes /> Cancel</Button>
                                    <Button color="success"><FaCheck /> Submit</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </Container>
    );
};

export default AddUpdateProject;

