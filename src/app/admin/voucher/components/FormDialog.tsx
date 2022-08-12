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
import { ResultApi, VoucherAdmin } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { handleUploadImage } from "../../../service/Services";
import { colors } from "../../../utils/color";
import { createNotification } from "../../../utils/MessageUtil";
import { createVoucher, updateVoucher } from "../slice/VoucherAdminSlice";
import {
  CreateDto,
  requestPostCreateEvent,
  requestPutUpdateEvent,
  UpdateDto,
} from "../VoucherApi";
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
  // discount_min: Yup.number().min(0, "min 1").required("Vui lòng nhập"),
  // discount_max: Yup.number()
  //   .min(0, "min 1")
  //   .moreThan(Yup.ref("discount_min"), "Giá max lớn hơn giá min")
  //   .required("Vui lòng nhập"),
});

interface PropsCreateVoucher {
  title: string;
  description: string;
  discount_persent: number;
}
const initialValues: PropsCreateVoucher = {
  title: "",
  description: "",
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
  const { handleClose, open, anchorElData, type } = props;
  const [image, setImage] = useState<any>(null);
  const [time, setTime] = useState(initDataDate);

  const onSubmit = async (data: PropsCreateVoucher) => {
    const { title } = data;
    if (!checkTime()) {
      return;
    }
    if (anchorElData) {
      const payload: UpdateDto = {
        eventName: title,
        id: anchorElData.item.id,
        image: image ? image : anchorElData.item.image,
        isActive: anchorElData.item.isActive,
      };
      const res: ResultApi<VoucherAdmin> = await requestPutUpdateEvent(payload);
      setImage(null);
      dispatch(updateVoucher({ item: res.data }));
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
      const startTime = `${
        checkRenderStartTime({ isDate: true }) +
        " " +
        checkRenderStartTime({ isDate: false }) +
        ":00"
      }`;
      const endTime = `${
        checkRenderEndTime({ isDate: true }) +
        " " +
        checkRenderEndTime({ isDate: false }) +
        ":00"
      }`;
      let startValue = moment(startTime, "YYYY-MM-DD HH:mm:ss", true);
      let endValue = moment(endTime, "YYYY-MM-DD HH:mm:ss", true);
      if (startValue > endValue) {
        createNotification({
          type: "warning",
          message:
            "Cần chọn thời gian bắt đầu nhỏ hơn thời gian kết thúc voucher",
        });
        return;
      }
      return {
        startTime: startValue.toISOString(),
        endTime: endValue.toISOString(),
      };
    } else {
      createNotification({
        type: "warning",
        message: "Cần chọn thời gian bắt đầu và thời gian kết thúc voucher",
      });
      return null;
    }
  };

  const onSubmitCreate = async (dataCreate: PropsCreateVoucher) => {
    const { title, description, discount_persent } = dataCreate;
    if (!checkTime()) {
      return;
    }
    if (!image) {
      createNotification({
        type: "warning",
        message: "Bạn cần chọn ảnh!",
      });
      return;
    }
    const urlImage = await handleUploadImage(image);

    const payload: CreateDto = {
      description: description,
      endTime: checkTime()?.endTime,
      startTime: checkTime()?.startTime,
      eventName: title,
      image: urlImage,
      type: false,
    };
    const res: ResultApi<VoucherAdmin> = await requestPostCreateEvent(payload);
    dispatch(createVoucher({ item: res.data }));
    setImage(null);
    handleClose();
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if (!img || !img.type.match(/image.*/)) return;
      setImage(img);
    }
  };
  const checkRenderStartTime = (params: { isDate?: boolean }) => {
    const { isDate } = params;
    if (isDate) {
      return time?.start?.date
        ? time?.start?.date
        : convertDate(
            `${anchorElData?.item.startTime}`.substring(
              0,
              `${anchorElData?.item.startTime}`.lastIndexOf(" ")
            )
          );
    } else {
      return time?.start?.time
        ? time?.start?.time
        : `${anchorElData?.item.startTime}`.substring(
            `${anchorElData?.item.startTime}`.lastIndexOf(" ") + 1,
            `${anchorElData?.item.startTime}`.length
          );
    }
  };

  const checkRenderEndTime = (params: { isDate?: boolean }) => {
    const { isDate } = params;
    if (isDate) {
      return time?.end?.date
        ? time?.end?.date
        : convertDate(
            `${anchorElData?.item.endTime}`.substring(
              0,
              `${anchorElData?.item.endTime}`.lastIndexOf(" ")
            )
          );
    } else {
      return time?.end?.time
        ? time?.end?.time
        : `${anchorElData?.item.endTime}`.substring(
            `${anchorElData?.item.endTime}`.lastIndexOf(" ") + 1,
            `${anchorElData?.item.endTime}`.length
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
                title: anchorElData?.item.eventName ?? "",
                description: anchorElData?.item.description ?? "",
                discount_persent: 0,
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
                  src={image ? URL.createObjectURL(image) : anchorElData?.item.image}
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
                isRequire
              />
              <TextInputComponent
                error={errors.description}
                touched={touched.description}
                value={values.description}
                label={"Description Voucher"}
                onChange={handleChange("description")}
                onBlur={handleBlur("description")}
                isRequire
              />
              <TextInputComponent
                error={errors.discount_persent}
                touched={touched.discount_persent}
                value={`${values.discount_persent}`}
                label={"Discount Persent Voucher"}
                onChange={handleChange("discount_persent")}
                onBlur={handleBlur("discount_persent")}
                isRequire
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
