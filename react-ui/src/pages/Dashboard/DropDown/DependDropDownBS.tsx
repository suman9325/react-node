
import React, { useState, useEffect } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { getAllCityByStateService, getAllCountryService, getAllStateByCountryService } from "../../../api/services/dropDownService";


const DependDropDownBS = () => {
    const [dropdownOpenCountry, setDropdownOpenCountry] = useState(false);
    const [dropdownOpenState, setDropdownOpenState] = useState(false);

    const toggleCountry = () => setDropdownOpenCountry((prevState) => !prevState);
    const toggleState = () => setDropdownOpenState((prevState) => !prevState);

    const [countryList, setCountryList] = React.useState([]);
    const [stateList, setStateList] = React.useState<any>([]);
    const [cityList, setCityList] = React.useState([]);

    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<any>(null);


    // useEffect(() => {
    //     getAllCountryService().then((res: any) => {
    //         const result = res?.data;
    //         if (result?.success) {
    //             result?.countryList?.length > 0 ? setCountryList(result?.countryList) : setCountryList([]);
    //         } else {
    //             setCountryList([])
    //         }
    //     })
    //         .catch((err: any) => {
    //             setCountryList([]);
    //         })
    // }, [])

    // const onChangeCountry = (event: any) => {
    //     const country_Id: any = { countryId: +event.target.value };

    //     getAllStateByCountryService(country_Id).then((res: any) => {
    //         const result = res?.data;
    //         if (result?.success) {
    //             result?.stateList?.length > 0 ? setStateList(result?.stateList) : setStateList([]);
    //         } else {
    //             setStateList([])
    //         }
    //     })
    //         .catch((err: any) => {
    //             setStateList([]);
    //         })
    // };

    // const onChangeState = (event: any) => {
    //     const stateId = +event.target.value;
    //     getAllCityByStateService({ stateId }).then((res: any) => {
    //         const result = res?.data;
    //         if (result?.success) {
    //             result?.cityList?.length > 0 ? setCityList(result?.cityList) : setCityList([]);
    //         } else {
    //             setCityList([])
    //         }
    //     })
    //         .catch((err: any) => {
    //             setCityList([]);
    //         })
    // };


    const country = [
        {
            id: 1,
            name: "India"
        },
        {
            id: 2,
            name: "USA"
        },

    ]

    const state = [
        {
            id: 1,
            name: "Maharashtra",
            countryId: 1
        },
        {
            id: 2,
            name: "Gujarat",
            countryId: 1
        },
        {
            id: 3,
            name: "California",
            countryId: 2
        },
        {
            id: 4,
            name: "New York",
            countryId: 2
        }

    ]

    const handleCountryChange = (country: any) => {
        // const countryId = countrySelect.current.value;
        setSelectedCountry(country);
        const filteredState = state.filter((item) => item.countryId === parseInt(country.id));
        setStateList(filteredState);

    }

    const handleStateChange = (state: any) => {
        // const countryId = countrySelect.current.value;
        setSelectedState(state);

    }



    return (
        <div className="d-flex p-5">
            <Dropdown isOpen={dropdownOpenCountry} toggle={toggleCountry} direction={'down'}>
                <DropdownToggle caret>
                    {selectedCountry ? selectedCountry?.name : 'Select Country'}
                </DropdownToggle>
                <DropdownMenu>
                    {country?.map((country: any) => (
                        <DropdownItem key={country.id} onClick={() => handleCountryChange(country)}>
                            {country.name}
                        </DropdownItem>
                    ))
                    }
                </DropdownMenu>
            </Dropdown>

            <Dropdown isOpen={dropdownOpenState} toggle={toggleState} direction={'down'} className='ms-5'>
                <DropdownToggle caret>
                    {selectedState ? selectedState?.name : 'Select State'}
                </DropdownToggle>
                <DropdownMenu>
                    {stateList?.map((state: any) => (
                        <DropdownItem key={state.id} onClick={() => handleStateChange(state)}>
                            {state.name}
                        </DropdownItem>
                    ))
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default DependDropDownBS;