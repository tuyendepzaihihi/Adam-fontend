import {
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextInputComponent from "../component/TextInputComponent";
import { UserInterface } from "../screen/setting/account/Account.props";
import { requestLogin } from "./AuthApi";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingLeft: "20%",
      paddingRight: "20%",
    },
    container: {
      flexFlow: "row",
      flexGrow: 1,
    },
    button: {
      height: 40,
      borderRadius: 8,
      marginTop: 20,
      width: "100%",
      borderColor: "black",
      color: "black",
    },
    textForgotPass: {
      color: "black",
      fontSize: 15,
      marginTop: 15,
    },
    textCreateAccount: {
      color: "black",
      fontSize: 15,
      marginTop: 15,
    },
    title: {
      textAlign: "center",
      fontSize: 45,
      fontWeight: "revert",
    },
  })
);
interface LoginInterface {
  user_name: string;
  password: string;
}
const initValuesLogin: LoginInterface = {
  password: "",
  user_name: "",
};

const LoginScreen = () => {
  const className = useStyles();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const validateLogin = Yup.object({
    user_name: Yup.string()
      .min(2, "Mininum 2 characters")
      .max(15, "Maximum 15 characters")
      .required("Required!"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required!"),
  });

  const formik = useFormik({
    initialValues: initValuesLogin,
    onSubmit: (value) => {
      handleSubmit(value);
    },
    validationSchema: validateLogin,
  });

  const handleSubmit = async (data: LoginInterface) => {
    try {
      const responseLogin: { data: { data: UserInterface } } =
        await requestLogin(data);
      if (responseLogin) {
        // setToken(responseLogin.data.data.token);
        navigate("/");
      }
    } catch (e) {}
  };

  return (
    <div className={className.root}>
      <p className={className.title}>Đăng nhập</p>
      <Grid container spacing={1}>
        <div style={{ width: "50%" }}>
          <TextInputComponent
            error={formik.errors.user_name}
            touched={formik.touched.user_name}
            value={formik.values.user_name}
            label={"Email hoặc số điện thoại"}
            onChange={formik.handleChange("user_name")}
            onBlur={formik.handleBlur("user_name")}
          />
          <TextInputComponent
            error={formik.errors.password}
            touched={formik.touched.password}
            value={formik.values.password}
            label={"Password"}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            rightIcon={showPass ? <Visibility /> : <VisibilityOff />}
            type={!showPass ? "text" : "password"}
            onRightIcon={() => {
              setShowPass(!showPass);
            }}
          />

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <button onClick={() => {}}>
                <p className={className.textForgotPass}>Quên mật khẩu?</p>
              </button>
            </Grid>
            <Grid item xs={6}>
              <button
                onClick={() => {
                  navigate("/register");
                }}
              >
                <p className={className.textCreateAccount}>
                  Bạn chưa có tài khoản? Tạo tài khoản mới
                </p>
              </button>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => formik.handleSubmit()}
            className={className.button}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {}}
            className={className.button}
            style={{
              backgroundColor: "red",
              borderColor: "red",
              color: "white",
            }}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {}}
            className={className.button}
            style={{
              backgroundColor: "blue",
              borderColor: "blue",
              color: "white",
            }}
          >
            Fb
          </Button>
        </div>
        <div style={{ paddingLeft: "3%", width: "50%", paddingTop: 20 }}>
          <div
            style={{ backgroundColor: "gray", width: "100%", height: "100%" }}
          />
        </div>
      </Grid>
    </div>
  );
};
export default LoginScreen;
