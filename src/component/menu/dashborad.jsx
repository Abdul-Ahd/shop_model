import Lottie from "lottie-react";
import React, { useEffect, useState, useRef } from "react";
import animationData from "../../assets/Animation - 1704799928475.json";
import { AgChartsReact } from "ag-charts-react";
// import "ag-charts-react/styles/ag-charts-react.css";
import "ag-grid-community/styles/ag-grid.css";
import { createRoot } from "react-dom/client";

const dashborad = () => {
  const [chartData, setChartData] = useState([]);
  var color = ["#49108B", "#FF004D", "#45FFCA", "#D67BFF", "#0079FF"];
  useEffect(() => {
    // Fetch data from your database
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/item");
        const data = await response.json();

        const formattedData = await data.map((item) => ({
          itemName: item.name,
          stock: item.stock,
          fill: color,
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData1 = [
    { stock: 10, itemName: "AAPL", fill: "green" },
    { stock: 20, itemName: "GOOGL" },
  ];
  const options = {
    title: {
      text: "My Stock Detail",
    },
    autoSize: true,
    data: chartData,
    itemName: {
      fill: "red",
      stroke: "maroon",
      strokeWidth: 4,
    },

    series: [
      {
        type: "bar",
        yKey: "stock",
        xKey: "itemName",
      },
    ],
  };

  return (
    <>
      <div id="dash1" style={{ height: "400px", width: "800" }}>
        <AgChartsReact options={options} />
      </div>
    </>
  );
};

export default dashborad;
