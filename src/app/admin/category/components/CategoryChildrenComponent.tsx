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
import { Delete } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/UpdateOutlined";
import React, { useState } from "react";

import EnhancedTableHead from "../../../component/EnhancedTableHead";
import { headCellsCategory } from "../../../contant/ContaintDataAdmin";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { CategoryAdmin } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { FunctionUtil, Order } from "../../../utils/function";
import {
  deleteCategoryChilden,
  updateCategoryChilden,
} from "../slice/CategoryAdminSlice";
import FormDialog from "./FormDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
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

interface Props {
  data: CategoryAdmin[];
  category_parent_id: number;
}

export default function CategoryChildrenComponent(props: Props) {
  const { data, category_parent_id } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof CategoryAdmin>("id");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElData, setAnchorElData] = React.useState<null | {
    item: CategoryAdmin;
  }>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const [typeDialog, setTypeDialog] = useState(TYPE_DIALOG.CREATE);

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setAnchorElData(null);
  };

  const createSortHandler =
    (property: keyof CategoryAdmin) => (event: React.MouseEvent<unknown>) => {
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

  const handleChangeStatus = (row: CategoryAdmin, id: number) => {
    let item = {
      ...row,
      isDeleted: !row.isDeleted,
    };
    dispatch(updateCategoryChilden({ item: item, id: id }));
  };

  const handleDelete = (array: any[]) => {
    dispatch(deleteCategoryChilden({ array: array, id: category_parent_id }));
    setSelected([]);
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
        onClick={() => handleDelete([`${anchorElData?.item.id}`])}
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        {selected.length > 0 ? (
          <IconButton onClick={() => handleDelete(selected)}>
            <Delete color="secondary" />
          </IconButton>
        ) : (
          <div />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setTypeDialog(TYPE_DIALOG.CREATE);
            setOpen(!open);
          }}
        >
          Tạo mới
        </Button>
      </div>
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
              headCells={headCellsCategory}
              createSortHandler={createSortHandler}
            />
            <TableBody>
              {data.length > 0 &&
                data

                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(`${row.id}`);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <>
                        <TableRow
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={`${row.id}`}
                          selected={isItemSelected}
                          className={classes.table}
                        >
                          <TableCell padding="checkbox">
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
                          >
                            {row.id}
                          </TableCell>
                          <TableCell align="right">
                            {row.categoryName}
                          </TableCell>
                          <TableCell align="right">
                            <Switch
                              checked={row.isDeleted ? row.isDeleted : false}
                              onChange={() =>
                                handleChangeStatus(row, category_parent_id)
                              }
                              name={labelId}
                              inputProps={{ "aria-label": labelId }}
                              color="primary"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={(event) => {
                                handleProfileMenuOpen(event, row);
                              }}
                            >
                              ...
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
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
        isParent={false}
        category_parent_id={category_parent_id}
      />
    </div>
  );
}
