import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
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
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/UpdateOutlined";
import React, { useEffect, useState } from "react";
import EnhancedTableHead from "../../component/EnhancedTableHead";
import EnhancedTableToolbar from "../../component/EnhancedTableToolbar";
import { headCellsVoucher } from "../../contant/ContaintDataAdmin";
import { TYPE_DIALOG } from "../../contant/Contant";
import { VoucherAdmin } from "../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FunctionUtil, Order } from "../../utils/function";
import FormDialog from "./components/FormDialog";
import { deleteVoucher, incrementAsyncVoucherAdmin, updateVoucher } from "././slice/VoucherAdminSlice";
import { colors } from "../../utils/color";
import EnhancedTableToolbarHeder from "../../component/EnhancedTableToolbarHeder";
import LoadingProgress from "../../component/LoadingProccess";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      marginTop: 10,
      padding: 10,
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
  })
);

export default function VoucherScreen() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof VoucherAdmin>("id");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [textFilter,setTextFilter] = useState('')
  const [anchorElData, setAnchorElData] = React.useState<null | {
    item: VoucherAdmin;
  }>(null);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      getData()
    },500)
    return ()=>clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[textFilter])

  const getData = async() =>{
    try {
      await dispatch(incrementAsyncVoucherAdmin(textFilter))
    } catch (e) {
      
    }
  }

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const { data,isLoading } = useAppSelector((state) => state.voucherAdmin);
  const [typeDialog, setTypeDialog] = useState(TYPE_DIALOG.CREATE);
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setAnchorElData(null);
  };

  const createSortHandler =
    (property: keyof VoucherAdmin) => (event: React.MouseEvent<unknown>) => {
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
          // console.log({ anchorElData });
        }}
        button
      >
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <p>Xoá</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setTypeDialog(TYPE_DIALOG.UPDATE);
          setOpen(!open);
        }}
      >
        <Tooltip title="Update">
          <IconButton aria-label="update">
            <UpdateIcon color="primary" />
          </IconButton>
        </Tooltip>
        <p>Cập nhật</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <EnhancedTableToolbarHeder
        onCreate={() => {
          setTypeDialog(TYPE_DIALOG.CREATE);
          setOpen(!open);
        }}
        label={"Quản lý khuyến mãi"}
        textFilter={textFilter}
        setTextFilter={setTextFilter}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onCreate={() => {
            setTypeDialog(TYPE_DIALOG.CREATE);
            setOpen(!open);
          }}
          onDelete={() => {
            dispatch(deleteVoucher({ array: selected }));
            setSelected([]);
          }}
          label={"Quản lý khuyến mãi"}
        />
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
              headCells={headCellsVoucher}
              createSortHandler={createSortHandler}
              childrenMore={
                <>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: colors.gradiantBluePosition,
                      borderBottomColor: colors.white,
                      color: colors.gradiantBlue,
                    }}
                  >
                    Ảnh
                  </TableCell>
                </>
              }
            />
            <TableBody>
              {data.length > 0 &&
                FunctionUtil.stableSort(
                  data,
                  FunctionUtil.getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
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
                          style={{
                            borderBottomColor: colors.white,
                          }}
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
                          style={{
                            borderBottomColor: colors.white,
                          }}
                        >
                          {row.id}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            borderBottomColor: colors.white,
                          }}
                        >
                          {row.eventName}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            borderBottomColor: colors.white,
                          }}
                        >
                          {row.description}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            borderBottomColor: colors.white,
                          }}
                        >
                          {row.startTime}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            borderBottomColor: colors.white,
                          }}
                        >
                          {row.endTime}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            borderBottomColor: colors.white,
                          }}
                        >
                          {row.createDate}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            borderBottomColor: colors.white,
                          }}
                        >
                          <Switch
                            checked={row.isActive}
                            onChange={(data) => {
                              let item = {
                                ...row,
                                isActive: !row.isActive,
                              };
                              dispatch(updateVoucher({ item: item }));
                            }}
                            name={labelId}
                            inputProps={{ "aria-label": labelId }}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            alignItems: "center",
                            display: "flex",
                            borderBottomColor: colors.white,
                          }}
                        >
                          <img
                            alt=""
                            src={row.image}
                            style={{ width: 120 }}
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            borderBottomColor: colors.white,
                          }}
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
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
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
        type={typeDialog}
        data={data}
      />
      {isLoading && <LoadingProgress />}
    </div>
  );
}
