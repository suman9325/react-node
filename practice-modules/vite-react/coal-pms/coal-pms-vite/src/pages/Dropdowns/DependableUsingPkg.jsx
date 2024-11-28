import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Container, Stack } from 'react-bootstrap';
import Select from 'react-select';
import { getAllCountryService, getAllStateByCountryService } from '../../api/service/dropDownService';
import "./dropdown.scss";

const DependableUsingPkg = () => {

    const [isDisabled, setisDisabled] = useState(true);
    const [countryList, setCountryList] = useState([]);
    const [filteredStateList, setfilteredStateList] = useState([]);

    useEffect(() => {
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
    }, [])

    const onDropdownChange = (val) => {

        if (!!val) {
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

    return (
        <Fragment>
            <Container fluid>
                <Card className="" style={{ width: '50rem' }}>
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
                            />

                            <label className='me-1'>State</label>
                            <Select
                                className="w-300"
                                classNamePrefix="select"
                                isSearchable={true}
                                // isMulti
                                name="stateList"
                                options={filteredStateList}
                                // onChange={onDropdownChange}
                                isDisabled={isDisabled}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </Fragment>
    );
}

export default DependableUsingPkg;