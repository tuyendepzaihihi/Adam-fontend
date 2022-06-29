import { Button, IconButton, makeStyles } from "@material-ui/core";
import { EditLocation, LocationOn } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { colors } from "../../../utils/color";
import FormDialog from "./components/FormDialog";
import { DataAddress } from "./slice/AddressSlice";

const AddressUser = () => {
  const dispatch = useAppDispatch();
  const className = useStyles();
  const [open, setOpen] = useState(false);
  const { data } = useAppSelector((state) => state.addressUser);
  const [typeDialog, setTypeDialog] = useState(TYPE_DIALOG.CREATE);
  const [anchorElData, setAnchorElData] = useState<null | {
    item: DataAddress;
  }>(null);

  const handleClose = () => {
    setOpen(false);
    setAnchorElData(null);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
    } catch (e) {
      console.log({ e });
    }
  };

  const renderAddress = (item: DataAddress) => {
    let detail = item.addressDetail;
    let ward = item.wardName ? " - " + item.wardName : "";
    let district = item.districtName ? " - " + item.districtName : "";
    let province = item.provinceName ? " - " + item.provinceName : "";
    return detail + ward + district + province;
  };

  const ItemAddress = (params: { item: DataAddress }) => {
    const { item } = params;
    return (
      <div className={className.root}>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LocationOn color={item.isDefault ? "secondary" : "inherit"} />
          </div>
          <div style={{ marginLeft: 10 }}>
            <p style={{ color: colors.black, fontWeight: "bold" }}>
              {renderAddress(item)}
            </p>
            <p style={{ color: colors.gray59 }}>
              {item.name} | {item.phone}
            </p>
          </div>
        </div>
        <div>
          <IconButton
            onClick={() => {
              setAnchorElData({ item });
              setTypeDialog(TYPE_DIALOG.UPDATE);
              setOpen(!open);
            }}
          >
            <EditLocation color="secondary" />
          </IconButton>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div
        style={{
          paddingTop: 10,
          paddingBottom: 20,
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setTypeDialog(TYPE_DIALOG.CREATE);
            setOpen(!open);
          }}
        >
          Thêm địa chỉ
        </Button>
      </div>
      {data?.map((e, index) => {
        return <div key={index}>{ItemAddress({ item: e })}</div>;
      })}

      <FormDialog
        open={open}
        handleClose={handleClose}
        anchorElData={anchorElData}
        type={typeDialog}
        data={data}
      />
    </div>
  );
};
export default AddressUser;

const useStyles = makeStyles({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: colors.grayC4,
    borderRadius: 5,
    borderWidth: 0.8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
