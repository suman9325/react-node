
import React, { Fragment, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getAllCityByStateService, getAllCountryService, getAllStateByCountryService } from "../../../api/services/dropDownService";
import { Container } from "@mui/material";
import { iState } from "../../../interface/iDropDown";


const DependDropDown = () => {
    const [countryList, setCountryList] = React.useState([]);
    const [stateList, setStateList] = React.useState([]);
    const [cityList, setCityList] = React.useState([]);


    useEffect(() => {
        getAllCountryService().then((res: any) => {
            const result = res?.data;
            if (result?.success) {
                result?.countryList?.length > 0 ? setCountryList(result?.countryList) : setCountryList([]);
            } else {
                setCountryList([])
            }
        })
            .catch((err: any) => {
                setCountryList([]);
            })
    }, [])

    const onChangeCountry = (event: SelectChangeEvent) => {
        const country_Id: iState = { countryId: +event.target.value };

        getAllStateByCountryService(country_Id).then((res: any) => {
            const result = res?.data;
            if (result?.success) {
                result?.stateList?.length > 0 ? setStateList(result?.stateList) : setStateList([]);
            } else {
                setStateList([])
            }
        })
            .catch((err: any) => {
                setStateList([]);
            })
    };

    const onChangeState = (event: SelectChangeEvent) => {
        const stateId = +event.target.value;
        getAllCityByStateService({stateId}).then((res: any) => {
            const result = res?.data;
            if (result?.success) {
                result?.cityList?.length > 0 ? setCityList(result?.cityList) : setCityList([]);
            } else {
                setCityList([])
            }
        })
            .catch((err: any) => {
                setCityList([]);
            })
    };


    return (
        <Fragment>
            <Container component="main" maxWidth="md">
                <FormControl sx={{ m: 1, minWidth: 200, marginTop: 20 }}>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Country"
                        onChange={onChangeCountry}
                    >
                        {countryList?.map((item: any, i: number) => (
                            <MenuItem value={item?.countryId} key={i}>{item?.countryName}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200, marginTop: 20 }}>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={countryList}
                        label="State"
                        onChange={onChangeState}
                    >
                        {stateList?.map((item: any, i: number) => (
                            <MenuItem value={item?.stateId} key={i}>{item?.stateName}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200, marginTop: 20 }}>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={countryList}
                        label="City"
                        // onChange={onChangeCountry}
                    >
                        {cityList?.map((item: any, i: number) => (
                            <MenuItem value={item?.cityId} key={i}>{item?.cityName}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
            </Container>
        </Fragment>
    );
}

export default DependDropDown;