import { Box, Button, Checkbox, Container, FormControl, InputLabel, ListItemText, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { SKILLS } from '../../../common/constants';
import resourceImg from '../../../assets/images/resource-form.jpg';

const initResourceFormData = {
    resource_name: '',
    resource_description: '',
    resource_contact: '',
    resource_skills: '',
    resource_experience: ''
}

export const AddUpdateUser = () => {
    const [resourceFormData, setResourceFormData] = React.useState(initResourceFormData);
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [selectedResourceSkills, setSelectedResourceSkills] = React.useState<string[]>([]);


    const formikObj = useFormik({
        enableReinitialize: true,
        initialValues: resourceFormData,
        // validationSchema: Yup.object({
        //     recurrence_type: Yup.string().required(t('pleaseSelecteRecurrenceType') || '')
        // }),
        onSubmit: (values) => {

        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const onChangeSkills = (event: any) => {
        setSelectedResourceSkills(
            typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
        );
    }

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ padding: '20px', margin: '5rem' }}>
                    <Typography variant='h5' sx={{ marginTop: 4, marginLeft: 5 }}>
                        Resource Information
                    </Typography>
                    <div className='d-flex justify-content-between'>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, width: 450, marginBottom: 5, marginLeft: 5 }}
                        >
                            <FormControl>
                                <TextField
                                    autoComplete="resource_name"
                                    name="resource_name"
                                    required
                                    fullWidth
                                    id="resource_name"
                                    value={formikObj.values.resource_name}
                                    onChange={formikObj.handleChange}
                                    placeholder="Name"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    autoComplete="resource_contact"
                                    name="resource_contact"
                                    required
                                    fullWidth
                                    id="resource_contact"
                                    value={formikObj.values.resource_contact}
                                    onChange={formikObj.handleChange}
                                    placeholder="Contact"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    autoComplete="resource_description"
                                    name="resource_description"
                                    required
                                    fullWidth
                                    id="resource_description"
                                    value={formikObj.values.resource_description}
                                    onChange={formikObj.handleChange}
                                    placeholder="Description"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Skills</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Skills"
                                    multiple
                                    value={selectedResourceSkills}
                                    onChange={onChangeSkills}
                                    renderValue={(selected) => selected.join(', ')}

                                >
                                    {SKILLS.map((item, index) =>
                                        <MenuItem value={item.name} key={index}>
                                            <Checkbox checked={selectedResourceSkills.indexOf(item?.name) > -1} />
                                            <ListItemText primary={item?.name} />
                                        </MenuItem>
                                    )
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    autoComplete="resource_experience"
                                    name="resource_experience"
                                    required
                                    fullWidth
                                    id="resource_experience"
                                    value={formikObj.values.resource_experience}
                                    onChange={formikObj.handleChange}
                                    placeholder="Experience (in years)"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <Button variant="contained">SAVE</Button>
                        </Box>
                        <img src={resourceImg} height={400} width={400} />
                    </div>
                </Paper>
            </Container>
        </Fragment>
    );
}