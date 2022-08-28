import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "شاب تجنيد",
    "الجرعة الاولي": 20,
    "الجرعة الثانية": 30,
    "الجرعة الثالثة": 40,
  },
  {
    name: "مجند",
    "الجرعة الاولي": 50,
    "الجرعة الثانية": 60,
    "الجرعة الثالثة": 70,
  },
  {
    name: "ظابط / راتب عالي",
    "الجرعة الاولي": 80,
    "الجرعة الثانية": 30,
    "الجرعة الثالثة": 10,
  },
  {
    name: "مدني",
    "الجرعة الاولي": 30,
    "الجرعة الثانية": 50,
    "الجرعة الثالثة": 20,
  }
];

const LineChart = () => {
  return (
    <ResponsiveContainer>
      <AreaChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="الجرعة الاولي"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="الجرعة الثانية"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="الجرعة الثالثة"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
