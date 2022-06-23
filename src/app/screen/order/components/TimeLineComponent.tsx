import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { History } from "../slice/OrderSlice";
import { DEFINE_ORDER } from "./ItemOrderComponent";
import { colors } from "../../../utils/color";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
interface Props {
  list?: History[];
}
export default function TimeLineComponent(props: Props) {
  const { list } = props;
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      {list?.map((e, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {e.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={2} className={classes.paper}>
                <p style={{ fontSize: 15 }}>{DEFINE_ORDER[e.status].title}</p>
                <p style={{ color: colors.gray59, fontSize: 13 }}>
                  {DEFINE_ORDER[e.status].description}
                </p>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
