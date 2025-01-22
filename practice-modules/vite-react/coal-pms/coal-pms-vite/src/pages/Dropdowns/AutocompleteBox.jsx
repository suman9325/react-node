import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { searchUserService } from '../../api/service/userService';

const AutocompleteBox = () => {

    const [filterArray, setFilterArray] = useState([]);

    const onSearchTextChange = (e) => {
        const searchParam = e.target.value
        searchUserService({ searchParam }).then(res => {
            res.success ? setFilterArray(res?.data) : setFilterArray([]);
        })
            .catch(err => {
                console.log(err);
                setFilterArray([]);
            })
    }

    return (
        <Fragment>
            <Container fluid='md'>
                <div className="d-flex">
                    <Autocomplete
                        options={filterArray} // Pass the entire array of objects
                        getOptionLabel={(option) => option.name} // Specify which property to display
                        onChange={(event, value) => {
                            if (value) {
                                console.log("Selected ID:", value.id); // Access the id of the selected option
                            } else {
                                console.log("No option selected");
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search"
                                onChange={onSearchTextChange} // Handles input change for filtering
                            />
                        )}
                        sx={{
                            width: 400,
                            '& .MuiAutocomplete-endAdornment': {
                                display: 'none', // Hides the dropdown arrow
                            }
                        }}
                    />

                </div>
            </Container>
        </Fragment>
    )
}
export default AutocompleteBox;