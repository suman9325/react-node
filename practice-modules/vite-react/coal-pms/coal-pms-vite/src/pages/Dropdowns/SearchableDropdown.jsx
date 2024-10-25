import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllCountryService } from '../../api/service/dropDownService';
import "./dropdown.scss";

const SearchableDropdown = () => {
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        getAllCountryService().then(res => {
            const { success, data } = res.data
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

    const onCountryChange = (val) => {
        console.log(val);

    }

    return (
        <>
            <Select
                className="basic-single w-200"
                classNamePrefix="select"
                isSearchable={true}
                isMulti
                name="countryList"
                options={countryList}
                onChange={onCountryChange}
            />
        </>
    );
};

export default SearchableDropdown;