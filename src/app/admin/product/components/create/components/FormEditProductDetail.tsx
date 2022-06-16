import { Switch, TableCell, TableRow, TextField } from "@material-ui/core";
import {
  LIST_PRODUCT,
  OPTIONS_DATA,
} from "../../../../../contant/ContaintDataAdmin";
import { DetailProductAdmin } from "../../../../../contant/IntefaceContaint";

interface Props {
  row: DetailProductAdmin;
  labelId: string;
  listProductDetail: DetailProductAdmin[];
  setListProductDetail: any;
}

const FormEditProductDetail = (props: Props) => {
  const { row, labelId, listProductDetail, setListProductDetail } = props;
  return (
    <TableRow hover tabIndex={-1} key={`${row.id}`}>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.id}
      </TableCell>
      <TableCell align="right">
        {LIST_PRODUCT.find((e) => e.id === row.product_id)?.product_name}
      </TableCell>
      <TableCell align="right">
        {OPTIONS_DATA.colors.find((e) => e.id === row.color_id)?.color_name}
      </TableCell>
      <TableCell align="right">
        {OPTIONS_DATA.sizes.find((e) => e.id === row.size_id)?.size_name}
      </TableCell>

      <TableCell align="right">
        <TextField
          value={`${row.price_import}`}
          onChange={(text: any) => {}}
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          value={`${row.price_export}`}
          onChange={(text) => {
            if (text) {
              const oldArray = listProductDetail;
              let item: DetailProductAdmin = {
                ...row,
                price_export: Number(text.target.value),
              };
              const newProductDetail = oldArray?.map((e) => {
                if (e.id === item.id) return item;
                else return e;
              });
              setListProductDetail(newProductDetail);
            }
          }}
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">{row.image_product}</TableCell>
      <TableCell align="right">
        <TextField
          value={`${row.quantity}`}
          onChange={(text: any) => {}}
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
