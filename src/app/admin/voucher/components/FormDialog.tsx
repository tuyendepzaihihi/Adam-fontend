import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Formik } from "formik";
import moment from "moment";
import { useState } from "react";
import * as Yup from "yup";
import TextInputComponent from "../../../component/TextInputComponent";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { VoucherAdmin } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { colors } from "../../../utils/color";
import { createNotification } from "../../../utils/MessageUtil";
import { createVoucher, updateVoucher } from "../slice/VoucherAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: { item: VoucherAdmin } | null;
  type: number;
  data: VoucherAdmin[];
}
const validateVoucher = Yup.object({
  title: Yup.string().required("Vui lòng nhập title").trim(),
  description: Yup.string().required("Vui lòng nhập description").trim(),
  discount_persent: Yup.number()
    .min(1, "Tối thiểu 1%")
    .max(100, "Tối đa 100%")
    .required("Vui lòng nhập"),
  discount_min: Yup.number().min(0, "min 1").required("Vui lòng nhập"),
  discount_max: Yup.number()
    .min(0, "min 1")
    .moreThan(Yup.ref("discount_min"), "Giá max lớn hơn giá min")
    .required("Vui lòng nhập"),
});

interface PropsCreateVoucher {
  title: string;
  description: string;
  discount_persent: number;
  discount_max: number;
  discount_min: number;
}
const initialValues: PropsCreateVoucher = {
  title: "",
  description: "",
  discount_max: 0,
  discount_min: 0,
  discount_persent: 0,
};
const initDataDate = {
  start: {
    date: null,
    time: null,
  },
  end: {
    date: null,
    time: null,
  },
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;
  const [image, setImage] = useState<any>(null);
  const [time, setTime] = useState(initDataDate);

  const onSubmit = (data: PropsCreateVoucher) => {
    const { title, description, discount_max, discount_min, discount_persent } =
      data;
    checkTime();
    if (anchorElData) {
      const item: VoucherAdmin = {
        ...anchorElData.item,
        title: title,
        url: image ? image : anchorElData.item.url,
        description: description,
        status: 1,
        discountMaxValue: discount_max,
        discountMinValue: discount_min,
        discountPersent: discount_persent,
        endDate: checkTime()?.endDate,
        startDate: checkTime()?.startDate,
      };
      setImage(null);
      dispatch(updateVoucher({ item: item }));
      handleClose();
    }
  };
  const checkTime = () => {
    if (
      checkRenderStartTime({ isDate: true }) &&
      checkRenderStartTime({ isDate: false }) &&
      checkRenderEndTime({ isDate: true }) &&
      checkRenderEndTime({ isDate: false })
    ) {
      const startDate = `${
        checkRenderStartTime({ isDate: true }) +
        " " +
        checkRenderStartTime({ isDate: false }) +
        ":00"
      }`;
      const endDate = `${
        checkRenderEndTime({ isDate: true }) +
        " " +
        checkRenderEndTime({ isDate: false }) +
        ":00"
      }`;
      let startValue = moment(startDate, "YYYY-MM-DD HH:mm:ss", true);
      let endValue = moment(endDate, "YYYY-MM-DD HH:mm:ss", true);
      if (startValue > endValue) {
        createNotification({
          type: "warning",
          message:
            "Cần chọn thời gian bắt đầu nhỏ hơn thời gian kết thúc voucher",
        });
        return;
      }
      return {
        startDate: startValue.format("DD/MM/YYYY HH:mm"),
        endDate: endValue.format("DD/MM/YYYY HH:mm"),
      };
    } else {
      createNotification({
        type: "warning",
        message: "Cần chọn thời gian bắt đầu và thời gian kết thúc voucher",
      });
      return null;
    }
  };

  const onSubmitCreate = (dataCreate: PropsCreateVoucher) => {
    const { title, description, discount_max, discount_min, discount_persent } =
      dataCreate;
    checkTime();
    if (!image) {
      createNotification({
        type: "warning",
        message: "Bạn cần chọn ảnh!",
      });
      return;
    }
    const item: VoucherAdmin = {
      status: 1,
      create_date: moment(new Date()).format("DD/MM/YYYY"),
      description: description,
      discountMaxValue: discount_max,
      discountMinValue: discount_min,
      discountPersent: discount_persent,
      title: title,
      url: image,
      endDate: checkTime()?.endDate,
      startDate: checkTime()?.startDate,
      id: Math.random() * 1000,
    };

    dispatch(createVoucher({ item: item }));
    setImage(null);
    handleClose();
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log({ img });
      setImage(URL.createObjectURL(img));
    }
  };
  const checkRenderStartTime = (params: { isDate?: boolean }) => {
    const { isDate } = params;
    if (isDate) {
      return time?.start?.date
        ? time?.start?.date
        : convertDate(
            `${anchorElData?.item.startDate}`.substring(
              0,
              `${anchorElData?.item.startDate}`.lastIndexOf(" ")
            )
          );
    } else {
      return time?.start?.time
        ? time?.start?.time
        : `${anchorElData?.item.startDate}`.substring(
            `${anchorElData?.item.startDate}`.lastIndexOf(" ") + 1,
            `${anchorElData?.item.startDate}`.length
          );
    }
  };

  const checkRenderEndTime = (params: { isDate?: boolean }) => {
    const { isDate } = params;
    if (isDate) {
      return time?.end?.date
        ? time?.end?.date
        : convertDate(
            `${anchorElData?.item.endDate}`.substring(
              0,
              `${anchorElData?.item.endDate}`.lastIndexOf(" ")
            )
          );
    } else {
      return time?.end?.time
        ? time?.end?.time
        : `${anchorElData?.item.endDate}`.substring(
            `${anchorElData?.item.endDate}`.lastIndexOf(" ") + 1,
            `${anchorElData?.item.endDate}`.length
          );
    }
  };

  const onChangeTime = (event: any, isStart?: boolean) => {
    if (event.currentTarget.value) {
      let timeS = event.currentTarget.value;
      if (isStart) setTime({ ...time, start: { ...time.start, time: timeS } });
      else setTime({ ...time, end: { ...time.end, time: timeS } });
    }
  };
  const onChangeDate = (event: any, isStart?: boolean) => {
    if (event.currentTarget.value) {
      let date = event.currentTarget.value;
      if (isStart) setTime({ ...time, start: { ...time.start, date: date } });
      else setTime({ ...time, end: { ...time.end, date: date } });
    }
  };

  const convertDate = (date: string) => {
    const [day, month, year] = date.split("/");
    const res = `${year}-${month}-${day}`;
    return date ? res : "";
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Voucher" : `Cập nhật Voucher`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                title: anchorElData?.item.title ?? "",
                description: anchorElData?.item.title ?? "",
                discount_min: anchorElData?.item.discountMinValue ?? 0,
                discount_max: anchorElData?.item.discountMaxValue ?? 0,
                discount_persent: anchorElData?.item.discountPersent ?? 0,
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateVoucher}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
        }) => (
          <>
            <DialogContent style={{ width: "100%" }}>
              <DialogContentText>
                Cập nhật thông tin của Voucher, vui lòng điền tất cả thông tin
                cần thiết
              </DialogContentText>
              <div>
                <img
                  src={image ? image : anchorElData?.item.url}
                  alt=""
                  style={{ width: 300 }}
                />
                <h1>Select Image</h1>
                <input type="file" name="myImage" onChange={onImageChange} />
              </div>
              <TextInputComponent
                error={errors.title}
                touched={touched.title}
                value={values.title}
                label={"Title Voucher"}
                onChange={handleChange("title")}
                onBlur={handleBlur("title")}
              />
              <TextInputComponent
                error={errors.description}
                touched={touched.description}
                value={values.description}
                label={"Description Voucher"}
                onChange={handleChange("description")}
                onBlur={handleBlur("description")}
              />
              <TextInputComponent
                error={errors.discount_min}
                touched={touched.discount_min}
                value={`${values.discount_min}`}
                label={"Discount Min Voucher"}
                onChange={handleChange("discount_min")}
                onBlur={handleBlur("discount_min")}
              />
              <TextInputComponent
                error={errors.discount_max}
                touched={touched.discount_max}
                value={`${values.discount_max}`}
                label={"Discount Max Voucher"}
                onChange={handleChange("discount_max")}
                onBlur={handleBlur("discount_max")}
              />
              <TextInputComponent
                error={errors.discount_persent}
                touched={touched.discount_persent}
                value={`${values.discount_persent}`}
                label={"Discount Persent Voucher"}
                onChange={handleChange("discount_persent")}
                onBlur={handleBlur("discount_persent")}
              />
              <div>
                <div>
                  <h1>Start time</h1>
                  <div
                    style={{
                      display: "flex",
                      borderColor: colors.grayC4,
                      borderWidth: 0.5,
                      padding: 5,
                    }}
                  >
                    <input
                      type="date"
                      name="myImage"
                      onChange={(e) => onChangeDate(e, true)}
                      style={{
                        borderColor: colors.grayC4,
                        borderWidth: 0.5,
                        padding: 5,
                      }}
                      value={checkRenderStartTime({ isDate: true })}
                    />
                    <input
                      type="time"
                      name="myImage"
                      onChange={(e) => onChangeTime(e, true)}
                      style={{
                        borderColor: colors.grayC4,
                        borderWidth: 0.5,
                        padding: 5,
                      }}
                      value={checkRenderStartTime({ isDate: false })}
                    />
                  </div>
                </div>
                <div>
                  <h1>End time</h1>
                  <div
                    style={{
                      display: "flex",
                      borderColor: colors.grayC4,
                      borderWidth: 0.5,
                      padding: 5,
                    }}
                  >
                    <input
                      type="date"
                      name="myImage"
                      onChange={onChangeDate}
                      style={{
                        borderColor: colors.grayC4,
                        borderWidth: 0.5,
                        padding: 5,
                      }}
                      value={checkRenderEndTime({ isDate: true })}
                    />
                    <input
                      type="time"
                      name="myImage"
                      onChange={onChangeTime}
                      value={checkRenderEndTime({ isDate: false })}
                      style={{
                        borderColor: colors.grayC4,
                        borderWidth: 0.5,
                        padding: 5,
                      }}
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} color="primary">
                Submit
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};
export default FormDialog;
