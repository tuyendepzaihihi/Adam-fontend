import { Button, createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import moment from "moment";
import { useState } from "react";
import { colors } from "../../../utils/color";
interface EnhancedTableToolbarProps {
  label: string;
  onCreate: ()=>void
}

const EnhancedTableToolbarOrder = (props: EnhancedTableToolbarProps) => {
  const {onCreate} = props
  const classes = useToolbarStyles();
  const [textFilter, setTextFilter] = useState("");
  return (
    <Paper style={{ paddingTop: 10, paddingBottom: 15 }}>
      <div className={classes.filter}>
        <div className={classes.containerFilter}>
          <input
            value={textFilter}
            className={classes.textInput}
            onChange={(event) => {
              setTextFilter(event.target.value);
            }}
            placeholder="Search..."
          />
          <div className={classes.containerDate}>
            <div style={{ marginLeft: 10 }}>
              <p className={classes.textTitleDate}>Start date</p>
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
            <div style={{ marginLeft: 10 }}>
              <p className={classes.textTitleDate}>End date</p>
              <input
                type={"date"}
                onChange={(date) => {
                  console.log({ date });
                }}
                className={classes.dateInput}
              />
            </div>
          </div>
          <div className={classes.containerButton}>
            
          <Button
            variant="contained"
            style={{
              marginLeft: 10,
              backgroundColor: colors.gradiantBluePosition,
              color: colors.gradiantBlue,
            }}
            onClick={() => onCreate()}
          >
            Tạo mới đơn hàng
          </Button>
        </div>
        </div>
      </div>
    </Paper>
  );
};
export default EnhancedTableToolbarOrder;
const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerFilter: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    textInput: {
      width: "100%",
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      height: 40,
      borderRadius: 5,
      marginTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    containerDate: {
      minWidth: "30%",
      display: "flex",
      flexDirection: "row",
      marginLeft: 20,
    },
    dateInput: {
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      padding: 5,
      borderRadius: 5,
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
    textTitleDate: {
      fontSize: 12,
      color: colors.gray59,
    },
    containerButton: {
      width: "40%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  })
);
