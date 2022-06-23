import {
  Button,
  createStyles,
  FormControl,
  IconButton,
  InputLabel,
  lighten,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import moment from "moment";
import { useState } from "react";
import { colors } from "../utils/color";
interface EnhancedTableToolbarProps {
  numSelected: number;
  onCreate: Function;
  onDelete: Function;
  label: string;
  isNonSearchTime?: boolean;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, onCreate, onDelete, label, isNonSearchTime } = props;
  const [textFilter, setTextFilter] = useState("");
  const [status, setStatus] = useState(`0`);

  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };
  return (
    <div>
      <div className={classes.filter}>
        <div className={classes.containerFilter}>
          <TextField
            value={textFilter}
            className={classes.textInput}
            label={"Search"}
            onChange={(event) => {
              setTextFilter(event.target.value);
            }}
          />
          {/* {!isNonSearchTime && (
            <div className={classes.containerDate}>
              <div>
                <p>Start date</p>
                <input
                  type={"date"}
                  onChange={(date) => {
                    console.log({
                      time: date.timeStamp,
                      date: moment.unix(date?.timeStamp).format("MM/DD/YYYY"),
                    });
                  }}
                  className={classes.dateInput}
                />
              </div>
              <div>
                <p>End date</p>
                <input
                  type={"date"}
                  onChange={(date) => {
                    console.log({ date });
                  }}
                  className={classes.dateInput}
                />
              </div>
            </div>
          )} */}
          {/* <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: colors.gray59 }}
            >
              Status
            </InputLabel>
            <Select
              value={status}
              onChange={handleChangeStatus}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Active</MenuItem>
              <MenuItem value={20}>InActive</MenuItem>
            </Select>
          </FormControl> */}
        </div>
        <div className={classes.containerButton}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 10 }}
            onClick={() => onCreate()}
          >
            Tạo mới thông tin
          </Button>
        </div>
      </div>
      {numSelected > 0 && (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} Bản ghi
            </Typography>
          ) : (
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Chưa chọn bản ghi nào
            </Typography>
          )}
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={() => onDelete()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      )}
    </div>
  );
};
export default EnhancedTableToolbar;
const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
    containerFilter: {
      width: "60%",
      height: 100,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textInput: {
      width: "40%",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "15%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    containerDate: {
      minWidth: "30%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dateInput: {
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      padding: 5,
    },
    containerButton: {
      width: "40%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    filter: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 10,
    },
  })
);
