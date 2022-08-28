import React, { useEffect, useState } from "react";
import { Table, Typography, Row, Col } from "antd";
import logo from "../../assets/images/logo.png";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";

import "./report.css";

const { Title } = Typography;

const Report = (props) => {
  const [data, setData] = useState([]);
  const date = format(new Date(), "d/M/yyyy");
  const columns = [
    {
      title: "الرقم الثلاثي",
      dataIndex: "tripleNumber",
      key: "tripleNumber",
    },
    {
      title: "الإسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "قرار المنطقة",
      dataIndex: "tagnidMedical",
      key: "tagnidMedical",
    },
    {
      title: "قرار المجلس الطبي",
      dataIndex: "commissionMedical",
      key: "commissionMedical",
    },
    {
      title: "أشعة/أبحاث",
      dataIndex: "procedures",
      key: "procedures",
    },
  ];

  useEffect(() => {
    props.PrintPdf.current = print;
  }, []);

  const print = (data) => {
    setData(data);
    const input = document.getElementById("report-wrapper");
    htmlToImage.toPng(input, { cacheBust: true }).then((image) => {
      const pdf = new jsPDF();
      pdf.addImage(image, "PNG", 0, 0, -120, -120);
      pdf.save("report.pdf");
    });
  };

  return (
    <div
      id="report-wrapper"
      style={{
        position: "absolute",
        width: "330mm",
        minHeight: "150mm",
        marginLeft: "auto",
        marginRight: "auto",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
      className="report-wrapper"
      direction="vertical"
    >
      <Row justify="space-between" align="middle">
        <Col span={8}>
          <img height="150px" src={logo} alt="منطقة تجنيد وتعبئة القاهرة" />
        </Col>
        <Col span={14} style={{ textAlign: "center" }}>
          <h2>
            إدارة التجنيد والتعبئة <br /> منطقة تجنيد وتعبئة القاهرة
          </h2>
          <h2>التاريخ : {date}</h2>
        </Col>
      </Row>
      <Row justify="center">
        <Title style={{ padding: "40px" }}>
          كشف تسليم اللجان العليا / الشكاوي الطبية
        </Title>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <div className="ctable">
            <Table
              pagination={false}
              style={{ direction: "rtl" }}
              dataSource={[data]}
              columns={columns}
            ></Table>
          </div>
        </Col>
      </Row>
      <Row
        gutter={[200]}
        style={{ marginTop: "40px" }}
        justify="space-around"
        align="middle"
      >
        <Col span={11} style={{ textAlign: "right" }}>
          <h3>المستلم</h3>
          <h3>
            /الإسم <br /> /الدرجة <br /> /التوقيع{" "}
          </h3>
        </Col>
        <Col span={11} style={{ textAlign: "right" }}>
          <h3>المسلم</h3>
          <h3>
            الإسم / محمد مجدي <br /> الدرجة/ رقيب أ <br /> /التوقيع{" "}
          </h3>
        </Col>
      </Row>
    </div>
  );
};

export default Report;
