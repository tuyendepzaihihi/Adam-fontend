import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { Order } from "../utils/function";

interface EnhancedTableProps {
  classes: any;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: any[];
  createSortHandler: any;
  childrenMore?: any;
  nonActivties?: boolean;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    headCells,
    createSortHandler,
    childrenMore,
    nonActivties,
  } = props;
  return (
    <TableHead>
      <TableRow style={{ borderColor: "rgba(0,165,255)", borderWidth: 0.5 }}>
        <TableCell
          padding="checkbox"
          style={{
            backgroundColor: `rgba(0,165,255,0.1)`,
          }}
        >
          {!nonActivties && (
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          )}
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              backgroundColor: `rgba(0,165,255,0.1)`,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ color: "rgba(0,165,255)" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {childrenMore}
        {!nonActivties && (
          <TableCell
            align="right"
            style={{
              backgroundColor: `rgba(0,165,255,0.1)`,
              color: "rgba(0,165,255)",
            }}
          >
            Hoạt động
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
export default EnhancedTableHead;
