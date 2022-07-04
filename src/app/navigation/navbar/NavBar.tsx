import { Button, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import { NotInterested } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Delete from "@material-ui/icons/Delete";
import Favorite from "@material-ui/icons/FavoriteBorder";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Cart from "@material-ui/icons/ShoppingCart";
import clsx from "clsx";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateSwitchRole } from "../../admin/sliceSwitchRole/switchRoleSlice";
import R from "../../assets/R";
import FooterComponent from "../../component/footer/FooterComponent";
import LoadingProgress from "../../component/LoadingProccess";
import { ROUTE, TYPE_ACCOUNT } from "../../contant/Contant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  requestDeleteCart,
  requestPutUpdateCart,
  UpdateCartDto,
} from "../../screen/cart/CartApi";
import {
  changeLoading,
  deleteItemCart,
  updateQuantity,
} from "../../screen/cart/slice/CartSlice";
import { getAdmin } from "../../service/StorageService";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";
import { useWindowSize } from "../../utils/helper";
import { createNotification } from "../../utils/MessageUtil";
import MiniDrawer from "../Drawer";
import MainApp from "../MainApp";
import { useNavBarStyles } from "./styles";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const size = useWindowSize();
  const classes = useNavBarStyles();
  const navigate = useNavigate();
  const { data, isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [cartMoreAnchorEl, setCartMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isCartOpen = Boolean(cartMoreAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCartOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (token) {
      setCartMoreAnchorEl(event.currentTarget);
    } else {
      navigate(ROUTE.LOGIN);
      createNotification({
        type: "warning",
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
      });
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleCartClose = () => {
    setCartMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

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
      {token && (
        <>
          <MenuItem
            onClick={() => {
              navigate(ROUTE.ACCOUNT, {
                state: { type: TYPE_ACCOUNT.PROFILE },
              });
            }}
          >
            My account
          </MenuItem>
        </>
      )}

      <MenuItem
        onClick={() => {
          if (token) {
            localStorage.clear();
            dispatch(updateSwitchRole(false));

            createNotification({
              type: "success",
              message: "Đăng xuất thành công",
            });
            handleMenuClose();
          }
          navigate(ROUTE.LOGIN, { replace: true });
        }}
      >
        {token ? "Log out" : "Login app"}
      </MenuItem>
    </Menu>
  );

  const renderCart = (
    <Menu
      anchorEl={cartMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isCartOpen}
      onClose={handleCartClose}
    >
      {
        <MenuItem>
          <p style={{ color: colors.gray59, fontWeight: "bold" }}>
            Giỏ hàng của bạn
          </p>
        </MenuItem>
      }
      {data && data?.length > 0 ? (
        data?.map((e, index) => {
          return (
            <div className={classes.containerItemCart} key={index}>
              <div className={classes.containerInfoCart}>
                <img src={R.images.img_product} style={{ width: 25 }} alt="" />
              </div>
              <div className={classes.containerInfoCart}>
                <p className={classes.textNameProductCart}>
                  {e.detailProduct.product.productName}
                </p>
                <p style={{ marginLeft: 5 }}>
                  {e.detailProduct.color.colorName +
                    "/" +
                    e.detailProduct.size.sizeName}
                </p>
                <p className={classes.textPriceCart}>
                  {" "}
                  {formatPrice(e.detailProduct.priceExport)}đ
                </p>
              </div>
              <div className={classes.containerQuantity}>
                <button
                  className={classes.buttonChangeQuantityCart}
                  onClick={async () => {
                    if (e.quantity > 1) {
                      dispatch(changeLoading(true));
                      const payload: UpdateCartDto = {
                        id: e.id,
                        quantity: e.quantity - 1,
                        totalPrice:
                          e.quantity - 1 * e.detailProduct.priceExport,
                      };
                      await requestPutUpdateCart(payload);
                      dispatch(
                        updateQuantity({
                          id: e.id,
                          new_quantity: e.quantity - 1,
                        })
                      );
                      dispatch(changeLoading(false));
                    }
                  }}
                >
                  -
                </button>
                <Typography>{e.quantity}</Typography>
                <button
                  className={classes.buttonChangeQuantityCart}
                  onClick={async () => {
                    dispatch(changeLoading(true));
                    const payload: UpdateCartDto = {
                      id: e.id,
                      quantity: e.quantity + 1,
                      totalPrice: e.quantity + 1 * e.detailProduct.priceExport,
                    };
                    await requestPutUpdateCart(payload);
                    dispatch(
                      updateQuantity({
                        id: e.id,
                        new_quantity: e.quantity + 1,
                      })
                    );
                    dispatch(changeLoading(false));
                  }}
                >
                  +
                </button>
              </div>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                style={{ marginLeft: 5 }}
                onClick={async () => {
                  dispatch(changeLoading(true));
                  await requestDeleteCart({ id: e.id });
                  dispatch(deleteItemCart({ id: e.id }));
                  dispatch(changeLoading(false));
                }}
              >
                <Delete />
              </IconButton>
              {isLoading && <LoadingProgress />}
            </div>
          );
        })
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: 10,
            paddingTop: 50,
            paddingBottom: 50,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          Giỏ hàng của bạn không có sản phẩm nào
          <div>
            <NotInterested />
          </div>
        </div>
      )}

      {data && data.length > 0 && (
        <div style={{ padding: 5 }}>
          <Button
            variant="outlined"
            color="secondary"
            style={{
              width: "100%",
              display: "flex",
            }}
            onClick={() => {
              navigate(ROUTE.CART);
              handleCartClose();
            }}
          >
            Mua hàng
          </Button>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Cart />
        </IconButton>
        <p>Giỏ hàng</p>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Favorite />
        </IconButton>
        <p>Yêu thích</p>
      </MenuItem>
    </Menu>
  );
  const isAdmin = getAdmin();
  return (
    <div className={classes.grow}>
      {isAdmin ? (
        <div className={classes.containerAdmin}>
          <MiniDrawer open={open} setOpen={setOpen} />
          <div style={{ padding: 10, flex: 1 }}>
            <MainApp isAdmin={isAdmin ? true : false} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div className={classes.grow}>
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                // [classes.appBarShift]: open,
              })}
            >
              <Toolbar>
                <Button
                  className={classes.title}
                  onClick={() => navigate(ROUTE.HOME)}
                >
                  Adam store
                </Button>
                <div className={classes.margin} />
                <Button
                  className={classes.button}
                  onClick={() => navigate(ROUTE.PRODUCT)}
                >
                  Áo
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => navigate(ROUTE.PRODUCT)}
                >
                  <Link to={"/product"}>Quần</Link>
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => navigate(ROUTE.PRODUCT)}
                >
                  Phụ kiện
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => navigate(ROUTE.PRODUCT)}
                >
                  Ưu đãi
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => navigate(ROUTE.PRODUCT)}
                >
                  Liên hệ
                </Button>

                <div className={classes.grow} />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>

                <div className={classes.sectionDesktop}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => {}}
                    color="default"
                  >
                    <Favorite />
                  </IconButton>
                </div>
                <div
                  className={classes.sectionDesktop}
                  style={{ position: "relative" }}
                >
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleCartOpen}
                    color="default"
                  >
                    <Cart />
                  </IconButton>
                  {token && data && data?.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 1,
                        right: -5,
                        backgroundColor: colors.gray59,
                        borderRadius: 20,
                        paddingLeft: 5,
                        paddingRight: 5,
                        color: colors.white,
                        fontSize: 12,
                        alignSelf: "center",
                      }}
                    >
                      {data?.length}
                    </div>
                  )}
                </div>
                <div className={classes.sectionDesktop}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="default"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>

                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="default"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <div
              style={{
                flex: 1,
                marginTop: 70,
                paddingRight: "15%",
                paddingLeft: "15%",
                minHeight: size && size?.height ? size?.height - 370 : 0,
              }}
            >
              {/* <ActiveBreadcrumbs /> */}
              <MainApp isAdmin={isAdmin ? true : false} />
            </div>
            {renderMobileMenu}
            {renderMenu}
            {renderCart}
          </div>
          <FooterComponent />
        </div>
      )}
    </div>
  );
}
