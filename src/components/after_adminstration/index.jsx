import React, { useState, useEffect } from "react";
import { Layout, Row, Select, Input, Button, Col } from "antd";
import { useHistory } from "react-router-dom";
import Table from "../common/table";
import Columns from "../common/columnTable";
import { Fetch } from "../common/actions";
import ToastHandling from "../common/toastify";

const { Content } = Layout;
const { Option } = Select;

export default function RegisteredPeople() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const history = useHistory();

  const handlePrint = () => {
    history.push("/report");
  };

  const handleType = (event) => {
    Fetch(`/persons/peopleFilteration?name=${event.target.value}`).then(
      (res) => {
        if (res?.data) {
          let Data = [];
          res.data.map((item) => {
            let VaccineType = [];

            item.covidVaccine.doses.map((type) => VaccineType.push(type.type));

            return Data.push({
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
              covidVaccine: VaccineType.join(","),
              VaccineOne: item.covidVaccine?.doses[0]?.date
                ? new Date(
                    item.covidVaccine?.doses[0]?.date
                  ).toLocaleDateString("ar")
                : null,
              VaccineTwo: item.covidVaccine?.doses[1]?.date
                ? new Date(
                    item.covidVaccine?.doses[1]?.date
                  ).toLocaleDateString("ar")
                : null,
              VaccineThree: item.covidVaccine?.doses[2]?.date
                ? new Date(
                    item.covidVaccine?.doses[2]?.date
                  ).toLocaleDateString("ar")
                : null,
            });
          });
          setData(Data);
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
        res.data.map((item) => {
          let VaccineType = [];

          item.covidVaccine.doses.map((type) => VaccineType.push(type.type));

          return Data.push({
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
            covidVaccine: VaccineType.join(","),
            VaccineOne: item.covidVaccine?.doses[0]?.date
              ? new Date(item.covidVaccine?.doses[0]?.date).toLocaleDateString(
                  "ar"
                )
              : null,
            VaccineTwo: item.covidVaccine?.doses[1]?.date
              ? new Date(item.covidVaccine?.doses[1]?.date).toLocaleDateString(
                  "ar"
                )
              : null,
            VaccineThree: item.covidVaccine?.doses[2]?.date
              ? new Date(item.covidVaccine?.doses[2]?.date).toLocaleDateString(
                  "ar"
                )
              : null,
          });
        });
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
        res.data.map((item) => {
          let VaccineType = [];

          item.covidVaccine.doses.map((type) => VaccineType.push(type.type));

          return Data.push({
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
            covidVaccine: VaccineType.join(","),
            VaccineOne: item.covidVaccine?.doses[0]?.date
              ? new Date(item.covidVaccine?.doses[0]?.date).toLocaleDateString(
                  "ar"
                )
              : null,
            VaccineTwo: item.covidVaccine?.doses[1]?.date
              ? new Date(item.covidVaccine?.doses[1]?.date).toLocaleDateString(
                  "ar"
                )
              : null,
            VaccineThree: item.covidVaccine?.doses[2]?.date
              ? new Date(item.covidVaccine?.doses[2]?.date).toLocaleDateString(
                  "ar"
                )
              : null,
          });
        });
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
      res.data.map((item) => {
        let VaccineType = [];
        if (item.covidVaccine.doses[0]) {
          item.covidVaccine.doses.map((type) => VaccineType.push(type.type));
          return Data.push({
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
            covidVaccine: VaccineType.join(","),
            VaccineOne: item.covidVaccine?.doses[0]?.vaccineDate
              ? new Date(
                  item.covidVaccine?.doses[0]?.vaccineDate
                ).toLocaleDateString("ar")
              : null,
            VaccineTwo: item.covidVaccine?.doses[1]?.vaccineDate
              ? new Date(
                  item.covidVaccine?.doses[1]?.vaccineDate
                ).toLocaleDateString("ar")
              : null,
            VaccineThree: item.covidVaccine?.doses[2]?.vaccineDate
              ? new Date(
                  item.covidVaccine?.doses[2]?.vaccineDate
                ).toLocaleDateString("ar")
              : null,
          });
        }
      });
      setData(Data);
    });
  }, []);
  const columns = [
    {
      label: "?????? ????????????",
      name: "type",
    },
    {
      label: "?????????? ????????????",
      name: "nationalId",
    },
    {
      label: "??????????",
      name: "name",
    },

    {
      label: "??????????",
      name: "category",
    },
    {
      label: " ?????? ??????????",
      name: "covidVaccine",
    },
    {
      label: "?????????? ???????????? ????????????",
      name: "VaccineOne",
    },
    {
      label: "?????????? ???????????? ??????????????",
      name: "VaccineTwo",
    },
    {
      label: "?????????? ???????????? ??????????????",
      name: "VaccineThree",
    },
  ];

  const Options = {
    count: count,
    page: 0,
    rowsPerPage: 10,
    filter: true,
    filterType: "dropdown",
    responsive: "sample",
    serverSide: false,
  };

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64, textAlign: "center" }}
      >
        <Button
          onClick={handlePrint}
          style={{
            minWidth: "200px",
            minHeight: "70px",
            borderRadius: "20px",
            padding: 0,
            transition: "all .3s ease-in",
            fontSize: "20px",
            fontWeight: 600,
            background: "#3a6351",
            margin: "30px 0",
            color: "#fff",
            position: "relative",
          }}
        >
          ?????????? ??????????
        </Button>
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
              placeholder=" ?????????? ..."
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <Select
              style={{ width: "100%", marginBottom: "10px" }}
              native
              name="gover"
              placeholder="?????? ????????????"
              onChange={handleChange}
            >
              <Option value={"????????"}>????????</Option>
              <Option value={"?????? ??????????"}>?????? ??????????????</Option>
              <Option value={"????????"}>????????</Option>
              <Option value={"???????? ????????"}>???????? ???????? </Option>
              <Option value={"????????"}>????????</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={8}>
            <Select
              style={{ width: "100%" }}
              native
              onChange={handleVaccine}
              name="gover"
              placeholder="????????  ??????????????"
            >
              <Option value={1}> ???????? ???????????? ??????????????</Option>
              <Option value={0}>???????? ???????????? ??????????????</Option>
            </Select>
          </Col>
        </Row>

        <Table
          dataTable={data}
          table="commission"
          Columns={Columns("commission", columns)}
          options={Options}
        />
      </Content>
    </Layout>
  );
}
