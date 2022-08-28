import { Input, FormItem, AutoComplete, DatePicker } from "formik-antd";
import Common from "../common";
import { Col } from "antd";
import React, { useState } from "react";
import { dataRank, dataWeapon, dataCategory } from "../data";
import { Create } from "../../common/actions";
import ToastHandling from "../../common/toastify";
import * as yup from "yup";
import locale from "antd/lib/date-picker/locale/ar_EG";

const Mujanad = () => {
  const [value, setValue] = useState(dataRank);
  const [weapon, setWeapon] = useState(dataWeapon);
  const [category, setCategory] = useState(dataCategory);

  const initialValues = {
    name: "",
    milId: "",
    tagnidDate: "",
    rank: "",
    corp: "",
    category: "",
    joinDate: "",
    leavingDate: "",
    nationalId: "",
  };

  const validationSchema = () =>
    yup.object({
      name: yup.string("ادخل الاسم رباعي").required("مطلوب"),
      milId: yup
        .string("ادخل الرقم العسكرى")
        .length(13, "الرقم العسكرى يجب ان يتكون من 13   رقم")
        .required("مطلوب"),
      nationalId: yup
        .string("ادخل الرقم القومى")
        .length(14, "الرقم القومى يجب ان يتكون من 14   رقم")
        .required("مطلوب"),
      rank: yup
        .string("ادخل الرتبه")
        .oneOf(dataRank, "خطا باسم الرتبه")
        .required("مطلوب"),
      corp: yup
        .string("ادخل السلاح")
        .oneOf(dataWeapon, "خطا باسم السلاح")
        .required("مطلوب"),
      category: yup
        .string("ادخل الفئه")
        .oneOf(dataCategory, "خطا باسم الفئه")
        .required("مطلوب"),
      tagnidDate: yup.date("ادخل تاريخ التجنيد").required("مطلوب"),
      joinDate: yup.date("ادخل تاريخ الضم ").required("مطلوب"),
      leavingDate: yup.date("ادخل  تاريخ التسريح").required("مطلوب"),
      phoneNumber: yup
        .string("ادخل رقم التلفون")
        .length(11, "رقم التلفون يجب ان يتكون من 11 رقم"),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    values.type = "مجند";
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

  const onWeapon = (searchText) => {
    setWeapon(
      dataWeapon.filter((data) =>
        data.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };
  const onCategory = (searchText) => {
    setCategory(
      dataCategory.filter((data) =>
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
      <Col className="gutter-row" span={8}>
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
      <Col className="gutter-row" span={8}>
        <FormItem name="category" hasFeedback={true} showValidateSuccess={true}>
          <AutoComplete
            name="category"
            dataSource={category}
            placeholder="الفئه"
            onSearch={onCategory}
            allowClear
          />
        </FormItem>
      </Col>
      <Col className="gutter-row" span={8}>
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
      <Col className="gutter-row" span={8}>
        <FormItem
          name="tagnidDate"
          hasFeedback={true}
          showValidateSuccess={true}
        >
          <DatePicker
            placeholder="تاريخ التجنيد"
            onChange={onChangeDate}
            locale={locale}
            name="tagnidDate"
            format={"D-M-YYYY"}
          />
        </FormItem>
      </Col>

      <Col className="gutter-row" span={8}>
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
      <Col className="gutter-row" span={8}>
        <FormItem
          name="leavingDate"
          hasFeedback={true}
          showValidateSuccess={true}
        >
          <DatePicker
            placeholder="تاريخ التسريح"
            locale={locale}
            onChange={onChangeDate}
            name="leavingDate"
            format={"D-M-YYYY"}
          />
        </FormItem>
      </Col>
      <Col className="gutter-row" span={24}>
        <FormItem
          name="phoneNumber"
          hasFeedback={true}
          showValidateSuccess={true}
        >
          <AutoComplete
            name="phoneNumber"
            placeholder="رقم التلفون"
            allowClear
          />
        </FormItem>
      </Col>
    </Common>
  );
};

export default Mujanad;
