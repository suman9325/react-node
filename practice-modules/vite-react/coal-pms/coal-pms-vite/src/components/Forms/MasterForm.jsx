import React, { useState, Fragment } from 'react';
import ButtonWithLoader from '../Buttons/ButtonWithLoader';

export default function MasterForm({ formFields, formHeader, formBtnText, formValues }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(
        formFields.reduce((acc, field) => {
            if (field.type === 'checkbox') {
                acc[field.name] = []; // Initialize checkboxes as arrays for multiple selections
            } else {
                acc[field.name] = field.value || ''; // Initialize other fields with default empty values
            }
            return acc;
        }, {})
    );

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => {
            if (type === 'checkbox') {
                // Handle checkbox values - accumulate checked ones in an array
                const newValues = checked
                    ? [...prev[name], value] // Add checked value
                    : prev[name].filter(v => v !== value); // Remove unchecked value
                return { ...prev, [name]: newValues };
            }
            if (type === 'radio') {
                // Handle radio buttons by setting single value
                return { ...prev, [name]: value };
            }
            // Handle other input types (text, date, etc.)
            return { ...prev, [name]: value };
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            formValues(formData);  // Pass formData to parent component
        }, 3000);
    };

    return (
        <Fragment>
            <form onSubmit={submitForm}>
                <div className="card">
                    <div className="card-header">
                        <h3>{formHeader}</h3>
                    </div>
                    <div className="card-body">
                        {formFields.map((f, i) => (
                            <div key={i}>
                                <label>{f.label}</label>
                                {f.type === 'select' ? (
                                    <select
                                        name={f.name}
                                        value={formData[f.name]}
                                        onChange={handleInputChange}
                                    >
                                        {f?.optionList?.map((s, j) => (
                                            <option key={j} value={s.value}>{s.label}</option>
                                        ))}
                                    </select>
                                ) : f.type === 'checkbox' ? (
                                    <input
                                        type="checkbox"
                                        name={f.name}
                                        value={f.value}
                                        checked={formData[f.name].includes(f.value)}
                                        onChange={handleInputChange}
                                    />
                                ) : f.type === 'radio' ? (
                                    <input
                                        type="radio"
                                        name={f.name}
                                        value={f.value}
                                        checked={formData[f.name] === f.value.toString()}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <input
                                        type={f.type}
                                        name={f.name}
                                        value={formData[f.name]}
                                        placeholder={f.placeholder || ''}
                                        required={f.required || false}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="card-footer">
                        <ButtonWithLoader style={'btn btn-primary'} onClick={submitForm} isLoading={isLoading} >
                            {formBtnText}
                        </ButtonWithLoader>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}
