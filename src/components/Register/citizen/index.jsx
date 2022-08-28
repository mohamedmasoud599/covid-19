import { Input, FormItem } from "formik-antd";
import { Col } from "antd";
import * as yup from "yup";
import { Create } from "../../common/actions";
import ToastHandling from "../../common/toastify";
import Common from "../common";

const Citizen = () => {
  const initialValues = {
    name: "",
    nationalId: "",
    // phoneNumber: "",
    address: "",
  };
  const validationSchema = () =>
    yup.object({
      name: yup.string("ادخل الاسم رباعي").required("مطلوب"),
      nationalId: yup
        .string("ادخل الرقم القومى")
        .length(14, "الرقم القومى يجب ان يتكون من 14 رقم")
        .required("مطلوب"),
      phoneNumber: yup
        .string("ادخل رقم التلفون")
        .length(11, "رقم التلفون يجب ان يتكون من 11 رقم"),
      address: yup.string("ادخل  العنوان ").required("مطلوب"),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    values.type = "مدني";
    if (values.phoneNumber.length === 0) delete values.phoneNumber;
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

  return (
    <Common
      initialValue={initialValues}
      validationSchema={validationSchema}
      submitForm={submitForm}
    >
      <Col className="gutter-row" span={16}>
        <FormItem name="address" hasFeedback={true} showValidateSuccess={true}>
          <Input name="address" placeholder="العنوان" />
        </FormItem>
      </Col>
      <Col className="gutter-row" span={12}>
        <FormItem
          name="nationalId"
          hasFeedback={true}
          showValidateSuccess={true}
        >
          <Input name="nationalId" placeholder="الرقم القومى" />
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

export default Citizen;
