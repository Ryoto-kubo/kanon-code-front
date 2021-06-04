import TextField from "@material-ui/core/TextField";
import React from "react";

type Props = {
  id: string;
  type: string;
  value: string | number;
  label: string;
  placeholder: string;
  rows: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputMode?:
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  multiline?: boolean;
  style?: object;
  error?: boolean;
  helperText?: string;
};
export const BaseTextField: React.FC<Props> = (props) => {
  return (
    <TextField
      id={props.id}
      type={props.type}
      style={props.style}
      value={props.value}
      label={props.label}
      placeholder={props.placeholder}
      variant="outlined"
      fullWidth={true}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        inputMode: props.inputMode,
      }}
      onChange={props.onChange}
      multiline={props.multiline}
      rows={props.rows}
      error={props.error}
      helperText={props.helperText}
    />
  );
};
