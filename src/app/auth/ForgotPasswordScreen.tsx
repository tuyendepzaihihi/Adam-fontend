import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import TextInputComponent from "../component/TextInputComponent";
import { ROUTE, textValidate } from "../contant/Contant";
import { colors } from "../utils/color";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingLeft: "30%",
      paddingRight: "30%",
      paddingTop: 100,
    },
    button: {
      height: 40,
      borderRadius: 8,
      marginTop: 20,
      width: "100%",
      borderColor: colors.black,
      color: colors.black,
      fontWeight: "bold",
    },
    title: {
      textAlign: "left",
      fontSize: 30,
      fontWeight: "bold",
    },
    descriptionText: {
      fontSize: 15,
      color: colors.gray59,
      textAlign: "left",
      marginBottom: 20,
    },
  })
);
interface LoginInterface {
  password: string;
  re_password: string;
}
const initValuesLogin: LoginInterface = {
  password: "",
  re_password: "",
};

const ForgotPasswordScreen = () => {
  const className = useStyles();
  const location = useLocation();

  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);
  const validateLogin = Yup.object({
    password: Yup.string()
      .min(6, textValidate.pass.short)
      .max(25, textValidate.pass.long)
      .required(textValidate.pass.require)
      .trim(),
    re_password: Yup.string()
      .min(6, textValidate.pass.short)
      .max(25, textValidate.pass.long)
      .required(textValidate.re_pass.require)
      .oneOf([Yup.ref("password")], textValidate.re_pass.not_found),
  });

  const formik = useFormik({
    initialValues: initValuesLogin,
    onSubmit: (value) => {
      handleSubmit(value);
    },
    validationSchema: validateLogin,
  });

  const handleSubmit = async (data: LoginInterface) => {
    // try {
    //   const responseLogin: { data: { data: UserInterface } } =
    //     await requestLogin(data);
    //   if (responseLogin) {
    //     // setToken(responseLogin.data.data.token);
    //     navigate("/");
    //   }
    // } catch (e) {}
  };

  return (
    <div className={className.root}>
      <div style={{ width: "100%" }}>
        <p className={className.title}>Đổi mật khẩu</p>
        <div>
          <p className={className.descriptionText}>
            Vui lòng nhập mật khẩu mới và xác nhận
          </p>

          <TextInputComponent
            error={formik.errors.password}
            touched={formik.touched.password}
            value={formik.values.password}
            label={"Mật khẩu"}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            rightIcon={showPass ? <Visibility /> : <VisibilityOff />}
            type={!showPass ? "text" : "password"}
            onRightIcon={() => {
              setShowPass(!showPass);
            }}
            isRequire
          />
          <TextInputComponent
            error={formik.errors.re_password}
            touched={formik.touched.re_password}
            value={formik.values.re_password}
            label={"Xác nhận mật khẩu"}
            onChange={formik.handleChange("re_password")}
            onBlur={formik.handleBlur("re_password")}
            rightIcon={showRePass ? <Visibility /> : <VisibilityOff />}
            type={!showRePass ? "text" : "password"}
            onRightIcon={() => {
              setShowRePass(!showRePass);
            }}
            isRequire
          />

          <Grid container>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                navigate(ROUTE.LOGIN);
              }}
              className={className.button}
              style={{
                backgroundColor: colors.black,
                borderColor: colors.black,
                color: colors.white,
              }}
            >
              Đổi mật khẩu
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordScreen;
