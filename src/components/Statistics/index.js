import React from "react";
import { Typography, Row, Col, Card } from "antd";
import PieCharts1 from "./pieCharts/PieCharts.jsx";
import PieCharts2 from "./pieCharts/PieCharts2.jsx";

import PieCharts3 from "./pieCharts/PieCharts3";

import Stacked from "./pieCharts/Stacked.jsx";
import "./style.css";

import { Fetch } from "../common/actions";
import { useEffect, useState } from "react";
import PieCharts4 from "./pieCharts/PieCharts4";
import PieCharts5 from "./pieCharts/PieCharts5";
import PieCharts6 from "./pieCharts/PieCharts6";
const { Title, Paragraph } = Typography;

const Chart = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [count1, setCount1] = useState([]);
  const [count2, setCount2] = useState([]);

  useEffect(() => {
    Fetch("/persons/peopleFilteration?indexOfDose=1").then((res) =>
      setData(res.data)
    );
  }, []);

  useEffect(() => {
    Fetch("/persons/peopleFilteration?indexOfDose=2").then((res) =>
      setCount(res.data)
    );
  }, []);

  useEffect(() => {
    Fetch("/persons/peopleFilteration?indexOfDose=3").then((res) =>
      setCount1(res.data)
    );
  }, []);

  useEffect(() => {
    Fetch("/persons/peopleFilteration?indexOfDose=0").then((res) =>
      setCount2(res.data)
    );
  }, []);

  const filter = data.filter((item) => item).length;
  const filter1 = count.filter((item) => item).length;
  const filter2 = count1.filter((item) => item).length;
  const filter3 = count2.filter((item) => item).length;

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>النسب المئوية متكاملة</h1>
      <div className="chart" style={{ margin: "20px auto" }}>
        <Row gutter={32}>
          <Col className="gutter-row" span={24}>
            <Row gutter={16} justify="space-around">
              <Col className="gutter-row" span={6}>
                <Card bordered={false}>
                  <Title className="title" style={{ color: "#FFFff" }}>
                    الجرعة الاولي
                  </Title>
                  <Paragraph>{filter}</Paragraph>
                </Card>
              </Col>
              <Col className="gutter-row" span={6}>
                <Card bordered={false}>
                  <Title>الجرعة الثانية</Title>
                  <Paragraph>{filter1}</Paragraph>
                </Card>
              </Col>
              <Col className="gutter-row" span={6}>
                <Card bordered={false}>
                  <Title>الجرعة الثالثة</Title>
                  <Paragraph>{filter2}</Paragraph>
                </Card>
              </Col>
              <Col className="gutter-row" span={6}>
                <Card bordered={false}>
                  <Title>لم يتلقى </Title>
                  <Paragraph>{filter3}</Paragraph>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="piechart" style={{ margin: "20px auto" }}>
        <h1 style={{ textAlign: "center" }}>الجرعات تفصيلية</h1>
        <Row gutter={32}>
          <Col className="gutter-row" span={24}>
            <Row gutter={16} justify="space-around">
              <Col className="gutter-row" span={8}>
                <PieCharts1 />
              </Col>
              <Col className="gutter-row" span={8}>
                <PieCharts2 />
              </Col>
              <Col className="gutter-row" span={8}>
                <PieCharts3 />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="piechart" style={{ margin: "20px auto" }}>
        <h1 style={{ textAlign: "center" }}>الفئات التى لم تتلقي اللقاح</h1>
        <Row gutter={32}>
          <Col className="gutter-row" span={24}>
            <Row gutter={16} justify="space-around">
              <Col className="gutter-row" span={8}>
                <PieCharts4 />
              </Col>
              <Col className="gutter-row" span={8}>
                <PieCharts5 />
              </Col>
              <Col className="gutter-row" span={8}>
                <PieCharts6 />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* <div className='stacked' style={{ margin: "20px auto" }}>
        <h1 style={{ textAlign: "center" }}>الفئات التى لم تتلقي اللقاح</h1>
        <Stacked />
      </div> */}
    </div>
  );
};

export default Chart;
