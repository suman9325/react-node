import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ISignup } from '../../interface/iSIgnUp';
import { useFormik } from 'formik';
import { FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { loginServcie, registrationServcie } from '../../api/services/authenticationService';
import { sweetAlert } from '../../common/sweetAlert';

const signupForm: ISignup = {
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    language: []
}

export default function SignUp() {
    const [signupFormFields, setSignupFormFields] = React.useState({ ...signupForm });
    const [birthdayValue, setBirthdayValue] = React.useState<Moment | null>(moment());

    const formikObj = useFormik({
        enableReinitialize: true,
        initialValues: signupFormFields,
        validateOnChange: false,
        onSubmit: (values) => {
            const language = values.language.join()
            const req = { ...values, language };
            console.log('vale', req);
            let swalReq = { icon: '', title: '', text: '' };
            registrationServcie(req).then((res: any) => {
                const result = res?.data;

                if (result.success) {
                    swalReq.icon = 'success';
                    swalReq.title = 'Congratulations!';
                    swalReq.text = result?.message;
                }
                else {
                    swalReq.icon = 'error';
                    swalReq.title = 'Error!';
                    swalReq.text = result?.message;
                }

            })
                .catch((err: any) => {
                    swalReq.icon = 'error';
                    swalReq.title = 'Error!';
                    swalReq.text = 'Please try Again!';

                })
                .finally(() => sweetAlert(swalReq))


        }
    })

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 1
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <Box component="form" noValidate onSubmit={formikObj.handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={formikObj.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={formikObj.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gender"
                                onChange={formikObj.handleChange}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Languages Known</FormLabel>
                            <div>
                                <FormControlLabel control={<Checkbox />} label="Bengali" value={1} name='language' onChange={formikObj.handleChange} />
                                <FormControlLabel control={<Checkbox />} label="English" value={2} name='language' onChange={formikObj.handleChange} />
                                <FormControlLabel control={<Checkbox />} label="Hindi" value={3} name='language' onChange={formikObj.handleChange} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Date of Birth"
                                        name='birthday'
                                        value={birthdayValue}
                                        onChange={(newValue: any) => {
                                            console.log(newValue, newValue.toISOString());
                                            setBirthdayValue(newValue)

                                            const birthDay = (newValue.toISOString()).split('T')[0];
                                            formikObj.setFieldValue('birthday', birthDay);
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='country'
                                    value={+formikObj.values.country}
                                    label="Country"
                                    onChange={formikObj.handleChange}
                                >
                                    <MenuItem value={1}>India</MenuItem>
                                    <MenuItem value={2}>USA</MenuItem>
                                    <MenuItem value={3}>Canada</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formikObj.values.email}
                                onChange={formikObj.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formikObj.values.password}
                                onChange={formikObj.handleChange}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}