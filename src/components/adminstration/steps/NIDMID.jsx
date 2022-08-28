import { useState } from "react";
import { Space, Typography, Form, Input, Radio, Button, message } from "antd";
import { Fetch } from "../../common/actions";
const { Title } = Typography;

const NIDMID = ({ stepsLength, currentStep, next, setRegisteredPerson }) => {
  const [form] = Form.useForm();
  const [radioValue, setradioValue] = useState("nid");

  return (
    <>
      <Space size={50} direction="vertical">
        <Title level={3}>إدخل الرقم العسكري أو الرقم القومي</Title>
        <Form form={form}>
          نوع الرقم :{" "}
          <Radio.Group
            onChange={(e) => setradioValue(e.target.value)}
            value={radioValue}
          >
            <Radio value="mid">رقم عسكري</Radio>
            <Radio value="nid"> رقم قومي</Radio>
          </Radio.Group>
          <br />
          <br />
          <Form.Item
            label=" "
            name="NIDMID"
            rules={[
              { required: true, message: " هذا الحقل مطلوب !" },
              {
                len: radioValue === "mid" ? 13 : 14,
                message: `هذا الحقل يجب أن يتكون من ${
                  radioValue === "mid" ? 13 : 14
                } رقم`,
              },
            ]}
          >
            <Input
              placeholder={
                radioValue === "mid"
                  ? "ادخل الرقم العسكري"
                  : "ادخل الرقم القومي"
              }
            />
          </Form.Item>
        </Form>
        <div>
          {currentStep < stepsLength - 1 && (
            <Button
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then(() => {
                    const number = form.getFieldValue("NIDMID");
                    Fetch(`persons/filterPerson?number=${number}`)
                      .then((res) => {
                        if (!res) {
                          message.error("هذا المستخدم غير مسجل");
                          return;
                        }
                        return res.data;
                      })
                      .then((data) => {
                        if (data) {
                          setRegisteredPerson(data);
                          if (data?.covidVaccine?.registerSerialNumber) next(2);
                          else next();
                        }
                      });
                  })
                  .catch((errors) => {
                    message.warning("من فضلك ادخل رقم صحيح");
                    console.log(errors);
                  });
              }}
            >
              الخطوة التالية
            </Button>
          )}
        </div>
      </Space>
    </>
  );
};

export default NIDMID;
