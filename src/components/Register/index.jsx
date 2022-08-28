import React, { useState } from "react";
import { Layout, Typography, Select, Col } from "antd";
import Mujanad from "./mujanad";
import Guy from "./guy";
import Officers from "./officers";
import Citizen from "./citizen";
import Highsalary from "./safzapt";

const { Option } = Select;
const { Content } = Layout;
const { Title } = Typography;

const Register = () => {
  const [type, setType] = useState(0);

  const handleChange = (value) => {
    setType(value);
  };

  return (
    <Layout className="register">
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Title level={2}>البيانات الاساسية</Title>
        <Col className="gutter-row" span={24}>
          <Select
            style={{ width: "100%", marginBottom: "10px" }}
            native
            name="type"
            placeholder="فئة المسجل"
            onChange={(e) => handleChange(e)}
          >
            <Option value={0}>مجند</Option>
            <Option value={1}>شاب التجنيد</Option>
            <Option value={2}> ضابط</Option>
            <Option value={3}>راتب عالي</Option>
            <Option value={4}>مدني</Option>
          </Select>
        </Col>
        {type === 0 ? (
          <Mujanad />
        ) : type === 1 ? (
          <Guy />
        ) : type === 2 ? (
          <Officers />
        ) : type === 3 ? (
          <Highsalary />
        ) : (
          <Citizen />
        )}
      </Content>
    </Layout>
  );
};

export default Register;
