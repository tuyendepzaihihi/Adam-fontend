import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Collapse,
  createStyles,
  FormControlLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Slider,
  TablePagination,
  Theme,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useEffect, useState } from "react";
import ProductItemComponent from "../../component/product_item/ProductItemComponent";
import {
  LIST_MATERIAL,
  LIST_TAG,
  OPTIONS_DATA,
} from "../../contant/ContaintDataAdmin";
import {
  CategoryAdmin,
  ProductAdmin,
  ResultApi,
} from "../../contant/IntefaceContaint";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";
import {
  GetProductDto,
  requestGetCategorylAll,
  requestGetProductCustomer,
} from "./ProductCustomerApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
      display: "flex",
      justifyContent: "space-between",
    },
    image_banner: {
      width: "75%",
      position: "relative",
    },
    listImage: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
    },
    textTitle: {
      paddingTop: 15,
      paddingBottom: 15,
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "left",
    },
    categoryContainer: {
      width: "20%",
      paddingTop: 30,
    },
    buttonCategory: {
      paddingTop: 5,
      paddingBottom: 5,
      borderColor: colors.white,
      borderWidth: 1,
      borderRadius: 5,
      color: colors.gray59,
      "&:hover": {
        color: colors.black,
        borderColor: colors.grayC4,
      },
      paddingLeft: 10,
      paddingRight: 10,
      width: "100%",
      alignItems: "flex-start",
      display: "flex",
    },
    textLabelValueFilter: {
      color: colors.black,
      fontWeight: "bold",
    },
    textValueFilter: {
      color: colors.gray59,
      fontStyle: "italic",
      fontSize: 14,
    },
    containerFilterValue: {
      paddingLeft: 10,
      paddingTop: 8,
      paddingBottom: 8,
    },
    buttonFilter: {
      padding: 10,
      borderRadius: 5,
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      marginRight: "5%",
      marginBottom: 10,
    },
    root: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.3)",
      width: "100%",
      top: 0,
      height: "100%",
    },
    rootAccordion: {},
    rootAccordionSummary: {
      height: 20,
      marginTop: 5,
      paddingTop: 5,
    },
    rootAccordionDetails: { display: "flex", flexDirection: "column" },
  })
);

const ProductScreen = () => {
  const className = useStyles();
  const [value, setValue] = useState([0, 1500]);
  const [listProduct, setListProduct] = useState<ProductAdmin[]>([]);
  const [listCategory, setListCategory] = useState<CategoryAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedParent, setSeletedParent] = useState<Number[]>([]);
  const [payload, setPayLoad] = useState<GetProductDto>({
    page: 0,
    size: 10,
  });
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  const getData = async () => {
    try {
      setLoading(true);
      const res: ResultApi<{ content: ProductAdmin[] }> =
        await requestGetProductCustomer(payload);
      const resCate: ResultApi<CategoryAdmin[]> =
        await requestGetCategorylAll();
      setListProduct(res.data.content);
      setListCategory(resCate.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const rangeSelector = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPayLoad({ ...payload, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayLoad({
      page: 0,
      size: parseInt(event.target.value, 10),
    });
  };

  const onSeledtedCategoryParent = (id: number) => {
    const res = selectedParent.find((e) => e === id);
    if (res) setSeletedParent(selectedParent.filter((e) => e !== id));
    else setSeletedParent(selectedParent.concat([id]));
  };

  return (
    <div className={className.container}>
      <div className={className.categoryContainer}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p className={className.textLabelValueFilter}> Danh mục</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {listCategory.map((value, idx) => {
              const isSelectParent =
                selectedParent.find((e) => e === value.id) !== undefined;
              return (
                <p key={idx}>
                  <ListItem
                    button
                    onClick={() => onSeledtedCategoryParent(value.id)}
                    className={className.buttonCategory}
                    style={{
                      color: isSelectParent ? colors.black : colors.gray59,
                      fontWeight: isSelectParent ? "bold" : "normal",
                    }}
                  >
                    <ListItemText primary={`${value.categoryName}`} />
                    {isSelectParent ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={isSelectParent} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {listCategory.map((val, index) => {
                        return (
                          <ListItem
                            button
                            className={className.buttonCategory}
                            style={{ marginLeft: 10 }}
                            key={index}
                          >
                            <ListItemText primary={`${val.categoryName}`} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </p>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          style={{
            display: "block",
          }}
          className={className.containerFilterValue}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Price range:</p>
          </AccordionSummary>
          <AccordionDetails className={className.rootAccordionDetails}>
            <Slider
              value={value}
              onChange={rangeSelector}
              min={0}
              max={1500}
              style={{ marginLeft: 5 }}
            />
            <p className={className.textValueFilter}>
              {value[0] !== value[1]
                ? `${formatPrice(value[0] * 1000)}đ - ${formatPrice(
                    value[1] * 1000
                  )}đ`
                : `${formatPrice(value[0] * 1000)}đ`}
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={className.containerFilterValue}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Color</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {OPTIONS_DATA.colors.map((e, index) => {
              return (
                <FormControlLabel
                  aria-label="Acknowledge"
                  control={<Checkbox />}
                  label={`${e.colorName}`}
                  key={index}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion
          className={className.containerFilterValue}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Size</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {OPTIONS_DATA.sizes.map((e, index) => {
              return (
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label={`${e.sizeName}`}
                  key={index}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion
          className={className.containerFilterValue}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Material</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {LIST_MATERIAL.map((e, index) => {
              return (
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label={`${e.materialName}`}
                  key={index}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion
          className={className.containerFilterValue}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Tag</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {LIST_TAG.map((e, index) => {
              return (
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label={`${e.tagName}`}
                  key={index}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>

      <div className={className.image_banner}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className={className.textTitle}>Sản phẩm mới</p>
        </div>
        <div className={className.listImage}>
          {listProduct.map((value, idx) => {
            return (
              <ProductItemComponent item={value} key={idx} width={"22%"} />
            );
          })}
        </div>
        <div>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={100}
            rowsPerPage={payload.size}
            page={payload.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        {loading && (
          <div className={className.root}>
            <LinearProgress
              classes={{
                colorPrimary: "#e8eaf6",
                barColorPrimary: "#03a9f4",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductScreen;
