import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
import { Fetch } from "../../common/actions";
import { useEffect, useState } from "react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const PieCharts2 = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    Fetch(`/persons/peopleFilteration?persontype&indexOfDose=2`).then((res) =>
      setData(res.data)
    );
  }, []);

  const filters = data.map((item) => item.type);

  const filter1 = filters.filter((item) => item === "مجند").length;

  const filter2 = filters.filter((item) => item === "مدني").length;

  const filter3 = filters.filter((item) => item === "راتب عالي").length;

  const filter4 = filters.filter((item) => item === "ضابط").length;
  const options = {
    //   exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "الجرعة الثانية",
      fontFamily: "Arial",
      padding: 10,
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 18,
        indexLabel: "{label} - {y}",
        dataPoints: [
          { y: filter1, label: "مجند" },
          { y: filter3, label: "راتب عالي" },
          { y: filter4, label: "ظابط" },
          { y: filter2, label: "مدنى" },
        ],
      },
    ],
  };
  return (
    <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default PieCharts2;
