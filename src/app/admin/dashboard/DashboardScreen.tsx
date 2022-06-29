import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOption = (title: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Doanh thu",
      data: [
        1000000, 200000000, 500000000, 600000000, 500000000, 200000000,
        150000000,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Doanh số",
      data: [
        2000000000, 500000000, 600000000, 800000000, 900000000, 600000000,
        200000000, 95000000,
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataBarChart = {
  labels,
  datasets: [
    {
      label: "Người dùng mua hàng",
      data: [100, 200, 500, 600, 500, 200, 500, 200],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Người dùng vào trang web",
      data: [2000, 500, 600, 800, 900, 600, 200, 400],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataBarChartOrder = {
  labels,
  datasets: [
    {
      label: "Tổng đơn hàng",
      data: [100, 200, 500, 600, 500, 200, 500, 200],
      backgroundColor: "rgba(125, 200, 125, 0.5)",
    },
    {
      label: "Đơn hàng thành công",
      data: [
        90,
        200 - 15,
        500 - 16,
        600 - 16,
        500,
        200 - 5,
        500 - 12,
        200 - 25,
      ],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Đơn hàng hoàn",
      data: [10, 15, 16, 16, 0, 5, 12, 25],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const DashboardScreen = () => {
  const className = useStyles();
  return (
    <div className={className.root}>
      <Line
        options={chartOption("Doanh số theo năm")}
        data={data}
        style={{ maxHeight: 400, width: "100%" }}
      />
      <Bar
        options={chartOption("Số người dùng truy cập hàng tháng")}
        data={dataBarChart}
        style={{ maxHeight: 400, width: "100%" }}
      />
      <Bar
        options={chartOption("Số đơn hàng")}
        data={dataBarChartOrder}
        style={{ maxHeight: 400, width: "100%" }}
      />
    </div>
  );
};
export default DashboardScreen;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      width: "90%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 5,
    },
  })
);
