import React, { useEffect, useState } from "react";
import "./reports.scss";
import { Layout, Button, Row, Col, Typography } from "antd";
import { Fetch } from "../common/actions";

const { Content } = Layout;

const Table = () => {
  const [data, setData] = useState({
    counts: {
      mujanad: 0,
      officers: 0,
      citizan: 0,
      safzapt: 0,
    },
    countsVaccine: {
      mujanad: 0,
      officers: 0,
      citizan: 0,
      safzapt: 0,
    },
    countPer: {
      mujanad: 0,
      officers: 0,
      citizan: 0,
      safzapt: 0,
    },
    vaccineThree: {
      officers: 0,
      other: 0,
      citizan: 0,
    },
  });

  useEffect(() => {
    Fetch("/persons").then((res) => {
      if (res?.data) {
        const mujanad = res.data.filter(({ type }) => type === "مجند");
        const officers = res.data.filter(({ type }) => type === "ضابط");
        const citizan = res.data.filter(({ type }) => type === "شاب تجنيد");
        const safzapt = res.data.filter(({ type }) => type === "راتب عالي");

        /***** Covid Vaccine Count */

        const mujanadVaccine = mujanad.filter(
          ({ covidVaccine }) => covidVaccine.doses.length >= 2
        );
        const officersVaccine = officers.filter(
          ({ covidVaccine }) => covidVaccine.doses.length >= 2
        );
        const citizanVaccine = citizan.filter(
          ({ covidVaccine }) => covidVaccine.doses.length >= 2
        );
        const safzaptVaccine = safzapt.filter(
          ({ covidVaccine }) => covidVaccine.doses.length >= 2
        );

        let data = {
          counts: {
            mujanad: mujanad.length,
            officers: officers.length,
            citizan: citizan.length,
            safzapt: safzapt.length,
          },
          countsVaccine: {
            mujanad: mujanadVaccine.length,
            officers: officersVaccine.length,
            citizan: citizanVaccine.length,
            safzapt: safzaptVaccine.length,
          },
          countPer: {
            mujanad: Math.floor((mujanadVaccine.length * 100) / mujanad.length),
            officers: Math.floor(
              (officersVaccine.length * 100) / officers.length
            ),
            citizan: Math.floor((citizanVaccine.length * 100) / citizan.length),
            safzapt: Math.floor((safzaptVaccine.length * 100) / safzapt.length),
          },
          vaccineThree: {
            officers: Math.floor(officers.length / 6),
            other: Math.floor((mujanad.length + safzaptVaccine.length) / 6),
            citizan: Math.floor(citizan.length / 6),
          },
        };
        setData(data);
      }
    });
  }, []);

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div className="report-container">
          <div className="header">
            <p className="tit">
              إدارة التجنيد والتعبئة <br />
              منطقة تجنيد وتعبئة الزقازيق
            </p>
          </div>
          <div className="table">
            <h1 className="titl">
              تمام التطعيم باللقاح لفيروس كورونا (الجرعة الثانيه){" "}
              {new Date().toLocaleDateString("ar")}
            </h1>
            <table>
              <tr>
                <th colSpan={4}>الظباط</th>
                <th colSpan={4}>ضباط الصف</th>
                <th colSpan={4}>المجندين</th>
                <th colSpan={4}>المدنيين</th>
              </tr>
              <tr>
                <td>القوة</td>
                <td colSpan={2}>التطعيم</td>
                <td>النسبة</td>
                {/* <td>القوة</td> */}
                {/* <td>خارج</td> */}
                <td>القوة</td>
                <td colSpan={2}>التطعيم</td>
                <td>النسبة</td>
                {/* <td>القوة</td> */}
                {/* <td>خارج</td> */}
                <td>القوة</td>
                <td colSpan={2}>التطعيم</td>
                <td>النسبة</td>
                <td>القوة</td>
                <td colSpan={2}>التطعيم</td>
                <td>النسبة</td>
              </tr>
              <tr>
                <td>{data.counts.officers}</td>
                <td>{data.countsVaccine.officers}</td>
                <td>{data.counts.officers - data.countsVaccine.officers}</td>
                <td>{data.countPer.officers} %</td>

                <td>{data.counts.safzapt}</td>
                {/* <td>1 سجن</td>
                <td>1</td> */}
                <td>{data.countsVaccine.safzapt}</td>
                <td>{data.counts.safzapt - data.countsVaccine.safzapt}</td>
                <td>{data.countPer.safzapt} %</td>

                <td>{data.counts.mujanad}</td>
                {/* <td>1 سجن</td>
                <td>1</td> */}
                <td>{data.countsVaccine.mujanad}</td>
                <td>{data.counts.mujanad - data.countsVaccine.mujanad}</td>
                <td>{data.countPer.mujanad} %</td>

                <td>{data.counts.citizan}</td>
                <td>{data.countsVaccine.citizan}</td>
                <td>{data.counts.citizan - data.countsVaccine.citizan}</td>
                <td>{data.countPer.citizan} %</td>
              </tr>
            </table>
          </div>

          <div className="table2">
            <h1 className="titl">
              المخطط الزمنى لمستحقى الجرعة الثالثة التنشيطية الذين أمضوا (٦)
              اشهر من تاريخ الجرعة الثانيه
            </h1>

            <table>
              <tr>
                <th rowSpan={2}>م</th>
                <th rowSpan={2}>البيان</th>
                <th colSpan={6}>تاريخ الجرعة الثالثة</th>
              </tr>
              <tr>
                <td>شهر يناير</td>
                <td>شهر فبراير</td>
                <td>شهر مارس</td>
                <td>شهر ابريل</td>
                <td>شهر مايو</td>
                <td>شهر يونيه</td>
              </tr>
              <tr>
                <td>1</td>

                <td>ضباط</td>

                <td>{data.vaccineThree.officers}</td>
                <td>{data.vaccineThree.officers}</td>
                <td>{data.vaccineThree.officers}</td>
                <td>{data.vaccineThree.officers}</td>
                <td>{data.vaccineThree.officers}</td>
                <td>{data.vaccineThree.officers}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>درجات اخرى</td>

                <td>{data.vaccineThree.other}</td>
                <td>{data.vaccineThree.other}</td>
                <td>{data.vaccineThree.other}</td>
                <td>{data.vaccineThree.other}</td>
                <td>{data.vaccineThree.other}</td>
                <td>{data.vaccineThree.other}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>عاملين مدنيين</td>
                <td>{data.vaccineThree.citizan}</td>
                <td>{data.vaccineThree.citizan}</td>
                <td>{data.vaccineThree.citizan}</td>
                <td>{data.vaccineThree.citizan}</td>
                <td>{data.vaccineThree.citizan}</td>
                <td>{data.vaccineThree.citizan}</td>
              </tr>
              <tr>
                <td colSpan={2}>الاجمالى</td>
                <td>
                  {data.vaccineThree.citizan +
                    data.vaccineThree.other +
                    data.vaccineThree.officers}
                </td>
                <td>
                  {data.vaccineThree.citizan +
                    data.vaccineThree.other +
                    data.vaccineThree.officers}
                </td>
                <td>
                  {data.vaccineThree.citizan +
                    data.vaccineThree.other +
                    data.vaccineThree.officers}
                </td>
                <td>
                  {data.vaccineThree.citizan +
                    data.vaccineThree.other +
                    data.vaccineThree.officers}
                </td>
                <td>
                  {data.vaccineThree.citizan +
                    data.vaccineThree.other +
                    data.vaccineThree.officers}
                </td>
                <td>
                  {data.vaccineThree.citizan +
                    data.vaccineThree.other +
                    data.vaccineThree.officers}
                </td>
              </tr>
            </table>
          </div>
          <Row gutter={24}>
            <Col span={8} pull={16}>
              <Typography
                style={{
                  fontFamily: "arial",
                  fontSize: "28px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                التوقيع (----------------)
              </Typography>
              <Typography
                style={{
                  fontFamily: "arial",
                  fontSize: "37px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                عميد / حاتم عبده السيد
              </Typography>
              <Typography
                style={{
                  fontFamily: "arial",
                  fontSize: "37px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                مدير منطقة تجنيد وتعبئة الزقازيق
              </Typography>
            </Col>
          </Row>
          <Button className="no-print btn" onClick={() => window.print()}>
            طباعة تقرير
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Table;
