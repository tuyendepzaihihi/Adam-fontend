import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { incrementAsyncHome } from "./slice/HomeSlice";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: 1,
      width: "100%",
      scrollBehavior: "auto",
    },
    image_banner: {
      width: "100%",
    },
  })
);
const HomeScreen = () => {
  const className = useStyles();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.home);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      await dispatch(incrementAsyncHome());
    } catch (e) {}
  };
  return <div className={className.container}>Đây là màn home</div>;
};
export default HomeScreen;
