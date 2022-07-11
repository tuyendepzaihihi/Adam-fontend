import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getFavoritesInfo } from "./slice/FavoritesSlice";

const FavoriteScreen = () => {
  const classname = useStyles();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    try {
      await dispatch(getFavoritesInfo());
    } catch (e) {}
  };
  return <div className={classname.container}>khanh</div>;
};
export default FavoriteScreen;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
      display: "flex",
      justifyContent: "space-between",
    },
  })
);
