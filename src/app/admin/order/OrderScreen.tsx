import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import UpdateIcon from "@material-ui/icons/UpdateOutlined";
import React, { useEffect } from "react";
import EmptyComponent from "../../component/EmptyComponent";
import EnhancedTableHead from "../../component/EnhancedTableHead";
import LoadingProgress from "../../component/LoadingProccess";
import TextInputComponent from "../../component/TextInputComponent";
import { headCellsOrderAdmin } from "../../contant/ContaintDataAdmin";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { DEFINE_ORDER } from "../../screen/order/components/ItemOrderComponent";
import { OrderDto } from "../../screen/order/slice/OrderSlice";
import { colors } from "../../utils/color";
import { formatPrice, FunctionUtil, Order } from "../../utils/function";
import EnhancedTableToolbarOrder from "./components/EnhancedTableToolbar";
import FormDialog from "./components/FormDialog";
import FormDialogCreate from "./components/FormDialogCreate";
import { GetOrderAdminDto } from "./OrderApi";
import { incrementAsyncOrderAdminAdmin } from "./slice/OrderAdminSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      padding: 10,
      marginTop: 10,
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function OrderScreen() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof OrderDto>("id");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [openCreateForm, setOpenCreateForm] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [statusSearch, setStatusSearch] = React.useState(10);
  const [anchorElData, setAnchorElData] = React.useState<null | {
    item: OrderDto;
  }>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const { data, isLoading, count } = useAppSelector(
    (state) => state.orderAdmin
  );
  useEffect(() => {
    const timer= setTimeout(()=>{
      getData();
    },1000)
    return ()=> clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage,statusSearch]);

  const getData = async () => {
    
      let payload:GetOrderAdminDto = {
        page: page,
        size: rowsPerPage,
        
      };
      if(statusSearch!==10){
        payload ={
          ...payload,
          status: statusSearch
        }
      }
      await dispatch(incrementAsyncOrderAdminAdmin(payload));
   
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setAnchorElData(null);
  };

  const handleCloseCreateForm = () => {
    setOpenCreateForm(false);
  };

  const createSortHandler =
    (property: keyof OrderDto) => (event: React.MouseEvent<unknown>) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorElData(null);
  };
  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    item: any
  ) => {
    setAnchorEl(event.currentTarget);
    setAnchorElData({ item: item });
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Tooltip title="Update">
          <IconButton aria-label="update">
            <UpdateIcon color="primary" />
          </IconButton>
        </Tooltip>
        <p>Xem chi tiết</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <EnhancedTableToolbarOrder
        label="Đơn hàng"
        onCreate={() => {
          setOpenCreateForm(true);
        }}
        setStatus={setStatusSearch}
        status={statusSearch}
      />
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(event) => {
                setSelected(FunctionUtil.handleSelectAllClick(event, data));
              }}
              rowCount={data.length}
              headCells={headCellsOrderAdmin}
              createSortHandler={createSortHandler}
              isNoSort={true}
            />
            <TableBody style={{ position: "relative" }}>
              {data.length > 0 &&
                data.map((row, index) => {
                  const isItemSelected = isSelected(`${row.id}`);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}`}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        style={{ borderBottomColor: colors.white }}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => {
                            setSelected(
                              FunctionUtil.handleClick(
                                event,
                                `${row.id}`,
                                selected
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ borderBottomColor: colors.white }}
                      >
                        {row.id}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ borderBottomColor: colors.white }}
                      >
                        {row.fullName}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ borderBottomColor: colors.white }}
                      >
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ borderBottomColor: colors.white }}
                      >
                        {formatPrice(row.totalPrice ?? 0)}đ
                      </TableCell>

                      <TableCell
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          borderBottomColor: colors.white,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor:
                              DEFINE_ORDER[Number(row.status)].color,
                            borderRadius: 10,
                            alignSelf: "center",
                            display: "flex",
                            justifyContent: "center",
                            padding: 5,
                            width: "65%"
                          }}
                        >
                          <Typography
                            style={{ color: colors.white, fontSize: 14 }}
                          >
                            {DEFINE_ORDER[Number(row.status)].title}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ borderBottomColor: colors.white }}
                      >
                        <Button
                          onClick={(event) => {
                            handleProfileMenuOpen(event, row);
                          }}
                        >
                          ...
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {data?.length === 0 && (
                <div style={{ position: "absolute", top: 0, width: "100%" }}>
                  <EmptyComponent />
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {data?.length === 0 && (
          <div style={{ width: "100%" }}>
            <EmptyComponent />
          </div>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count ?? data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {renderMenu}
      <FormDialog
        open={open}
        handleClose={handleClose}
        anchorElData={anchorElData}
        setAnchorElData={setAnchorElData}
      />
      <FormDialogCreate
        open={openCreateForm}
        handleClose={handleCloseCreateForm}
      />
      {isLoading && <LoadingProgress />}
    </div>
  );
}
