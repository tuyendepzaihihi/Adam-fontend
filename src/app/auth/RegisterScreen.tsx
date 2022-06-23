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
import {
  NAME_REGEX,
  PHONE_REGEX,
  REG_EMAIL,
  textValidate,
} from "../contant/Contant";
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
      textAlign: "left",
      fontSize: 40,
      fontWeight: "bold",
    },
    descriptionText: {
      fontSize: 15,
      color: colors.gray59,
    },
  })
);
interface RegisterInterface {
  email: string;
  password: string;
  re_password: string;
  phone: string;
  fullname: string;
}
const initValuesRegister: RegisterInterface = {
  password: "",
  email: "",
  fullname: "",
  phone: "",
  re_password: "",
};

const RegisterScreen = () => {
  const className = useStyles();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);
  const validateRegister = Yup.object({
    phone: Yup.string()
      .min(10, textValidate.phone.error_validate)
      .max(11, textValidate.phone.error_validate)
      .matches(PHONE_REGEX, textValidate.phone.error_validate)
      .required()
      .trim(),
    password: Yup.string()
      .min(6, textValidate.pass.short)
      .max(25, textValidate.pass.long)
      .required(textValidate.pass.require)
      .trim(),
    email: Yup.string()
      .matches(REG_EMAIL, textValidate.email.error_validate)
      .required(textValidate.email.require)
      .trim(),
    fullname: Yup.string()
      .required(textValidate.full_name.require)
      .matches(NAME_REGEX, textValidate.full_name.error_validate)
      .trim(),
    re_password: Yup.string()
      .min(6, textValidate.pass.short)
      .max(25, textValidate.pass.long)
      .required(textValidate.re_pass.require)
      .oneOf([Yup.ref("password")], textValidate.re_pass.not_found),
  });

  const formik = useFormik({
    initialValues: initValuesRegister,
    onSubmit: (value) => {
      handleSubmit(value);
    },
    validationSchema: validateRegister,
  });

  const handleSubmit = async (data: RegisterInterface) => {
    try {
      //   const responseRegister: { data: { data: UserInterface } } =
      //     await requestRegister(data);
      //   if (responseRegister) {
      //     // setToken(responseRegister.data.data.token);
      //     navigate("/");
      //   }
    } catch (e) {}
  };

  return (
    <div className={className.root}>
      <Grid container spacing={1}>
        <div style={{ width: "50%" }}>
          <p className={className.title}>Đăng ký</p>
          <p className={className.descriptionText}>
            Hãy đăng ký để hưởng nhiều ưu đãi khác nhau của chúng tôi, AdamStore
          </p>
          <TextInputComponent
            error={formik.errors.email}
            touched={formik.touched.email}
            value={formik.values.email}
            label={"Email"}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
          />
          <TextInputComponent
            error={formik.errors.phone}
            touched={formik.touched.phone}
            value={formik.values.phone}
            label={"Số điện thoại"}
            onChange={formik.handleChange("phone")}
            onBlur={formik.handleBlur("phone")}
          />
          <TextInputComponent
            error={formik.errors.fullname}
            touched={formik.touched.fullname}
            value={formik.values.fullname}
            label={"Tên họ đầy đủ"}
            onChange={formik.handleChange("fullname")}
            onBlur={formik.handleBlur("fullname")}
          />
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
          />

          <Button
            variant="outlined"
            color="primary"
            onClick={() => formik.handleSubmit()}
            className={className.button}
          >
            Đăng ký
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/Register");
            }}
            className={className.button}
            style={{
              backgroundColor: colors.black,
              borderColor: colors.black,
              color: colors.white,
            }}
          >
            Quay lại đăng nhập
          </Button>
        </div>
        <div
          style={{
            paddingLeft: "3%",
            width: "50%",
            paddingTop: 20,
            alignSelf: "center",
          }}
        >
          <img style={{ width: "95%" }} src={R.images.img_banner_fashion} />
        </div>
      </Grid>
    </div>
  );
};
export default RegisterScreen;
