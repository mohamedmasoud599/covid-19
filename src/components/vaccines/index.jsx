import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Calendar, Col } from "antd";
import Table from "../common/table";
import Columns from "../common/columnTable";
import { Fetch } from "../common/actions";
import ToastHandling from "../common/toastify";
import locale from "antd/lib/date-picker/locale/ar_EG";

const { Content } = Layout;
const { Title } = Typography;

const Index = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const selectDate = (date) => {
    let selectedDate = new Date(date._d);
    Fetch(`/persons`).then((res) => {
      let vaccineTwo = [];
      let vaccineThree = [];
      res.data.map((item) => {
        if (item.covidVaccine.doses.length === 1) {
          let matchDay = parseInt(
            (selectedDate - new Date(item.covidVaccine.doses[0].vaccineDate)) /
              (1000 * 60 * 60 * 24),
            10
          );
          if (matchDay === 21) {
            vaccineTwo.push({
              ...item,
              currentVaccine: "الجرعة الثانية",
              currentDateVaccine: selectedDate.toLocaleDateString("ar"),
            });
          }
        }
        if (item.covidVaccine.doses.length === 2) {
          let matchDay = parseInt(
            (selectedDate - new Date(item.covidVaccine.doses[0].vaccineDate)) /
              (1000 * 60 * 60 * 24),
            10
          );
          if (matchDay === 180) {
            vaccineThree.push({
              ...item,
              currentVaccine: "الجرعة الثالثة",
              currentDateVaccine: selectedDate.toLocaleDateString("ar"),
            });
          }
        }
        return 0;
      });
      setData(vaccineTwo.concat(vaccineThree));
      // console.log(res.data)
    });
  };

  useEffect(() => {
    let selectedDate = new Date();
    Fetch(`/persons`).then((res) => {
      let vaccineTwo = [];
      let vaccineThree = [];
      res.data.map((item) => {
        if (item.covidVaccine.doses.length === 1) {
          let matchDay = parseInt(
            (selectedDate - new Date(item.covidVaccine.doses[0].vaccineDate)) /
              (1000 * 60 * 60 * 24),
            10
          );
          if (matchDay === 21) {
            vaccineTwo.push({
              ...item,
              currentVaccine: "الجرعة الثانية",
              currentDateVaccine: selectedDate.toLocaleDateString("ar"),
            });
          }
        }
        if (item.covidVaccine.doses.length === 2) {
          let matchDay = parseInt(
            (selectedDate - new Date(item.covidVaccine.doses[0].vaccineDate)) /
              (1000 * 60 * 60 * 24),
            10
          );
          if (matchDay === 180) {
            vaccineThree.push({
              ...item,
              currentVaccine: "الجرعة الثالثة",
              currentDateVaccine: selectedDate.toLocaleDateString("ar"),
            });
          }
        }
        return 0;
      });
      setData(vaccineTwo.concat(vaccineThree));
      // console.log(res.data)
    });
  }, [page]);

  const Options = {
    page: page,
    rowsPerPage: 10,
    filter: true,
    filterType: "dropdown",
    setRowProps: row => { 
        if (row[3] === "الجرعة الثانية") {
          return {
            style: { background: "#476fff" }
          };
        }
        if (row[3] === "الجرعة الثالثة") {
            return {
              style: { background: "#848484" }
            };
          }
      },
    responsive: "sample",
    serverSide: true,
    onChangePage: (page) => {
      setPage(page);
    },
  };
  const columns = [
    {
      label: "فئة المسجل",
      name: "type",
    },
    {
      label: "الرقم القومي",
      name: "nationalId",
    },
    {
      label: "الاسم",
      name: "name",
    },
    {
      label: "الجرعة المستحقة",
      name: "currentVaccine",
    },
    {
      label: "تاريخ الجرعة المستحقة",
      name: "currentDateVaccine",
    },
  ];

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Title
          level={1}
          style={{ textAlign: "center", padding: "40px 0 40px" }}
        >
          كشـــــف التطعيمات المستحقة
        </Title>

        <Row gutter={24}>
          <Calendar onSelect={selectDate} locale={locale} fullscreen={false} />
        </Row>
        <Table
          dataTable={data}
          table="persons"
          Columns={Columns("persons", columns)}
          options={Options}
        />
      </Content>
    </Layout>
  );
};

export default Index;
