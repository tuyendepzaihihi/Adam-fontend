import { Switch, TableCell, TableRow, TextField } from "@material-ui/core";
import {
  LIST_PRODUCT,
  OPTIONS_DATA,
} from "../../../../../contant/ContaintDataAdmin";
import { DetailProductAdmin } from "../../../../../contant/IntefaceContaint";
import { formatPrice } from "../../../../../utils/function";
import { createNotification } from "../../../../../utils/MessageUtil";

interface Props {
  row: DetailProductAdmin;
  labelId: string;
  listProductDetail: DetailProductAdmin[];
  setListProductDetail: any;
}

const FormEditProductDetail = (props: Props) => {
  const { row, labelId, listProductDetail, setListProductDetail } = props;

  const handleChangePrice = (params: {
    keyString: "price_import" | "price_export" | "quantity";
    text: string;
  }) => {
    const { keyString, text } = params;
    let newText = `${text}`.replace(",", "").replace(",", "").replace(",", "");
    const isNumber = Number.isInteger(Number(newText));
    if (!isNumber) {
      createNotification({
        type: "warning",
        message: "Bạn cần nhập giá số",
      });
      return;
    }
    let value = row[`${keyString}`];

    if (newText) {
      value = Number(newText);
    } else {
      value = 0;
      createNotification({
        type: "warning",
        message: "Bạn cần nhập giá xuất",
      });
    }

    const oldArray = listProductDetail;

    let item: DetailProductAdmin = { ...row };
    item[keyString] = value;

    const newProductDetail = oldArray?.map((e) => {
      if (e.id === item.id) return item;
      else return e;
    });
    setListProductDetail(newProductDetail);
  };
  return (
    <TableRow hover tabIndex={-1} key={`${row.id}`}>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.id}
      </TableCell>
      <TableCell align="right">
        {LIST_PRODUCT.find((e) => e.id === row.product_id)?.product_name}
      </TableCell>
      <TableCell align="right">
        {OPTIONS_DATA.colors.find((e) => e.id === row.color_id)?.colorName}
      </TableCell>
      <TableCell align="right">
        {OPTIONS_DATA.sizes.find((e) => e.id === row.size_id)?.sizeName}
      </TableCell>

      <TableCell align="right">
        <TextField
          value={`${formatPrice(row.price_import)}`}
          onChange={(event) =>
            handleChangePrice({
              keyString: "price_import",
              text: `${event.target.value}`,
            })
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          value={`${formatPrice(row.price_export)}`}
          onChange={(event) =>
            handleChangePrice({
              keyString: "price_export",
              text: `${event.target.value}`,
            })
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">{row.image_product}</TableCell>
      <TableCell align="right">
        <TextField
          value={`${formatPrice(row.quantity)}`}
          onChange={(event) =>
            handleChangePrice({
              keyString: "quantity",
              text: `${event.target.value}`,
            })
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">
        <Switch
          checked={row.status === 1 ? true : false}
          onChange={(data) => {}}
          name={labelId}
          inputProps={{ "aria-label": labelId }}
          color="primary"
        />
      </TableCell>
    </TableRow>
  );
};
export default FormEditProductDetail;
