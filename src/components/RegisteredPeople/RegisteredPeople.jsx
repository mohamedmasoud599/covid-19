import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Select, Input, Col } from "antd";
import Table from "../common/table";
import Columns from "../common/columnTable";
import { Fetch } from "../common/actions";
import ToastHandling from "../common/toastify";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function RegisteredPeople() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();

  const handleType = (event) => {
    Fetch(`/persons/peopleFilteration?name=${event.target.value}`).then(
      (res) => {
        if (res?.data) {
          setData(res.data);
        } else {
          ToastHandling("error", res.data.message);
        }
      }
    );
  };

  const handleChange = (event) => {
    Fetch(`/persons/peopleFilteration?persontype="${event}"`).then((res) => {
      if (res?.data) {
        let Data = [];
        res.data.map((item) =>
          Data.push({
            ...item,
            joinDate: item.joinDate
              ? new Date(item.joinDate).toLocaleDateString("ar")
              : null,
            registerDate: item.registerDate
              ? new Date(item.registerDate).toLocaleDateString("ar")
              : null,
            leavingDate: item.leavingDate
              ? new Date(item.leavingDate).toLocaleDateString("ar")
              : null,
          })
        );
        setData(Data);
      } else {
        ToastHandling("error", res.data.message);
      }
    });
  };

  const handleVaccine = (event) => {
    Fetch(`/persons/peopleFilteration?VaccineType="${event}"`).then((res) => {
      if (res?.data) {
        let Data = [];
        res.data.map((item) =>
          Data.push({
            ...item,
            joinDate: item.joinDate
              ? new Date(item.joinDate).toLocaleDateString("ar")
              : null,
            registerDate: item.registerDate
              ? new Date(item.registerDate).toLocaleDateString("ar")
              : null,
            leavingDate: item.leavingDate
              ? new Date(item.leavingDate).toLocaleDateString("ar")
              : null,
          })
        );
        setData(Data);
      } else {
        ToastHandling("error", res.data.message);
      }
    });
  };

  useEffect(() => {
    Fetch(`/persons`).then((res) => {
      setCount(res.data.length);
      let Data = [];
      res.data.map((item) =>
        Data.push({
          ...item,
          joinDate: item.joinDate
            ? new Date(item.joinDate).toLocaleDateString("ar")
            : null,
          registerDate: item.registerDate
            ? new Date(item.registerDate).toLocaleDateString("ar")
            : null,
          leavingDate: item.leavingDate
            ? new Date(item.leavingDate).toLocaleDateString("ar")
            : null,
        })
      );
      setData(Data);
    });
  }, []);

  const Options = {
    count: count,
    page: 0,
    rowsPerPage: 10,
    filter: true,
    filterType: "dropdown",
    responsive: "sample",
    serverSide: false,
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
      label: "السلاح ",
      name: "corp",
    },
    {
      label: "الفئة",
      name: "category",
    },
    {
      label: "تاريخ الضم",
      name: "joinDate",
    },
    {
      label: "تاريخ التسريح",
      name: "leavingDate",
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
          كشـــــف الأسمــــاء المسجلة
        </Title>

        <Row gutter={24}>
          <Col className="gutter-row" span={8}>
            <Input
              type="text"
              style={{
                padding: "14px 30px",
                fontSize: "20px",
                fontWeight: "600",
                border: "1px solid",
              }}
              onChange={handleType}
              name="name"
              className="form-control"
              id="name"
              placeholder=" الاسم ..."
            />
          </Col>

          <Col className="gutter-row" span={8}>
            <Select
              style={{ width: "100%", marginBottom: "10px" }}
              native
              name="gover"
              placeholder="فئة المسجل"
              onChange={handleChange}
            >
              <Option value={"مجند"}>مجند</Option>
              <Option value={"شاب تجنيد"}>شاب التجنيد</Option>
              <Option value={"ضابط"}>ظابط</Option>
              <Option value={"راتب عالي"}>راتب عالي </Option>
              <Option value={"مدني"}>مدني</Option>
            </Select>
          </Col>

          <Col className="gutter-row" span={8}>
            <Select
              onChange={handleVaccine}
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "5px 20px !important",
              }}
              placeholder="نوع المصل"
            >
              <Option value={"استرازينكا"}>استرازينكا</Option>
              <Option value={"فايزر"}>فايزر</Option>
              <Option value={"موديرنا"}>موديرنا</Option>
              <Option value={"سينوفارم"}>سينوفارم</Option>
              <Option value={"سينوفاك"}>سينوفاك</Option>
              <Option value={"سبوتنيك"}>سبوتنيك</Option>
              <Option value={"جونسون"}>جونسون</Option>
            </Select>
          </Col>
        </Row>
        <Table
          dataTable={data}
          table="compliants"
          Columns={Columns("compliants", columns)}
          options={Options}
        />
      </Content>
    </Layout>
  );
}
