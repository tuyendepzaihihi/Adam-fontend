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
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import R from "../assets/R";
import TextInputComponent from "../component/TextInputComponent";
import { ROUTE } from "../contant/Contant";
import { colors } from "../utils/color";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingTop: 100,
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
      borderColor: colors.black,
      color: colors.black,
      fontWeight: "bold",
    },
    textForgotPass: {
      color: colors.gray59,
      fontSize: 16,
      marginTop: 15,
      textAlign: "right",
      fontWeight: "bolder",
    },
    textCreateAccount: {
      color: colors.black,
      fontSize: 15,
      marginTop: 15,
    },
    title: {
      textAlign: "left",
      fontSize: 36,
      fontWeight: "bold",
    },
    descriptionText: {
      fontSize: 15,
      color: colors.gray59,
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
      <Grid container spacing={1}>
        <div style={{ width: "50%" }}>
          <p className={className.title}>Đăng nhập</p>
          <p className={className.descriptionText}>
            Hãy đăng nhập để hưởng nhiều ưu đãi khác nhau của chúng tôi,
            AdamStore
          </p>
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
          <p className={className.textForgotPass}>
            <button
              onClick={() => {
                navigate(ROUTE.EMAIL_INPUT);
              }}
            >
              Quên mật khẩu?
            </button>
          </p>

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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate(ROUTE.REGISTER);
            }}
            className={className.button}
            style={{
              backgroundColor: colors.black,
              borderColor: colors.black,
              color: colors.white,
            }}
          >
            Tạo tài khoản mới
          </Button>
        </div>
        <div
          style={{
            paddingLeft: "3%",
            width: "50%",
          }}
        >
          <img style={{ width: "95%" }} src={R.images.img_banner_fashion} />
        </div>
      </Grid>
    </div>
  );
};
export default LoginScreen;
