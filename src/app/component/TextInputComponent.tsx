import {
  createStyles,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
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
          style={{ height: 50 }}
          className={clsx(className.textField, classNameStyle)}
        >
          {childrentSeleted}
        </TextField>
      ) : (
        <FormControl
          className={clsx(className.textField, classNameStyle)}
          variant="outlined"
        >
          {label && (
            <InputLabel htmlFor={id ?? "outlined-adornment-amount"}>
              {label}
            </InputLabel>
          )}
          <OutlinedInput
            id={id ?? "outlined-adornment-amount"}
            type={type ?? "text"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={require}
            style={{ height: 50 }}
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
      )}
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
      height: 50,
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

export const textInputStyles = useStyles;
