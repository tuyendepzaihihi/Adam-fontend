/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import TextInputComponent from "../../../../component/TextInputComponent";
import {
  NAME_REGEX,
  PHONE_REGEX,
  textValidate,
  TYPE_DIALOG,
} from "../../../../contant/Contant";
import { useAppDispatch } from "../../../../hooks";
import { createNotification } from "../../../../utils/MessageUtil";
import {
  createAddress,
  DataAddress,
  updateAddress,
} from "../slice/AddressSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: { item: DataAddress } | null;
  type: number;
  data: DataAddress[];
}
interface Address {
  id: any;
  name: string;
}

const LIST_WARD: Address[] = [
  { id: 1, name: "Mỹ Đình" },
  { id: 2, name: "Phú đô" },
  { id: 3, name: "Mễ Trì" },
];

const LIST_PROVINCE: Address[] = [
  { id: 1, name: "Ha noi" },
  { id: 2, name: "HCM" },
  { id: 3, name: "Da nang" },
];
const LIST_DISRICT1: Address[] = [
  { id: 1, name: "Quan 1" },
  { id: 2, name: "Quan 2" },
  { id: 3, name: "Quan 3" },
];

const validateVoucher = Yup.object({
  phone: Yup.string()
    .min(10, textValidate.phone.error_validate)
    .max(11, textValidate.phone.error_validate)
    .matches(PHONE_REGEX, textValidate.phone.error_validate)
    .required()
    .trim(),
  name: Yup.string()
    .required(textValidate.full_name.require)
    .matches(NAME_REGEX, textValidate.full_name.error_validate)
    .trim(),
  address_detail: Yup.string()
    .min(2, "Min 2")
    .required(textValidate.full_name.require)
    .trim(),
});

interface PropsCreateAddress {
  phone: string;
  name: string;
  address_detail: string;
}
const initialValues: PropsCreateAddress = {
  name: "",
  phone: "",
  address_detail: "",
};

const initAddress = {
  ward: null,
  district: null,
  province: null,
};

const initDataAddress = {
  ward: [],
  district: [],
  province: LIST_PROVINCE,
};

const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;
  const [isDefault, setIsDefault] = useState<boolean>(
    anchorElData?.item.isDefault ?? false
  );
  const [selectedAddress, setSelectedAddress] = useState<{
    ward: Address | null;
    district: Address | null;
    province: Address | null;
  }>({
    ward: null,
    district: null,
    province: null,
  });

  const [dataAddress, setDataAddress] = useState<{
    ward: Address[];
    district: Address[];
    province: Address[];
  }>(initDataAddress);

  useEffect(() => {
    selectedAddress.province !== null && getDataDistrict();
  }, [selectedAddress.province]);

  useEffect(() => {
    selectedAddress.district !== null && getDataWard();
  }, [selectedAddress.district]);

  const getDataDistrict = () => {
    setDataAddress({ ...dataAddress, district: LIST_DISRICT1, ward: [] });
    setSelectedAddress({ ...selectedAddress, district: null, ward: null });
  };

  const getDataWard = () => {
    setDataAddress({ ...dataAddress, ward: LIST_WARD });
    setSelectedAddress({ ...selectedAddress, ward: null });
  };

  const close = () => {
    setSelectedAddress(initAddress);
    setDataAddress(initDataAddress);
    setIsDefault(false);
    handleClose();
  };

  const onSubmit = (data: PropsCreateAddress) => {
    const { name, phone, address_detail } = data;
    if (anchorElData) {
      const item: DataAddress = {
        ...anchorElData.item,
        name: name,
        phone: phone,
        isDefault: isDefault,
        addressDetail: address_detail,
      };
      dispatch(updateAddress({ item: item }));
      close();
    }
  };

  const onSubmitCreate = (dataCreate: PropsCreateAddress) => {
    if (
      selectedAddress.province === null ||
      selectedAddress.district === null ||
      selectedAddress.ward === null
    ) {
      createNotification({
        type: "warning",
        message: "Bạn cần điền đầy đủ thông tin",
      });
      return;
    }
    const { name, address_detail, phone } = dataCreate;
    const item: DataAddress = {
      addressDetail: address_detail,
      id: data.length,
      name: name,
      phone: phone,
      isDefault: isDefault,
    };
    dispatch(createAddress({ item: item }));

    close();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Address" : `Cập nhật Address`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                name: anchorElData?.item.name ?? "",
                phone: anchorElData?.item.phone ?? "",
                address_detail: anchorElData?.item.addressDetail ?? "",
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
                Cập nhật thông tin địa chỉ, vui lòng điền tất cả thông tin cần
                thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.name}
                touched={touched.name}
                value={values.name}
                label={"Tên người nhận"}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              <TextInputComponent
                error={errors.phone}
                touched={touched.phone}
                value={values.phone}
                label={"Số điện thoại người nhận"}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
              />
              <TextInputComponent
                error={errors.address_detail}
                touched={touched.address_detail}
                value={values.address_detail}
                label={"Địa chỉ chi tiết"}
                onChange={handleChange("address_detail")}
                onBlur={handleBlur("address_detail")}
              />

              <TextInputComponent
                label="province"
                value={selectedAddress.province}
                onChange={(event: any) => {
                  const value = event.target.value;
                  setSelectedAddress({
                    province: value,
                    district: null,
                    ward: null,
                  });
                }}
                isSelected={true}
                childrentSeleted={
                  <>
                    <option key={0} value={0}>
                      Chưa chọn
                    </option>
                    {dataAddress.province.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </>
                }
              />
              {dataAddress.district.length > 0 && (
                <TextInputComponent
                  label="district"
                  value={selectedAddress.district}
                  onChange={(event: any) => {
                    const value = event.target.value;
                    setSelectedAddress({
                      ...selectedAddress,
                      district: value,
                      ward: null,
                    });
                  }}
                  isSelected={true}
                  childrentSeleted={
                    <>
                      <option key={0} value={0}>
                        Chưa chọn
                      </option>
                      {dataAddress.district.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </>
                  }
                />
              )}
              {dataAddress.ward.length > 0 && (
                <TextInputComponent
                  label="ward"
                  value={selectedAddress.ward}
                  onChange={(event: any) => {
                    const value = event.target.value;
                    setSelectedAddress({
                      ...selectedAddress,
                      ward: value,
                    });
                  }}
                  isSelected={true}
                  childrentSeleted={
                    <>
                      <option key={0} value={0}>
                        Chưa chọn
                      </option>
                      {dataAddress.ward.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </>
                  }
                />
              )}
              <div style={{ paddingTop: 10 }}>
                <Typography color="secondary">Mac dinh</Typography>
                <Switch
                  checked={isDefault}
                  onChange={() => {
                    setIsDefault(!isDefault);
                  }}
                  color="secondary"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={close} color="primary">
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
