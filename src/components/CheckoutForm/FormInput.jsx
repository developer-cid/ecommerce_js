import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, defaultValue = "", required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextField
            fullWidth
            label={label}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
        defaultValue={defaultValue}
      />
    </Grid>
  );
};

export default FormInput;
