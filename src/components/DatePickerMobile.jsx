import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useField, useFormikContext } from "formik";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

const DatePickerMobile = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [currentValue, setCurrentValue] = useState(new Date());
  const [field, meta] = useField(name);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);

  const configDatePicker = {
    fullWidth: true,
    variant: "outlined",
    InputLabelProps: {
      shrink: true
    },
    ...field,
    // "named" props above apply to all
    // Textfields present.
    // "otherProps" below will be custom tailored
    // to particular Text/Date etc. Fields
    // such as label, type, id, etc.
    ...otherProps
  };

  // meta object containes
  // submitForm, isSubmitting, touched, errors
  // Not really needed in this case, minDate/maxDate
  // props do the job, just keep 4 consistency
  if (meta && meta.touched && meta.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = meta.error;
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MobileDatePicker
        label="Date of Arrival"
        value={currentValue}
        onChange={(newValue) => {
          // What shows on Screen
          setCurrentValue(newValue);
          console.log("Old Field");
          console.log(field);
          // What goes to backend (Formik)
          setFieldValue(name, newValue);
          // Testing Visualization
          //console.log(newValue); //test
          console.log("Field"); // test
          console.log(field); //test
        }}
        minDate={minDate}
        maxDate={maxDate}
        renderInput={(configDatePicker) => <TextField {...configDatePicker} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerMobile;
