import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container, Stack } from 'react-bootstrap';
import Select from 'react-select';
import { addUpdateCountryStateService, deleteLocationService, getAllCountryService, getAllLocationsService, getAllStateByCountryService, getCountryStateService } from '../../api/service/dropDownService';
import "./dropdown.scss";
import { useFormik } from "formik";
import { TOAST_TYPE, toastAlert } from '../../components/Toaster/toastify';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { ListItemIcon, MenuItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const initialFormValues = {
    id: null,
    cid: null,
    sid: null,
    cname: null,
    sname: null
}

const Test = () => {
    const [formValues, setFormValues] = useState({ ...initialFormValues });
    const [isDisabled, setisDisabled] = useState(true);
    const [countryList, setCountryList] = useState([]);
    const [filteredStateList, setfilteredStateList] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [edit, setEdit] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [editData, setEditData] = useState();

    useEffect(() => {
        getAllCountryList();
        getAllLocations();
    }, [])

    const getAllCountryList = () => {
        getAllCountryService().then(res => {
            const { success, data } = res
            if (success) {
                const updatedData = data.map(item => {
                    return {
                        value: item.cid,
                        label: item.cname
                    }
                })
                setCountryList(updatedData);
            } else {

            }

        })
            .catch(err => {
                console.log(err);
            })
    }

    const getAllLocations = () => {
        getAllLocationsService().then(res => {
            const { success, data } = res;
            if (success) {
                setTableData(data);
            }
        })
    }

    const onDropdownChange = (val) => {

        if (!!val) {
            setSelectedCountry(val);
            formikObj.setFieldValue('cid', val.value);
            formikObj.setFieldValue('cname', val.label);
            getAllStateByCountryService({ cid: val.value }).then(res => {
                const { success, data } = res
                if (success) {
                    setisDisabled(false);
                    const updatedData = data.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })
                    setfilteredStateList(updatedData);
                    // setSelectedState(null);
                } else {
                    setisDisabled(true);
                }

            })
                .catch(err => {
                    console.log(err);
                    setisDisabled(true);
                })
        }
        else {
            setfilteredStateList([]);
            setisDisabled(true);
        }
    }

    const onStateChange = (val) => {
        setSelectedState(val); // Update selected state
        formikObj.setFieldValue('sid', val.value);
        formikObj.setFieldValue('sname', val.label);
    };

    const formikObj = useFormik({
        initialValues: formValues,
        onSubmit: (values) => {
            addUpdateCountryStateService(values).then(res => {
                const { success, data } = res;
                if (res.success) {
                    toastAlert(TOAST_TYPE.SUCCESS, res.message);
                    formikObj.resetForm();
                    setSelectedCountry(null);
                    setSelectedState(null);
                    setfilteredStateList([]);
                    getAllLocations();
                }
            })
                .catch(err => console.log('Error', err))
                .finally(() => { setIsLoading(false) })
        }
    })

    const getLocation = (id) => {
        getCountryStateService({ id }).then(res => {
            const { success, data } = res;
            if (res.success) {
                formikObj.setFieldValue('id', id);
                formikObj.setFieldValue('cid', +data.cid);
                formikObj.setFieldValue('cname', data.cname);
                formikObj.setFieldValue('sid', +data.sid);
                formikObj.setFieldValue('sname', data.sname);
                setEditData(data);
                const country = (countryList.filter(item => item.value == data.cid))[0];
                const state = { value: data.sid, label: data.sname };
                setSelectedCountry(country);
                setSelectedState(state);
                onDropdownChange(country);
            }
        })
    }

    const deleteLocation = (id) => {
        deleteLocationService({id}).then(res=>{
            const {success, data} = res;
            if(res.success){
                toastAlert(TOAST_TYPE.SUCCESS, res.message);
                getAllLocations();
            }
        })
    }

    const columnData = useMemo(() =>
        [
            {
                accessorKey: 'id', //access nested data with dot notation
                header: 'ID',
                size: 150,
            },
            {
                accessorKey: 'cname',
                header: 'Country',
                size: 150,
            },
            {
                accessorKey: 'sname', //normal accessorKey
                header: 'State',
                size: 200,
            },
        ],
        []);

    const tableConfig = useMaterialReactTable({
        columns: columnData,
        data: tableData,
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
                    getLocation(row.original.id);
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
                    deleteLocation(row.original.id);
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

    return (
        <Fragment>
            <Container fluid className='d-flex'>
                <Card className="me-3" style={{ width: '50rem' }}>
                    <CardHeader>
                        <h3>
                            Dependable Dropdown
                        </h3>
                    </CardHeader>
                    <CardBody className="">
                        <div className='d-flex justify-content-between'>
                            <label className='me-1'>Country</label>
                            <Select
                                className="w-300 me-3"
                                classNamePrefix="select"
                                isSearchable={true}
                                // isMulti
                                name="countryList"
                                options={countryList}
                                onChange={onDropdownChange}
                                placeholder='select'
                                value={selectedCountry}
                            />

                            <label className='me-1'>State</label>
                            <Select
                                className="w-300"
                                classNamePrefix="select"
                                isSearchable={true}
                                // isMulti
                                name="stateList"
                                options={filteredStateList}
                                onChange={onStateChange}
                                isDisabled={isDisabled}
                                value={selectedState}
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button className={'btn btn-primary'} onClick={formikObj.handleSubmit}>
                            {formikObj.values.id == null ? 'Save' : 'Update'}
                        </Button>
                    </CardFooter>
                </Card>

                <Card style={{ width: '50rem' }}>
                    <Fragment>
                        <MaterialReactTable table={tableConfig} />
                    </Fragment>
                </Card>
            </Container>
        </Fragment>
    );
}

export default Test;