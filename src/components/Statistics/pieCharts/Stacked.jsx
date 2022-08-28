import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
import { Fetch } from "../../common/actions";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Stacked extends Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    Fetch(`/persons/peopleFilteration?indexOfDose=1`).then((res) => {
      this.setState({
        items: res,
        DataisLoaded: true,
      });
    });
    console.log("items", this.state.items);
  }

  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "مخطط بيانى للجرعات",
      },
      legend: {
        verticalAlign: "center",
        horizontalAlign: "right",
        reversed: true,
        cursor: "pointer",
        fontSize: 16,
        itemclick: this.toggleDataSeries,
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "stackedColumn100",
          name: "الجرعة الاولى",
          showInLegend: true,
          color: "#D4AF37",
          dataPoints: [
            { label: "مجند", y: 0 },
            { label: "شاب تجنيد", y: 1 },
            { label: "ظابط", y: 0 },
            { label: "مدنى", y: 0 },
          ],
        },
        {
          type: "stackedColumn100",
          name: "الجرعة الثانيه",
          showInLegend: true,
          color: "#C0C0C0",
          dataPoints: [
            { label: "مجند", y: 0 },
            { label: "شاب تجنيد", y: 1 },
            { label: "ظابط", y: 1 },
            { label: "مدنى", y: 0 },
          ],
        },
        {
          type: "stackedColumn100",
          name: "الجرعة الثالثه",
          showInLegend: true,
          color: "#CD7F32",
          dataPoints: [
            { label: "مجند", y: 0 },
            { label: "شاب تجنيد", y: 1 },
            { label: "ظابط", y: 1 },
            { label: "مدنى", y: 1 },
          ],
        },
      ],
    };
    return (
      <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}
export default Stacked;
