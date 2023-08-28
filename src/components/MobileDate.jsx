import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useField, useFormikContext } from "formik";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

const Mobile2 = (props) => {
  // const { setFieldValue } = useFormikContext();
  const [currentValue, setCurrentValue] = useState(new Date());
  // const [field, meta] = useField(name);

  // const configPicker = {
  // //fullWidth: true,
  // InputLabelProps: {
  //   shrink: true
  // },
  //   ...field,
  //   ...otherProps
  // };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MobileDatePicker
        name={props.name}
        label={props.label}
        fullWidth={props.fullWidth}
        value={currentValue}
        onChange={(newValue) => {
          // What shows on Screen
          setCurrentValue(newValue);
          // What goes to backend (Formik)
          //  setFieldValue(name, newValue);
        }}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};

export default Mobile2;
