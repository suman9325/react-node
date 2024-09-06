
import React, { Fragment, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getAllCityByStateService, getAllCountryService, getAllStateByCountryService } from "../../../api/services/dropDownService";
import { Container } from "@mui/material";
import { iState } from "../../../interface/iDropDown";


const DependDropDownAPI = () => {
    const [countryList, setCountryList] = React.useState([]);
    const [stateList, setStateList] = React.useState([]);


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
        // const countryId: number = +event.target.value

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
                            <MenuItem value={item?.cid} key={i}>{item?.cname}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200, marginTop: 20 }}>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="State"
                    >
                        {stateList?.map((item: any, i: number) => (
                            <MenuItem value={item?.sid} key={i}>{item?.sname}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
            </Container>
        </Fragment>
    );
}

export default DependDropDownAPI;