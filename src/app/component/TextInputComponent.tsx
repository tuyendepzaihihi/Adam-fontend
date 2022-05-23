import {
  createStyles,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
interface Props {
  label?: string;
  color?: any;
  classNameStyle?: any;
  require?: any;
  error?: any;
  onChange?: any;
  onBlur?: any;
  value: string;
  touched?: any;
  type?: any;
  id?: any;
  isPass?: boolean;
  rightIcon?: any;
  onRightIcon?: any;
}
const TextInputComponent = (props: Props) => {
  const {
    value,
    classNameStyle,
    error,
    label,
    onBlur,
    onChange,
    require,
    touched,
    id,
    type,
    rightIcon,
    onRightIcon,
  } = props;
  const className = useStyles();
  return (
    <>
      {/* <TextField
        id={id ?? "filled-required"}
        variant="outlined"
        label={label}
        color="primary"
        className={clsx(className.textField, {
          [classNameStyle]: !!classNameStyle,
        })}
        type={type}
        required={require ?? false}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        value={value}
      /> */}
      <FormControl
        className={clsx(className.textField, classNameStyle)}
        variant="outlined"
      >
        <InputLabel htmlFor={id ?? "outlined-adornment-amount"}>
          {label}
        </InputLabel>
        <OutlinedInput
          id={id ?? "outlined-adornment-amount"}
          type={type ?? "text"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={require}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  onRightIcon && onRightIcon();
                }}
                onMouseDown={() => {}}
                edge="end"
              >
                {rightIcon}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={`${label}`.length * 8.5}
        />
      </FormControl>
      <div className={className.errorContainer}>
        {error && touched ? (
          <p className={className.textErr}> {error}</p>
        ) : null}
      </div>
    </>
  );
};
export default TextInputComponent;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorContainer: {
      marginTop: 7,
    },
    textErr: {
      color: "red",
      fontSize: "12px",
      lineHeight: "22px",
    },
    textField: {
      marginTop: 20,
      borderColor: "white",
      width: "100%",
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
  })
);
