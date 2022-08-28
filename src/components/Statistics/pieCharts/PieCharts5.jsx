import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
import { Fetch } from "../../common/actions";
import { useEffect, useState } from "react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const PieCharts5 = () => {
  const [data, setData] = useState({
    counts: {
      mujanad: 0,
      officers: 0,
      citizan: 0,
      madny: 0,
    },
    countsVaccine: {
      mujanad: 0,
      officers: 0,
      citizan: 0,
      madny: 0,
    },
  });

  useEffect(() => {
    Fetch("/persons").then((res) => {
      if (res?.data) {
        const mujanad = res.data.filter(({ type }) => type === "مجند");
        const officers = res.data.filter(({ type }) => type === "ضابط");
        const citizan = res.data.filter(({ type }) => type === "راتب عالي");
        const madny = res.data.filter(({ type }) => type === "مدني");

        const mujanadVaccine = mujanad.filter(
          ({ covidVaccine }) => covidVaccine.doses.length <= 1
        );
        const officersVaccine = officers.filter(
          ({ covidVaccine }) => covidVaccine.doses.length <= 1
        );
        const citizanVaccine = citizan.filter(
          ({ covidVaccine }) => covidVaccine.doses.length <= 1
        );
        const madnyVaccine = madny.filter(
          ({ covidVaccine }) => covidVaccine.doses.length <= 1
        );

        let data = {
          counts: {
            mujanad: mujanad.length,
            officers: officers.length,
            citizan: citizan.length,
            madny: madny.length,
          },
          countsVaccine: {
            mujanad: mujanadVaccine.length,
            officers: officersVaccine.length,
            citizan: citizanVaccine.length,
            madny: madnyVaccine.length,
          },
        };
        setData(data);
      }
    });
  }, []);
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
          {
            y: data.counts.mujanad - data.countsVaccine.mujanad,
            label: "مجند",
          },
          {
            y: data.counts.citizan - data.countsVaccine.citizan,
            label: "راتب عالي",
          },
          {
            y: data.counts.officers - data.countsVaccine.officers,
            label: "ظابط",
          },
          {
            y: data.counts.citizan - data.countsVaccine.citizan,
            label: "مدنى",
          },
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

export default PieCharts5;
