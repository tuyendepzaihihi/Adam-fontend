import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DataOrder } from "../slice/OrderSlice";
import R from "../../../assets/R";
import { colors } from "../../../utils/color";
import { ItemCart } from "../../../contant/Contant";
import { formatPrice } from "../../../utils/function";
import { LocationOn } from "@material-ui/icons";
import { renderAddress } from "../../../utils/helper";
import { Button } from "@material-ui/core";
import TimeLineComponent from "./TimeLineComponent";

interface Props {
  item: DataOrder;
}

export const TYPE_ORDER = {
  PENDING: 1,
  CONFIRM: 2,
  DELIVETY: 3,
  ARIVED: 4,
  DONE: 5,
  CANCEL: 6,
  ROLL_BACK: 7,
};

export const DEFINE_ORDER = {
  [TYPE_ORDER.PENDING]: {
    title: "Đang chờ",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
  },
  [TYPE_ORDER.CONFIRM]: {
    title: "Đã xác nhận",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
  },
  [TYPE_ORDER.DELIVETY]: {
    title: "Đang vận chuyển",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
  },
  [TYPE_ORDER.ARIVED]: {
    title: "Đã tới nói",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
  },
  [TYPE_ORDER.DONE]: {
    title: "Thành công",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
  },
  [TYPE_ORDER.CANCEL]: {
    title: "Huỷ",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
  },
  [TYPE_ORDER.ROLL_BACK]: {
    title: "Đơn trả",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
  },
};

const ItemProduct = (props: { item?: ItemCart; inList?: boolean }) => {
  const { item, inList } = props;
  const classes = useStyles();
  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <img alt="" src={R.images.img_product} style={{ width: 50 }} />
        <div style={{ flex: 1, paddingLeft: 20 }}>
          <Typography className={classes.heading}>{item?.name}</Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{ display: "flex" }}
          >
            Price:
            <Typography className={classes.heading}>
              {formatPrice(item?.price ?? 0)}đ
            </Typography>
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{ display: "flex" }}
          >
            Total price:
            <Typography className={classes.heading}>
              {formatPrice(item?.totalPrice ?? 0)}đ
            </Typography>
          </Typography>
        </div>
      </div>
      {inList && <p>x{item?.count}</p>}
    </div>
  );
};

export default function ItemOrderComponent(props: Props) {
  const { item } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                paddingTop: 10,
                paddingBottom: 5,
                borderBottomColor: colors.grayC4,
                borderBottomWidth: 0.7,
                borderTopColor: colors.grayC4,
                borderTopWidth: 0.7,
                marginBottom: 5,
                // paddingLeft: 5,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography className={classes.heading}>{item.code}</Typography>
              <Typography className={classes.secondaryHeading}>
                {item.create_date}
              </Typography>
            </div>
            <div style={{ paddingLeft: 20 }}>
              {item.products?.map((e, index) => {
                return (
                  <Typography key={index} className={classes.secondaryHeading}>
                    {e.name} | {formatPrice(e.price)}đ | x{e.count}
                  </Typography>
                );
              })}
            </div>
            <Typography className={classes.heading}>
              Tổng tiền: {formatPrice(item.totalPrice)}đ
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.detailInformation}>
          <TimeLineComponent list={item.history} />
          <Typography className={classes.heading}>
            {DEFINE_ORDER[item.status].title}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {DEFINE_ORDER[item.status].description}
          </Typography>
          <div style={{ paddingTop: 10 }}>
            <div style={{ display: "flex", paddingTop: 5 }}>
              <LocationOn />
              <div style={{ paddingLeft: 15 }}>
                <Typography className={classes.heading}>
                  {item.address?.name} | {item.address?.phone}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {renderAddress(item.address)}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.containerListProducts}>
            {item.products?.map((e, index) => {
              return <ItemProduct item={e} key={index} inList={true} />;
            })}
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <Typography className={classes.heading}>
                Tổng tiền hàng
              </Typography>
              <Typography className={classes.heading}>Giảm giá</Typography>
              <Typography className={classes.heading}>Thành tiền</Typography>
            </div>
            <div style={{ paddingLeft: 20 }}>
              <Typography className={classes.secondaryHeading}>
                {formatPrice(item.totalProduct)}đ
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {formatPrice(item.totalDiscount)}đ
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {formatPrice(item.totalPrice)}đ
              </Typography>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              alignItems: "flex-end",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button variant="outlined" color="secondary">
              Huỷ
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: 10,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: "bold",
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    detailInformation: {
      borderTopWidth: 0.5,
      borderTopColor: colors.grayC4,
      display: "flex",
      flexDirection: "column",
      paddingLeft: 40,
    },
    containerListProducts: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
      paddingLeft: 30,
    },
  })
);
