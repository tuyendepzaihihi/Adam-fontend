import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Logout from "@material-ui/icons/ExitToApp";
import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateSwitchRole } from "../admin/sliceSwitchRole/switchRoleSlice";
import { LIST_MENU_DRAWER, ROUTE } from "../contant/Contant";
import { useAppDispatch } from "../hooks";
import { colors } from "../utils/color";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {
  open: boolean;
  setOpen: any;
}
export default function MiniDrawer(props: Props) {
  const { open, setOpen } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const [selected, setSelected] = useState(0);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {LIST_MENU_DRAWER.map((val, index) => {
            const Icon = val.icon;
            return (
              <ListItem
                button
                key={index}
                onClick={() => {
                  navigate(val.route);
                  setSelected(index);
                }}
              >
                <ListItemIcon>
                  <Icon color={selected === index ? "primary" : "inherit"} />
                </ListItemIcon>
                <ListItemText
                  primary={val.name}
                  style={{
                    color: selected === index ? colors.black : colors.gray59,
                  }}
                />
              </ListItem>
            );
          })}
          <button
            onClick={() => {
              localStorage.clear();
              dispatch(updateSwitchRole(false));
              navigate(ROUTE.LOGIN);
              setSelected(LIST_MENU_DRAWER.length + 1);
            }}
          >
            <ListItem button>
              <ListItemIcon>
                <Logout
                  color={
                    selected === LIST_MENU_DRAWER.length + 1
                      ? "primary"
                      : "inherit"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={"Đăng xuất"}
                style={{
                  color:
                    selected === LIST_MENU_DRAWER.length + 1
                      ? colors.black
                      : colors.gray59,
                }}
              />
            </ListItem>
          </button>
        </List>
      </Drawer>
    </div>
  );
}
