import { Input, FormItem, AutoComplete } from "formik-antd";
import { Col } from "antd";
import React, { useState } from "react";
import { dataRank } from "../data";
import * as yup from "yup";
import { Create } from "../../common/actions";
import ToastHandling from "../../common/toastify";
import Common from "../common";

const Officers = () => {
  const [value, setValue] = useState(dataRank);

  const initialValues = {
    name: "",
    rank: "",
    nationalId: "",
    seniorityNum: "",
  };
  const validationSchema = () =>
    yup.object({
      name: yup.string("ادخل الاسم رباعي").required("مطلوب"),
      nationalId: yup
        .string("ادخل الرقم القومى")
        .length(14, "الرقم العسكرى يجب ان يتكون من 14   رقم")
        .required("مطلوب"),
      rank: yup
        .string("ادخل الرتبه")
        .oneOf(dataRank, "خطا باسم الرتبه")
        .required("مطلوب"),
      phoneNumber: yup
        .string("ادخل رقم التلفون")
        .length(11, "رقم التلفون يجب ان يتكون من 11 رقم"),
      seniorityNum: yup.string("ادخل رقم الاقدمية").required("مطلوب"),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    values.type = "ضابط";
    // if (values.phoneNumber.length === 0) delete values.phoneNumber;

    Create("/persons", values).then((res) => {
      if (res) {
        ToastHandling("success", "تم تسجيل الفرد بنجاح");
        resetForm({});
      } else {
        setSubmitting(false);
        ToastHandling("error", res);
      }
      setSubmitting(false);
    });
  };

  const onSearch = (searchText) => {
    setValue(
      dataRank.filter((data) =>
        data.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  return (
    <Common
      initialValue={initialValues}
      validationSchema={validationSchema}
      submitForm={submitForm}
    >
      <Col className="gutter-row" span={8}>
        <FormItem
          name="seniorityNum"
          hasFeedback={true}
          showValidateSuccess={true}
        >
          <Input name="seniorityNum" placeholder="رقم الاقدميه" />
        </FormItem>
      </Col>

      <Col className="gutter-row" span={8}>
        <FormItem
          name="nationalId"
          hasFeedback={true}
          showValidateSuccess={true}
        >
          <Input name="nationalId" placeholder="الرقم القومى" />
        </FormItem>
      </Col>
      <Col className="gutter-row" span={12}>
        <FormItem name="rank" hasFeedback={true} showValidateSuccess={true}>
          <AutoComplete
            name="rank"
            dataSource={value}
            placeholder="الرتبه"
            onSearch={onSearch}
            allowClear
          />
        </FormItem>
      </Col>
      <Col className="gutter-row" span={12}>
        <FormItem
          name="phoneNumber"
          hasFeedback={true}
          showValidateSuccess={true}
        >
          <Input name="phoneNumber" placeholder="رقم التلفون" />
        </FormItem>
      </Col>
    </Common>
  );
};

export default Officers;
