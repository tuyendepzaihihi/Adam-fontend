import {
  createStyles,
  Dialog,
  DialogTitle,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import LoadingProgress from "../../../component/LoadingProccess";
import { TYPE_DIALOG } from "../../../contant/Contant";
import {
  DetailProductAdmin,
  ProductAdmin,
} from "../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { incrementAsyncCategoryAdmin } from "../../category/slice/CategoryAdminSlice";
import { incrementAsyncMaterialAdmin } from "../../material/slice/MaterialAdminSlice";
import { incrementAsyncOptionColor } from "../../option/slice/OptionColorSlice";
import { incrementAsyncOptionSize } from "../../option/slice/OptionSizeSlice";
import { incrementAsyncTagAdmin } from "../../tag/slice/TagAdminSlice";
import ComponentFormCreate from "./create/ComponentFormCreate";
import CreateProductDetail from "./create/CreateProductDetail";
import ListProductDetail from "./create/ListProductDeail";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: ProductAdmin[];
}
const validateProduct = Yup.object({
  product_name: Yup.string().required("Vui lòng nhập").trim(),
  description: Yup.string().required("Vui lòng nhập").trim(),
});

export interface PropsCreateProduct {
  product_name: string;
  description: string;
}
const initialValues: PropsCreateProduct = {
  product_name: "",
  description: "",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Product information", "Product detail", "Custome product"];
}

const FormDialogProductCreate = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;
  const [dataProduct, setDataProduct] = useState<ProductAdmin | null>(null);
  const [option, setOption] = useState<any[]>([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    await dispatch(incrementAsyncMaterialAdmin());
    await dispatch(incrementAsyncTagAdmin());
    await dispatch(incrementAsyncCategoryAdmin());
    await dispatch(incrementAsyncOptionColor());
    await dispatch(incrementAsyncOptionSize());
  };

  const loadingTags = useAppSelector((state) => state.tagAdmin).isLoading;
  const loadingMaterials = useAppSelector(
    (state) => state.materialAdmin
  ).isLoading;
  const loadingCategories = useAppSelector(
    (state) => state.categoryAdmin
  ).isLoading;

  const onClose = () => {
    handleReset();
    handleClose();
  };

  const onSubmit = (data: ProductAdmin) => {
    setDataProduct(data);
    handleNext();
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <ComponentFormCreate
            handleClose={onClose}
            initialValues={initialValues}
            steps={steps}
            onSubmit={onSubmit}
            validateProduct={validateProduct}
            dataProduct={dataProduct}
          />
        );
      case 1:
        return (
          <CreateProductDetail
            handleBack={handleBack}
            handleNext={handleNext}
            productItem={dataProduct}
            option={option}
            setOption={setOption}
          />
        );
      case 2:
        return (
          <ListProductDetail onSubmit={(list: DetailProductAdmin[]) => {}} />
        );
      default:
        return "Unknown stepIndex";
    }
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Product" : `Cập nhật Product`}
      </DialogTitle>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ width: 1200 }}>
          <div>{getStepContent(activeStep)}</div>
        </div>
      </div>
      {(loadingCategories || loadingMaterials || loadingTags) && (
        <LoadingProgress />
      )}
    </Dialog>
  );
};
export default FormDialogProductCreate;
