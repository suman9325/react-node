import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { getAllCountryService, getAllStateByCountryService } from '../../../api/services/dropDownService';
import { Container } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultiselectDropdown() {
    const [selectedCountryName, setSelectedCountryName] = React.useState<string[]>([]);
    const [countryList, setCountryList] = React.useState([]);
    const [stateList, setStateList] = React.useState([]);

    React.useEffect(() => {
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

    const onChangeCountry = (event: any) => {
        setSelectedCountryName(
            typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
        );
    };

    React.useEffect(() => {
        const matchedCids = countryList
            .filter((country: any) => selectedCountryName.includes(country.cname))
            .map((country: any) => country.cid);
        if (matchedCids.length > 0) {
            const req = { cid: matchedCids.join(",") }
            getAllStateByCountryService(req).then((res: any) => {
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
        }
    }, [selectedCountryName])

    return (
        <Container component="main" maxWidth="md">

            <FormControl sx={{ m: 1, minWidth: 200, marginTop: 20 }}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    multiple
                    onChange={onChangeCountry}
                    value={selectedCountryName}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {countryList?.map((item: any, i: number) => (
                        <MenuItem value={item.cname} key={i}>
                            <Checkbox checked={selectedCountryName.indexOf(item?.cname) > -1} />
                            <ListItemText primary={item?.cname} />
                        </MenuItem>
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
    );
}
