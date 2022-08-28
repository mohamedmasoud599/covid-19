import { Input, FormItem, AutoComplete, DatePicker } from "formik-antd";
import { Col } from "antd";
import React, { useState } from "react";
import { dataRank } from "../data";
import * as yup from "yup";
import { Create } from "../../common/actions";
import ToastHandling from "../../common/toastify";
import { dataWeapon } from "../data";
import Common from "../common";
import locale from "antd/lib/date-picker/locale/ar_EG";

const Highsalary = () => {
  const [value, setValue] = useState(dataRank);
  const [weapon, setWeapon] = useState(dataWeapon);

  const initialValues = {
    name: "",
    milId: "",
    rank: "",
    nationalId: "",
    corp: "",
    joinDate: "",
  };
  const validationSchema = () =>
    yup.object({
      name: yup.string("ادخل الاسم رباعي").required("مطلوب"),
      milId: yup
        .string("ادخل الرقم العسكرى")
        .length(13, "الرقم العسكرى يجب ان يتكون من 13 رقم")
        .required("مطلوب"),
      nationalId: yup
        .string("ادخل الرقم القومى")
        .length(14, "الرقم العسكرى يجب ان يتكون من 14   رقم")
        .required("مطلوب"),
      rank: yup
        .string("ادخل الرتبه")
        .oneOf(dataRank, "خطا باسم الرتبه")
        .required("مطلوب"),
      corp: yup
        .string("ادخل السلاح")
        .oneOf(dataWeapon, "خطا باسم السلاح")
        .required("مطلوب"),
      joinDate: yup.date("ادخل تاريخ الضم ").required("مطلوب"),
      phoneNumber: yup
        .string("ادخل رقم التلفون")
        .length(11, "رقم التلفون يجب ان يتكون من 11 رقم"),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    values.type = "راتب عالي";
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
  const onWeapon = (searchText) => {
    setWeapon(
      dataWeapon.filter((data) =>
        data.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const onSearch = (searchText) => {
    setValue(
      dataRank.filter((data) =>
        data.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };
  const onChangeDate = (data, dataString) => {
    console.log(data, dataString);
  };

  return (
    <Common
      initialValue={initialValues}
      validationSchema={validationSchema}
      submitForm={submitForm}
    >
      <Col className="gutter-row" span={8}>
        <FormItem name="milId" hasFeedback={true} showValidateSuccess={true}>
          <Input name="milId" placeholder="الرقم العسكرى" />
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
        <FormItem name="corp" hasFeedback={true} showValidateSuccess={true}>
          <AutoComplete
            name="corp"
            dataSource={weapon}
            placeholder="السلاح"
            onSearch={onWeapon}
            allowClear
          />
        </FormItem>
      </Col>
      <Col className="gutter-row" span={12}>
        <FormItem name="joinDate" hasFeedback={true} showValidateSuccess={true}>
          <DatePicker
            placeholder="تاريخ الضم"
            locale={locale}
            onChange={onChangeDate}
            name="joinDate"
            format={"D-M-YYYY"}
          />
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

export default Highsalary;
