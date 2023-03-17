import {
  Button,
  createStyles, makeStyles,
  Theme
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoadingProgress from "../component/LoadingProccess";
import TextInputComponent from "../component/TextInputComponent";
import { ROUTE, ROUTE_ADMIN } from "../contant/Contant";
import { setDrawer, setIdAccount, setToken } from "../service/StorageService";
import { colors } from "../utils/color";
import { createNotification } from "../utils/MessageUtil";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingTop: 100,
      position: "relative",
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

const validateLogin = Yup.object({
  user_name: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(55, "Maximum 55 characters")
    .required("Required!"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required!"),
});

const LoginScreen = () => {
  const className = useStyles();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initValuesLogin,
    onSubmit: (value) => {
      handleSubmit(value);
    },
    validationSchema: validateLogin,
  });

  const handleSubmit = async (data: LoginInterface) => {
    try {
      setLoading(true);
      // const result: ResultApi<ResultLogin> = await requestLoginApp({
      //   password: data.password,
      //   username: data.user_name,
      // });
      setToken("token");
      setIdAccount(`${0}`);
      setDrawer("0");
      navigate(ROUTE_ADMIN.DASHBOARD);
      createNotification({ type: "success", message: "Đăng nhập thành công" });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className={className.root}>
      {/* <Grid container spacing={1} style={{ position: "relative" }}> */}
      <div style={{ width: "100%", paddingLeft: "20%", paddingRight: "20%" }}>
        <p className={className.title}>Đăng nhập</p>
        {/* <TextInputComponent
            error={formik.errors.user_name}
            touched={formik.touched.user_name}
            value={formik.values.user_name}
            label={"user name"}
            onChange={formik.handleChange("user_name")}
            onBlur={formik.handleBlur("user_name")}
            isRequire
          /> */}
        <TextInputComponent
          error={formik.errors.user_name}
          touched={formik.touched.user_name}
          value={formik.values.user_name}
          label={"Username"}
          onChange={formik.handleChange("user_name")}
          onBlur={formik.handleBlur("user_name")}
          isRequire
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
          isRequire
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              formik.handleSubmit();
            }
          }}
        >
          Login
        </Button>
      </div>

      {loading && <LoadingProgress />}
      {/* </Grid> */}
    </div>
  );
};
export default LoginScreen;
