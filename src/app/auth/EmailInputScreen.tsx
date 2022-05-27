// const EmailInputScreen = () => {
//   return <div>khanh</div>;
// };
// export default EmailInputScreen;
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextInputComponent from "../component/TextInputComponent";
import { REG_EMAIL, ROUTE, textValidate } from "../contant/Contant";
import { colors } from "../utils/color";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingLeft: "40%",
      paddingRight: "40%",
      paddingTop: 100,
    },
    button: {
      height: 40,
      borderRadius: 8,
      marginTop: 20,
      width: "50%",
      borderColor: colors.black,
      color: colors.black,
      fontWeight: "bold",
    },
    textForgotPass: {
      color: colors.gray59,
      fontSize: 16,
      marginTop: 15,
      textAlign: "left",
      fontWeight: "bolder",
      flex: 1,
      alignSelf: "center",
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
  email: string;
}
const initValuesLogin: LoginInterface = {
  email: "",
};

const EmailInputScreen = () => {
  const className = useStyles();
  const navigate = useNavigate();
  const validateLogin = Yup.object({
    email: Yup.string()
      .matches(REG_EMAIL, textValidate.email.error_validate)
      .min(10, "Mininum 2 characters")
      .max(100, "Maximum 15 characters")
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues: initValuesLogin,
    onSubmit: (value) => {
      handleSubmit(value);
    },
    validationSchema: validateLogin,
  });

  const handleSubmit = async (data: LoginInterface) => {
    console.log({ data });
    navigate(ROUTE.FORGOT_PASS, { state: { email: data.email } });
  };

  return (
    <div className={className.root}>
      <div style={{ width: "100%" }}>
        <p className={className.title}>Bạn quên mật khẩu</p>
        <div>
          <p className={className.descriptionText}>
            Vui lòng nhập email đã đăng ký để đặt lại mật khẩu
          </p>
          <TextInputComponent
            error={formik.errors.email}
            touched={formik.touched.email}
            value={formik.values.email}
            label={"Email"}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
          />

          <Grid container>
            <p className={className.textForgotPass}>
              <button
                onClick={() => {
                  navigate(ROUTE.LOGIN);
                }}
              >
                Quay lại
              </button>
            </p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                formik.handleSubmit();
              }}
              className={className.button}
              style={{
                backgroundColor: colors.black,
                borderColor: colors.black,
                color: colors.white,
                marginLeft: "10%",
              }}
            >
              Đặt lại mật khẩu
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default EmailInputScreen;
