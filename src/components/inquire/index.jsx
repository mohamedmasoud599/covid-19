import React, { useState, useRef } from "react";
import { Layout, Typography, Row, Col, Input, Card, Button, Empty } from "antd";
import { Fetch } from "../common/actions";
import ToastHandling from "../common/toastify";
import SimpleImageSlider from "react-simple-image-slider";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Index = () => {
  const [nationalId, setNationalId] = useState(0);
  const [images, setImages] = useState([]);
  const [data, setData] = useState();

  const handleChange = (event) => {
    console.log(event.target.value);
    setNationalId(event.target.value);
  };

  const getNextVaccineDate = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toLocaleDateString("ar");
  };

  const handleClick = (event) => {
    if (nationalId.length === 14) {
      Fetch(`persons/${nationalId}`).then((res) => {
        if (res?.data) {
          let data = res.data;
          let newImages = [];
          if (data.covidVaccine?.doses.length > 0) {
            data.covidVaccine?.doses.map((item) =>
              newImages.push({ url: item.certificate })
            );
            if (data.covidVaccine.doses.length === 1) {
              let matchDate = getNextVaccineDate(
                data.covidVaccine.doses[0].vaccineDate,
                21
              );
              data.vaccineType = {
                currentVaccine: "الجرعة الثانية",
                currentDateVaccine: matchDate,
              };
            }
            if (data.covidVaccine.doses.length === 2) {
              let matchDate = getNextVaccineDate(
                data.covidVaccine.doses[0].vaccineDate,
                180
              );
              data.vaccineType = {
                currentVaccine: "الجرعة الثالثة",
                currentDateVaccine: matchDate,
              };
            }
            setImages(newImages);
            setData(data);
          } else {
            ToastHandling("error", "لم يتم التطعيم لهذا الشخص");
          }
        } else {
          ToastHandling("error", res.data.message);
        }
      });
    } else {
      ToastHandling("error", "ادخل الرقم القومي");
    }
  };

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", margin: "64px 0" }}
      >
        <Title
          level={1}
          style={{
            textAlign: "center",
            padding: "40px 0 40px",
            fontSize: "50px",
          }}
        >
          الاستعلام
        </Title>

        <Row gutter={24}>
          <Col className="gutter-row" span={21}>
            <Input
              style={{
                padding: "14px 30px",
                fontSize: "20px",
                fontWeight: 600,
                border: "1px solid #3a6351",
              }}
              type="text"
              onChange={handleChange}
              name="nationalId"
              className="form-control"
              id="nationalId"
              placeholder="الرقم القومي"
            />
          </Col>

          <Col className="gutter-row" span={3}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleClick}
              style={{
                width: "100%",
                height: "100%",
                fontSize: "25px",
                fontWeight: 600,
                background: "#3a6351",
                color: "#fff",
              }}
            >
              بحث
            </Button>
          </Col>
          {/* <Col className="gutter-row" span={6}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handlePrint}
              style={{
                // padding: "14px 30px",
                width: "100%",
                height: "100%",
                fontSize: "25px",
                fontWeight: 600,
                background: "#3a6351",
                color: "#fff",
              }}
            >
              طباعة تقرير
            </Button>
          </Col> */}
        </Row>

        {data ? (
          <Row gutter={24} className="inquire-container">
            <Col className="gutter-row" span={12}>
              <Card bordered={false}>
                <Title level={2}>الاسم :</Title>
                <Paragraph>{data.name}</Paragraph>
              </Card>

              <Card bordered={false}>
                <Title level={2}> الفئة :</Title>
                <Paragraph>{data.type}</Paragraph>
              </Card>

              <Card bordered={false}>
                <Title level={2}> نوع المصل :</Title>
                <Paragraph>
                  {data?.covidVaccine?.doses.map((item) => item.type + " - ")}
                </Paragraph>
              </Card>
              <Card bordered={false}>
                <Title level={2}> الجرعه المستحقه :</Title>
                <Paragraph>{data?.vaccineType?.currentVaccine}</Paragraph>
              </Card>
              <Card bordered={false}>
                <Title level={2}> تاريخ الجرعه المستحقة :</Title>
                <Paragraph>{data?.vaccineType?.currentDateVaccine}</Paragraph>
              </Card>
            </Col>
            <Col className="gutter-row" span={12}>
              <SimpleImageSlider
                width={750}
                height={800}
                images={images}
                showBullets={false}
                showNavs={true}
              />
            </Col>
          </Row>
        ) : (
          <Empty
            description="لا يوجد بيانات"
            style={{ width: "100%", padding: "100px", fontSize: "30px" }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Index;
