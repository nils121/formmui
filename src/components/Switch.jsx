import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import { useField, useFormikContext } from "formik";

const SwitchWrapper = ({ name, label, legend, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    setFieldValue(name, event.target.checked);
  };

  // props config for Switch
  const configSwitch = {
    onChange: handleChange,
    ...field,
    ...otherProps
  };
  // props config for FormControl
  const configFormControl = {};

  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch {...configSwitch} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default SwitchWrapper;
