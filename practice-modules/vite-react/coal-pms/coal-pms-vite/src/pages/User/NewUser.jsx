import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row, Stack } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import registerImg from '../../assets/images/register.jpg'
import './user.scss'
import ButtonWithLoader from "../../components/Buttons/ButtonWithLoader";
import { useFormik } from "formik";
import moment from "moment";
import { getAllUsersService } from "../../api/service/tableService";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { TOAST_TYPE, toastAlert } from "../../components/Toaster/toastify";
import { addUpdateUserService, getUserService } from "../../api/service/userService";
import { ListItemIcon, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const initialFormValues = {
    name: '',
    email: '',
    password: '',
    contact: '',
    gender: '',
    language: [],
    address: '',
    dob: '',
    country: ''
}
export default function NewUser() {
    const [formValues, setFormValues] = useState({ ...initialFormValues });
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = () => {
        getUserService().then(res => {
            if (res.success) {
                setTableData(res.data);
            }
        })
            .catch(err => { })
    }

    //should be memoized or stable
    const columnData = useMemo(() =>
        [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'contact',
                header: 'Contact',
                size: 150,
            },
            {
                accessorKey: 'dob',
                header: 'Birthdate',
                size: 150,
            },
            {
                accessorKey: 'email', //normal accessorKey
                header: 'Email',
                size: 150,
            },
            {
                accessorKey: 'gender', //normal accessorKey
                header: 'Gender',
                size: 150,
            },
            {
                accessorKey: 'language', //normal accessorKey
                header: 'Language',
                size: 150,
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
                size: 150,
            },
        ],
        []);

    const tableConfig = useMaterialReactTable({
        columns: columnData,
        data: tableData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableRowActions: true,
        initialState: {
            columnPinning: {
                right: ['mrt-row-actions'],
            },
        },
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem
                key={0}
                onClick={() => {
                    callUser(row.original.id);
                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <Edit />
                </ListItemIcon>
                Edit
            </MenuItem>,
            <MenuItem
                key={1}
                onClick={() => {
                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <Delete />
                </ListItemIcon>
                Delete
            </MenuItem>,
        ],
    });

    const formikObj = useFormik({
        initialValues: formValues,
        onSubmit: (values) => {
            values = { ...values, language: values.language.join(',') }
            addUpdateUserService(values).then(res => {
                if (res.success) {
                    toastAlert(TOAST_TYPE.SUCCESS, res.message);
                    formikObj.resetForm();
                    getAllUsers();
                }
            })
                .catch(err => console.log('Error', err))
                .finally(() => { setIsLoading(false) })
        }
    })

    const callUser = (id) => {
        getUserService({ id }).then(res => {
            if (res.success) {
                setIsEdit(true);
                const languageArray = res.data.language.split(',');
                const updatedValues = { ...initialFormValues, ...res.data, language: languageArray };
                formikObj.setValues(updatedValues);
            }
        })
            .catch(err => { })
    }

    const handleLanguage = (e) => {
        const { value, checked } = e.target;
        const updatedLanguages = checked
            ? [...formikObj.values.language, value]
            : formikObj.values.language.filter(lang => lang !== value);
        formikObj.setFieldValue('language', updatedLanguages);
    }

    return (
        <Fragment>
            <Container fluid='md'>
                <div className="d-flex">
                    <Card className="me-3" style={{ width: '800px' }}>
                        <CardHeader>
                            <h3>
                                {isEdit ? 'Edit User' : 'Add User'}
                            </h3>
                        </CardHeader>
                        <CardBody className="f-s-12">
                            <Stack gap={3}>
                                <Row>
                                    <Col sm={12}>
                                        <input type="text" name="name" value={formikObj.values.name} onChange={formikObj.handleChange} className="form-control" id="exampleFormControlInput1" placeholder="Enter your name" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <input type="text" name="contact" value={formikObj.values.contact} onChange={formikObj.handleChange} className="form-control" id="exampleFormControlInput1" placeholder="Enter your contact" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="d-flex text-align-start">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" name="gender" type="radio" id="inlineCheckbox1" value="M" onChange={formikObj.handleChange} checked={formikObj.values.gender == 'M'} />
                                            <label className="form-check-label" for="inlineCheckbox1">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" name="gender" type="radio" id="inlineCheckbox2" value="F" onChange={formikObj.handleChange} checked={formikObj.values.gender == 'F'} />
                                            <label className="form-check-label" for="inlineCheckbox2">Female</label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="d-flex text-align-start">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" name="language" type="checkbox" id="inlineCheckbox1" value="English" onChange={handleLanguage} checked={formikObj.values.language.includes('English')} />
                                            <label className="form-check-label" for="inlineCheckbox1">English</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" name="language" type="checkbox" id="inlineCheckbox2" value="Bengali" onChange={handleLanguage} checked={formikObj.values.language.includes('Bengali')} />
                                            <label className="form-check-label" for="inlineCheckbox2">Bengali</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" name="language" type="checkbox" id="inlineCheckbox2" value="Hindi" onChange={handleLanguage} checked={formikObj.values.language.includes('Hindi')} />
                                            <label className="form-check-label" for="inlineCheckbox2">Hindi</label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <textarea class="form-control" name="address" value={formikObj.values.address} onChange={formikObj.handleChange} id="exampleFormControlTextarea1" rows="3" placeholder="Enter your address"></textarea>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <input type="email" name="email" onChange={formikObj.handleChange} value={formikObj.values.email} className="form-control" id="exampleFormControlInput1" placeholder="Enter your email" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <input type="password" name="password" onChange={formikObj.handleChange} value={formikObj.values.password} className="form-control" id="exampleFormControlInput1" placeholder="********" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="">
                                        <Flatpickr
                                            style={{ width: '-webkit-fill-available', padding: '5px', borderRadius: '5px' }}
                                            placeholder="Enter DOB"
                                            value={formikObj.values.dob}
                                            onChange={([date]) => {
                                                formikObj.setFieldValue('dob', moment(date).format('YYYY-MM-DD'))
                                            }}
                                        />

                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <select class="form-select" name="country" aria-label="Default select example" onChange={formikObj.handleChange} value={formikObj.values.country}>
                                            <option selected>Select Country</option>
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="China">China</option>
                                        </select>
                                    </Col>

                                </Row>

                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={formikObj.resetForm} variant="secondary" className="me-2">Cancel</Button>
                            <ButtonWithLoader onBtnClick={formikObj.handleSubmit} isLoading={isLoading} style={'btn btn-primary'}>
                                {isEdit ? 'Update' : 'Save'}
                            </ButtonWithLoader>
                        </CardFooter>
                    </Card>
                    <MaterialReactTable table={tableConfig} />
                </div>
                <div className="d-flex mt-4">
                </div>
            </Container>
        </Fragment>
    )
}