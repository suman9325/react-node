import React, { Fragment, useEffect, useState } from "react";
import MasterForm from "../../components/Forms/MasterForm";
import axios from "axios";

const formFields = [
    {
        label: "Name",
        name: "firstname",
        type: "text",
        value: "",
        placeholder: "Enter your name",
        required: true
    },
    {
        label: "Male",
        name: "gender",
        type: "radio",
        value: 1,
    },
    {
        label: "Female",
        name: "gender",
        type: "radio",
        value: 2,
    },
    {
        label: "Country",
        name: "country",
        type: "select",
        optionList: [
            { label: "India", value: "India" },
            { label: "USA", value: "USA" },
            { label: "UK", value: "UK" }
        ],
        value: ''
    },
    {
        label: "English",
        name: "language",
        type: "checkbox",
        value: 'English',
    },
    {
        label: "Bengali",
        name: "language",
        type: "checkbox",
        value: 'Bengali',
    },
    {
        label: "Hindi",
        name: "language",
        type: "checkbox",
        value: 'Hindi',
    },
    {
        label: 'DOB',
        name: 'dob',
        type: 'date',
        value: ''
    }
]

export default function Registrtation() {


    const formValues = (values) => {
        console.log('formValues', values);
        axios.post('/xyz', { values })
    }

    return (
        <Fragment>
            <div className="container">
                <MasterForm formFields={formFields} formHeader={'Registration Form'} formBtnText={'Register'} formValues={formValues} />
            </div>
        </Fragment>
    )
}