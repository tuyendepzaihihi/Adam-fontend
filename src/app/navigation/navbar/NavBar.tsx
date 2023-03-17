import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getToken } from "../../service/StorageService";
import { colors } from "../../utils/color";
import MiniDrawer from "../Drawer";
import MainApp from "../MainApp";
import { useNavBarStyles } from "./styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 70,
      width: "100%",
      backgroundColor: colors.white,
      padding: 10,
    },
    container: {
      padding: 10,
      flex: 1,
      borderTopLeftRadius: 10,

      borderBottomLeftRadius: 10,
    },
    textPath: {
      fontSize: 13,
      color: colors.gray59,
      marginTop: 5,
    },
    title: {
      fontWeight: "bold",
      color: colors.gray59,
    },
  })
);
export default function NavBar() {
  const classes = useNavBarStyles();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [location.pathname]);
  const token = getToken();
  const styles = useStyles();
  return (
    <div className={classes.grow}>
      {
        <div className={classes.containerAdmin}>
          {token && <MiniDrawer open={open} setOpen={setOpen} />}
          <div style={{ flex: 1 }}>
            {token && (
              <div className={styles.root}>
                <Typography className={styles.title}>
                  ADMIN MANAGEMENT
                </Typography>
                <Typography className={styles.textPath}>
                  {`${location.pathname}`
                    .toUpperCase()
                    .replace("/", "")
                    .replace("_", " ")}
                </Typography>
              </div>
            )}
            <div className={styles.container}>
              <MainApp />
            </div>
          </div>
        </div>
      }
    </div>
  );
}
