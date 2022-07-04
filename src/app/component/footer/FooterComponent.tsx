import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { colors } from "../../utils/color";

const FooterComponent = () => {
  const className = useStyles();
  return (
    <div className={className.root}>
      <div className={className.containerInfoCompany}>
        <p className={className.textStore}>ADAM STORE</p>
        <p className={className.textDescription}>
          Cửa hàng Adam store, chuyên hàng nam toàn quốc
        </p>
        <p className={className.textDescription}>
          24/7, tất cả các ngày trong tuần
        </p>
        <p style={{ fontWeight: "bold", marginTop: 5 }}>
          Địa chỉ văn phòng:{" "}
          <p
            style={{ fontSize: 15, color: colors.gray59, fontWeight: "normal" }}
          >
            01 Trịng Văn Bô, Xuân Phương, Nam Từ Liên, Hà Nội
          </p>
        </p>
      </div>
      <div
        className={className.containerInfoCompany}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "45%" }}>
          <p className={className.textTitle}>Giới thiệu</p>
          <Button className={className.button}>Giới thiệu</Button>
          <Button className={className.button}>Hệ thống cửa hàng</Button>
          <Button className={className.button}>Liên hệ</Button>
          <Button className={className.button}>Chính sách bảo mật</Button>
        </div>
        <div style={{ width: "45%" }}>
          <p className={className.textTitle}>Chính sách</p>
          <Button className={className.button}>Chính sách thành toán</Button>
          <Button className={className.button}>Hướng dẫn chọn đồ</Button>
          <Button className={className.button}>Hướng dẫn thanh toán</Button>
          <Button className={className.button}>Chính sách vận chuyển</Button>
        </div>
      </div>
      <div className={className.containerInfoCompany}>
        {/* <p className={className.textStore}>ADAM STORE</p> */}
      </div>
    </div>
  );
};
export default FooterComponent;
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: colors.grayC4,
      padding: 10,
      marginTop: 100,
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingTop: 20,
      paddingBottom: 40,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    containerInfoCompany: {
      width: "30%",
      height: "100%",
    },
    textStore: {
      fontSize: 35,
      fontWeight: "bold",
      fontStyle: "italic",
      color: colors.black,
    },
    textTitle: {
      fontSize: 20,
      color: colors.black,
      paddingBottom: 10,
      fontWeight: "bold",
    },
    textDescription: {
      fontWeight: "bold",
    },
    button: {
      fontSize: 12,
    },
  })
);
