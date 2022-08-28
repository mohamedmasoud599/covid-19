import { Space, Typography, Form, Input, Button, message } from "antd";
import { Create } from "../../common/actions";
const { Title } = Typography;

const RegNumber = ({ stepsLength, currentStep, next, registeredPerson }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Space size={50} direction="vertical">
        <Title level={3}>إدخال رقم تسجيل الجرعة</Title>
        <Form form={form}>
          <Form.Item
            label=" "
            name="VaccineRegNo"
            rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
          >
            <Input
              placeholder={
                registeredPerson?.covidVaccine?.registerSerialNumber ??
                "رقم تسجيل الجرعة"
              }
              disabled={
                registeredPerson?.covidVaccine?.registerSerialNumber
                  ? true
                  : false
              }
            />
          </Form.Item>
        </Form>
        <div>
          {currentStep < stepsLength - 1 && (
            <Button
              type="primary"
              onClick={() => {
                if (registeredPerson?.covidVaccine?.registerSerialNumber)
                  next();
                else
                  form
                    .validateFields()
                    .then(() => {
                      Create(
                        `persons/${registeredPerson._id}/covidVaccine`,
                        JSON.stringify({
                          registerSerialNumber:
                            form.getFieldValue("VaccineRegNo"),
                        })
                      ).then(() => {
                        next();
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

export default RegNumber;
