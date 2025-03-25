import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, Badge, CardHeader, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { FaUsers, FaCode, FaServer, FaBug, FaAudioDescription, FaProjectDiagram, FaTimes, FaCheck, FaUser, FaBriefcase } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import Select, { GroupBase } from "react-select";

interface OptionType {
    value: string;
    label: string;
    techStack: string;
    experience: string;
    isDisabled: boolean
}

interface Developer {
    value: string;
    label: string;
    techStack: string;
    experience: string;
}

interface Project {
    id: number;
    name: string;
    status: string;
    description: string;
    requirements: string[];
    workingDevs: Record<string, Developer[]>;
    requiredDevs: Record<string, number>;
}

const AssignDevs = () => {
    const projectStatusColors = {
        "In Development": "primary",
        "Move to QA": "warning",
        "Completed": "success",
        "In Queue": "secondary"
    };

    const developerColors = {
        "Frontend": "primary",
        "Backend": "secondary",
        "QA": "success"
    }

    const projects = [
        {
            id: 1,
            name: "Project Alpha",
            status: "In Development",
            description: "A cutting-edge e-commerce platform designed to enhance online shopping experiences.",
            requirements: [
                "Responsive UI with React",
                "Payment gateway integration",
                "Real-time order tracking",
                "Product recommendation system"
            ],
            workingDevs: {
                Frontend: [{ value: "dev1", label: "Alice", techStack: "React, JavaScript", experience: "3 years" }],
                Backend: [{ value: "dev2", label: "Bob", techStack: "Node.js, Express", experience: "5 years" }],
                QA: []
            },
            requiredDevs: {
                Frontend: 1,
                Backend: 1,
                QA: 1
            }
        },
        {
            id: 2,
            name: "Project Beta",
            status: "Move to QA",
            description: "An AI-powered chatbot service for customer support automation.",
            requirements: [
                "Natural Language Processing (NLP) integration",
                "Multi-platform support (Web & Mobile)",
                "Live chat escalation to human agents",
                "Sentiment analysis feature"
            ],
            workingDevs: {
                Frontend: [{ value: "dev3", label: "Charlie", techStack: "Vue.js, JavaScript", experience: "4 years" }],
                Backend: [
                    { value: "dev4", label: "David", techStack: "Python, Django", experience: "4 years" },
                    { value: "dev5", label: "Eve", techStack: "Ruby on Rails", experience: "3 years" }
                ],
                QA: [{ value: "dev6", label: "Frank", techStack: "Selenium, Cypress", experience: "2 years" }]
            },
            requiredDevs: {
                Frontend: 2,
                Backend: 1,
                QA: 1
            }
        },
        {
            id: 3,
            name: "Project Gamma",
            status: "Completed",
            description: "A data visualization dashboard for business analytics and performance tracking.",
            requirements: [
                "Interactive charts and graphs",
                "Role-based access control",
                "Integration with third-party APIs",
                "Export reports as CSV/PDF"
            ],
            workingDevs: {
                Frontend: [
                    { value: "dev7", label: "Grace", techStack: "Angular, TypeScript", experience: "5 years" }
                ],
                Backend: [
                    { value: "dev8", label: "Hank", techStack: "Java, Spring Boot", experience: "6 years" }
                ],
                QA: [
                    { value: "dev9", label: "Ivy", techStack: "TestCafe, Jest", experience: "3 years" }
                ]
            },
            requiredDevs: {
                Frontend: 0,
                Backend: 0,
                QA: 0
            }
        },
        {
            id: 4,
            name: "Project Delta",
            status: "In Queue",
            description: "A mobile-first fitness tracking application with personalized workout plans.",
            requirements: [
                "User authentication & profile management",
                "Integration with wearable devices",
                "AI-powered workout recommendations",
                "Gamification features with leaderboards"
            ],
            workingDevs: {
                Frontend: [],
                Backend: [],
                QA: []
            },
            requiredDevs: {
                Frontend: 2,
                Backend: 2,
                QA: 1
            }
        },
        {
            id: 5,
            name: "Project Epsilon",
            status: "In Development",
            description: "A decentralized finance (DeFi) application enabling peer-to-peer lending and borrowing.",
            requirements: [
                "Blockchain smart contract development",
                "Secure digital wallet integration",
                "Crypto payment gateway",
                "Real-time transaction tracking"
            ],
            workingDevs: {
                Frontend: [{ value: "dev10", label: "Jake", techStack: "React, Web3.js", experience: "4 years" }],
                Backend: [{ value: "dev11", label: "Kara", techStack: "Solidity, Ethereum", experience: "3 years" }],
                QA: []
            },
            requiredDevs: {
                Frontend: 1,
                Backend: 2,
                QA: 1
            }
        },
        {
            id: 6,
            name: "Project Zeta",
            status: "Move to QA",
            description: "A cloud-based document management system for enterprise collaboration.",
            requirements: [
                "Document storage with version control",
                "User access management & permissions",
                "OCR for text extraction from images",
                "Seamless integration with Google Drive and OneDrive"
            ],
            workingDevs: {
                Frontend: [{ value: "dev12", label: "Leo", techStack: "React, Redux", experience: "5 years" }],
                Backend: [{ value: "dev13", label: "Mona", techStack: "Node.js, MongoDB", experience: "4 years" }],
                QA: [{ value: "dev14", label: "Nick", techStack: "Cypress, Mocha", experience: "3 years" }]
            },
            requiredDevs: {
                Frontend: 1,
                Backend: 1,
                QA: 0
            }
        }
    ];

    const developers: Record<string, OptionType[]> = {
        Frontend: [
            { value: "dev1", label: "Alice", techStack: "React, JavaScript", experience: "3 years", isDisabled: false },
            { value: "dev2", label: "Bob", techStack: "Vue.js, TypeScript", experience: "5 years", isDisabled: true },
            { value: "dev3", label: "Charlie", techStack: "Angular, RxJS", experience: "4 years", isDisabled: false },
            { value: "dev4", label: "David", techStack: "Svelte, CSS", experience: "6 years", isDisabled: true },
            { value: "dev5", label: "Emma", techStack: "React, Redux", experience: "2 years", isDisabled: false },
            { value: "dev6", label: "Fiona", techStack: "Next.js, Tailwind", experience: "3 years", isDisabled: true },
            { value: "dev7", label: "George", techStack: "Vue.js, Vuetify", experience: "4 years", isDisabled: false }
        ],
        Backend: [
            { value: "dev8", label: "Henry", techStack: "Node.js, Express", experience: "5 years", isDisabled: true },
            { value: "dev9", label: "Irene", techStack: "Django, Flask", experience: "6 years", isDisabled: false },
            { value: "dev10", label: "Jack", techStack: "Ruby on Rails, PostgreSQL", experience: "4 years", isDisabled: true },
            { value: "dev11", label: "Kate", techStack: "Spring Boot, Java", experience: "7 years", isDisabled: false },
            { value: "dev12", label: "Liam", techStack: "Go, Kubernetes", experience: "5 years", isDisabled: true },
            { value: "dev13", label: "Mona", techStack: "PHP, Laravel", experience: "3 years", isDisabled: false },
            { value: "dev14", label: "Nathan", techStack: "ASP.NET, C#", experience: "6 years", isDisabled: true }
        ],
        QA: [
            { value: "dev15", label: "Olivia", techStack: "Selenium, Cypress", experience: "5 years", isDisabled: true },
            { value: "dev16", label: "Paul", techStack: "JUnit, Mocha", experience: "4 years", isDisabled: false },
            { value: "dev17", label: "Quinn", techStack: "TestNG, Appium", experience: "3 years", isDisabled: true },
            { value: "dev18", label: "Rachel", techStack: "Jest, Playwright", experience: "6 years", isDisabled: false },
            { value: "dev19", label: "Steve", techStack: "Postman, JMeter", experience: "5 years", isDisabled: true },
            { value: "dev20", label: "Tina", techStack: "LoadRunner, Cypress", experience: "4 years", isDisabled: false }
        ]
    };

    const groupedOptions: GroupBase<OptionType>[] = [
        { label: "Frontend Developers", options: developers.Frontend },
        { label: "Backend Developers", options: developers.Backend },
        { label: "QA Engineers", options: developers.QA }
    ];


    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedDevs, setSelectedDevs] = useState([]);

    const handleProjectChange = (e: any) => {
        const projectId = parseInt(e.target.value);
        const project: any = projects.find(p => p.id === projectId);
        setSelectedProject(project);
    };

    const handleDevSelection = (selectedOptions: any) => {
        setSelectedDevs(selectedOptions);
    };

    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "80vh", padding: "20px" }}>
            <Container className="mt-4">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/"><FaHome />Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Assign Developers</BreadcrumbItem>
                </Breadcrumb>
                <h2 className="mb-4 text-white p-3 d-flex justify-content-left display-6" style={{ backgroundColor: '#0b5eb0', borderRadius: 5 }}>Assign Developers</h2>
                <Row>
                    <Col md={6}>
                        <Form>
                            <FormGroup className="text-start">
                                <Label for="projectSelect">Select Project</Label>
                                <Input type="select" id="projectSelect" onChange={handleProjectChange}>
                                    <option value="">-- Select a Project --</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}- ({project.status})
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <FormGroup className="text-start">
                            <Label>Select Developers</Label>
                            <Select<OptionType, true, GroupBase<OptionType>>
                                isMulti
                                options={groupedOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleDevSelection}
                                value={selectedDevs}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                {selectedProject && (
                    <Row className="mt-1">
                        <Col md={6}>
                            <Card className="shadow-sm border-0">
                                <CardBody>
                                    <div className="align-items-center">
                                        <div className="d-flex justify-content-between">
                                            <CardTitle tag="h5" className="text-primary">{selectedProject.name}</CardTitle>
                                            <CardText>
                                                <Badge color={projectStatusColors[selectedProject.status as keyof typeof projectStatusColors]}>
                                                    <small>{selectedProject.status}</small>
                                                </Badge>
                                            </CardText>
                                        </div>
                                        {/* <div className="mt-3 text-start">
                                            <Badge color="info" className="me-2">
                                                Total Required: {Object.values(selectedProject.requiredDevs).reduce((acc, val) => acc + (val as number), 0)}
                                            </Badge>
                                            <Badge color="success" className="me-2">
                                                Working Devs: {Object.values(selectedProject.workingDevs).reduce((acc, devs: any) => acc + devs.length, 0)}
                                            </Badge>
                                            <Badge color="danger">
                                                Still Needed: {Object.entries(selectedProject.requiredDevs).reduce((acc, [role, count]: any) =>
                                                    acc + Math.max(0, count - (selectedProject.workingDevs[role]?.length || 0)), 0)}
                                            </Badge>
                                        </div> */}

                                    </div>

                                    <hr />
                                    <Row>
                                        <Col sm={12}>
                                            <div className="alert alert-success mt-2 text-start">Working Developers</div>
                                            <Table bordered hover responsive className="mt-2">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Role</th>
                                                        <th>Developer Name</th>
                                                        <th>Tech Stack</th>
                                                        <th>Experience</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(selectedProject.workingDevs).some(([_, devs]: any) => devs.length > 0) ? (
                                                        Object.entries(selectedProject.workingDevs).map(([role, devs]: any, index) => (
                                                            devs.length > 0 ? (
                                                                devs.map((dev: any, devIndex: number) => (
                                                                    <tr key={`${role}-${dev.value}`}>
                                                                        <td>{index + 1}.{devIndex + 1}</td>
                                                                        <td>
                                                                            <Badge color={developerColors[role as keyof typeof developerColors]}>
                                                                                {role}
                                                                            </Badge>
                                                                        </td>
                                                                        <td>{dev.label}</td>
                                                                        <td>{dev.techStack}</td>
                                                                        <td>{dev.experience}</td>
                                                                    </tr>
                                                                ))
                                                            ) : null
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={5} className="text-center text-muted"><i>No developers assigned</i></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm={12}>
                                            <div className="alert alert-info mt-3 text-start">Required Developers</div>
                                            <div className="d-flex justify-content-between">
                                                {Object.entries(selectedProject.requiredDevs).map(([role, count]: any) => (
                                                    <span key={role} className="text-start mt-1 ms-3">
                                                        {role}: <Badge color="danger">{count}</Badge>
                                                    </span>
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                        </Col>
                        <Col md={6}>
                            <h5>Selected Developers</h5>
                            {selectedDevs.length > 0 ? selectedDevs.map((dev: any) => (
                                <Card key={dev.value} className="mt-2" style={{ width: 520, height: 70 }}>
                                    {/* <div className="text-start">
                                        <span>{dev.label}</span>
                                        <span>Tech Stack: {dev.techStack}</span>
                                        <span>Experience: {dev.experience}</span>

                                    </div> */}
                                    <div style={{ display: "flex", flexDirection: "row", gap: "2px", justifyContent: 'space-between' }}>
                                        <span><FaUser /> {dev.label}</span>
                                        <span><FaCode /> {dev.techStack}</span>
                                        <span><FaBriefcase className="me-2"/>{dev.experience}</span>
                                    </div>
                                </Card>
                            )) : <p>No developers selected</p>}
                            {selectedDevs.length > 0 &&
                                <div className="d-flex justify-content-end gap-2 mt-3">
                                    <Button color="danger"><FaTimes /> Cancel</Button>
                                    <Button color="success"><FaCheck /> Submit</Button>
                                </div>
                            }
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default AssignDevs;
