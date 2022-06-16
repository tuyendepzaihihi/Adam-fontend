import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Delete from "@material-ui/icons/Delete";
import { useEffect, useState } from "react";
import TextInputComponent from "../../../../../component/TextInputComponent";
import {
  LIST_OPTION,
  OPTIONS_DATA,
} from "../../../../../contant/ContaintDataAdmin";
import { colors } from "../../../../../utils/color";

const ChildrenOption = (params: { list: any[]; isNoOption?: boolean }) => {
  const { list, isNoOption } = params;

  return (
    <>
      {!isNoOption && (
        <option key={0} value={0}>
          Chưa chọn
        </option>
      )}
      {list.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </>
  );
};

interface PropsRenderOption {
  handleDeleteOption: () => void;
  option: any;
  setOption: any;
  index: number;
  valueOption: any;
}

const RenderItemOption = (props: PropsRenderOption) => {
  const { handleDeleteOption, option, setOption, index, valueOption } = props;
  const classes = useStylesOption();
  const [optionValue, setOptionValue] = useState<any[]>([]);
  const [listOption, setListOption] = useState<{ id: any; name: string }[]>([]);

  useEffect(() => {
    if (Number(valueOption) === 1) {
      setListOption(
        OPTIONS_DATA.colors.map((e) => {
          return { id: e.id, name: e.color_name };
        })
      );
      setOptionValue([]);
    } else if (Number(valueOption) === 2) {
      setListOption(
        OPTIONS_DATA.sizes.map((e) => {
          return { id: e.id, name: e.size_name };
        })
      );
      setOptionValue([]);
    } else {
      setListOption([]);
      setOptionValue([]);
    }
  }, [valueOption]);

  const chaneOption = (event: { target: { value: any } }) => {
    const value = event.target.value;
    const res = option.map((val: any, ind: number) => {
      if (ind === index) {
        return value;
      } else return val;
    });
    setOption(res);
  };

  const changeOptionValue = (event: any) => {
    const value = event.target.value;
    const res = optionValue.map((val, ind) => {
      if (ind === index) {
        return value;
      } else return val;
    });
    setOptionValue(res);
  };

  const deleteOptionValue = (index: number) => {
    const newRes = optionValue.filter((e, idx) => idx !== index);
    setOptionValue(newRes);
  };

  const addOptionValue = () => {
    if (Number(valueOption) !== 0) {
      let newOptionValue = "0";
      setOptionValue(optionValue.concat(newOptionValue));
    }
  };

  return (
    <div className={classes.root}>
      <TextInputComponent
        label="Option"
        value={valueOption}
        onChange={(event: any) => chaneOption(event)}
        isSelected={true}
        childrentSeleted={<ChildrenOption list={LIST_OPTION} />}
      />
      <Typography style={{ fontSize: 15, color: colors.gray59, marginTop: 10 }}>
        Option value
      </Typography>
      <div style={{ paddingLeft: 15 }}>
        {optionValue.map((e: any, index: number) => {
          return (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <TextInputComponent
                label={""}
                value={optionValue[index]}
                onChange={(event: any) => changeOptionValue(event)}
                isSelected={true}
                childrentSeleted={
                  <ChildrenOption list={listOption} isNoOption={true} />
                }
              />
              <div style={{}}>
                <IconButton onClick={() => deleteOptionValue(index)}>
                  <Delete color="inherit" />
                </IconButton>
              </div>
            </div>
          );
        })}

        <Button
          style={{ width: "100%", marginTop: 10 }}
          variant="outlined"
          color="primary"
          onClick={addOptionValue}
        >
          +
        </Button>
      </div>
      <div style={{ position: "absolute", top: -10, right: -10 }}>
        <IconButton onClick={() => handleDeleteOption()}>
          <Close color="secondary" />
        </IconButton>
      </div>
    </div>
  );
};
export default RenderItemOption;
const useStylesOption = makeStyles(() =>
  createStyles({
    root: {
      width: "30%",
      padding: 10,
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      marginRight: 10,
      marginBottom: 10,
      borderRadius: 5,
      position: "relative",
    },
  })
);
