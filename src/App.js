// Third party
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import { object, string, number, date, boolean } from "yup";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Custom
import TextFieldWrapper from "./components/TextField";
import SelectWrapper from "./components/Select";
import DateTimePicker from "./components/DateTimePicker";
import DatePickerMobile from "./components/DatePickerMobile";
import SwitchWrapper from "./components/Switch";
import CheckboxWrapper from "./components/Checkbox";
import ButtonWrapper from "./components/Button";
import SnackbarWrapper from "./components/Snackbar";
import countries from "./data/countries";
import states from "./data/states";
import "./styles.css";

const theme = createTheme({});

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8)
  }
}));

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  arrivalDate: "",
  departureDate: "",
  message: "",
  onOffSwitch: false,
  termsOfService: false
};

// validationSchema
// Only used in Native, not in New-MUI -->
// No min/max needed in validationSchema either
const minDate = new Date();
minDate.setDate(minDate.getDate() - 1);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 90);

const validationSchema = object({
  firstName: string().required("First name Required"),
  lastName: string().required("Last name Required"),
  email: string().email("Invalid email").required("Email required"),
  phone: number()
    .positive("The number must be positive")
    .integer("The number must be an integer")
    .typeError("Please enter a valid phone number")
    .required("Phone number required"),
  addressLine1: string().required("Address required"),
  addressLine2: string(),
  city: string().required("City required"),
  state: string().required("State required"),
  country: string().required("Country required"),
  arrivalDate: date()
    .required("Date of arrival required")
    .max(maxDate, "Reservation must be within 90 days")
    .min(minDate, "Cannot use past days"),
  departureDate: date()
    .required("Date of departure required")
    .max(maxDate, "Reservation must be within 90 days")
    .min(minDate, "Cannot use past days"),
  message: string(),
  onOffSwitch: boolean(),
  termsOfService: boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted.")
});

const MainModule = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  // actions = { setSubmitting, resetForm, isSubmitting }
  const submitHandler = (values, actions) => {
    setTimeout(() => {
      // setSubmitting not needed with async
      actions.setSubmitting(false);
      actions.resetForm(initialFormState);
      setOpen(true);
      console.log(values); // test
    }, 2000);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {/* <Header /> */}
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={initialFormState}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Your details</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <TextFieldWrapper
                        name="firstName"
                        label="First Name"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldWrapper
                        name="lastName"
                        label="Last Name"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        name="email"
                        label="Email"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        name="phone"
                        label="Phone"
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Address</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        name="addressLine1"
                        label="Address Line 1"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        name="addressLine2"
                        label="Address Line 2"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldWrapper name="city" label="City" type="text" />
                    </Grid>
                    <Grid item xs={6}>
                      <SelectWrapper
                        name="state"
                        label="State"
                        type="text"
                        options={states}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SelectWrapper
                        name="country"
                        label="Country"
                        type="text"
                        options={countries}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Booking information</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <DateTimePicker
                        name="departureDate"
                        label="Date of Departure"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePickerMobile name="arrivalDate" />
                    </Grid>

                    {isSubmitting && (
                      <Grid item xs={12}>
                        <LinearProgress />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        name="message"
                        label="Message"
                        multiline
                        rows={5}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SwitchWrapper
                        name="onOffSwitch"
                        legend="On/Off switch"
                        label="Choose light/dark theme"
                        color="error"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CheckboxWrapper
                        name="termsOfService"
                        legend="Terms of Service"
                        label="I agree"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonWrapper>submit form</ButtonWrapper>
                      <SnackbarWrapper open={open} onClose={handleClose} />
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainModule />
    </ThemeProvider>
  );
};

export default App;
