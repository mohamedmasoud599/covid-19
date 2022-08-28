import React, { useState, useEffect } from "react";
import {
  Space,
  Typography,
  Form,
  message,
  DatePicker,
  Button,
  Checkbox,
  Select,
  Modal,
  Result,
} from "antd";
import { InfoCircleTwoTone, WarningTwoTone } from "@ant-design/icons";
import locale from "antd/lib/date-picker/locale/ar_EG";
import { Create } from "../../common/actions";
import ImageUpload from "../../common/imageupload";
import {
  add,
  format,
  differenceInWeeks,
  differenceInCalendarMonths,
} from "date-fns";

const { Title } = Typography;
const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const VaccineInfo = ({ registeredPerson }) => {
  const [fileList, setFileList] = useState([]);
  const [inMilitaryClinic, setinMilitaryClinic] = useState(true);
  const [successModalVisible, setsuccessModalVisible] = useState(false);
  const [errorModalVisible, seterrorModalVisible] = useState(false);

  const doseIndex = registeredPerson?.covidVaccine?.dosesCount;
  const doses = {
    1: "الأولي",
    2: "الثانية",
    3: "الثالثة ( التنشيطية)",
    4: "الرابعة",
    5: "الخامسة",
    6: "السادسة",
    7: "السابعة",
    8: "الثامنة",
    9: "التاسعة",
    10: "العاشرة",
  };
  Object.freeze(doses);

  const isSafeDateDifference = (currentVaccineDate) => {
    const prevVaccineDate = new Date(
      registeredPerson?.covidVaccine?.doses[doseIndex - 1].vaccineDate
    ).getTime();
    switch (doseIndex) {
      case 1:
        return differenceInWeeks(currentVaccineDate, prevVaccineDate) >= 3;
      case 2:
        return (
          differenceInCalendarMonths(currentVaccineDate, prevVaccineDate) >= 6
        );
      default:
        return true;
    }
  };
  const calculateNextVaccinceDate = () => {
    const prevVaccineDate = new Date(
      registeredPerson?.covidVaccine?.doses[doseIndex - 1].vaccineDate
    ).getTime();
    switch (doseIndex) {
      case 1:
        return format(add(prevVaccineDate, { weeks: 3 }), "yyyy-MM-dd");
      case 2:
        return format(add(prevVaccineDate, { months: 6 }), "yyyy-MM-dd");
      default:
        return;
    }
  };
  useEffect(() => {
    if (doseIndex !== 0)
      seterrorModalVisible(!isSafeDateDifference(Date.now()));
  }, []);

  const [form] = Form.useForm();
  return (
    <>
      <Modal
        style={{
          textAlign: "center",
          padding: "10px",
          fontFamily: "Noto Kufi Arabic",
        }}
        footer={null}
        closable={false}
        centered={true}
        visible={successModalVisible}
      >
        <Result
          status="success"
          title="تم التسجيل"
          subTitle="تم تسجيل بيانات الجرعة بنجاح"
        />
        <Button
          onClick={() => {
            window.location.reload(false);
          }}
          type="primary"
          shape="round"
        >
          {" "}
          تسجيل تطعيم جديد{" "}
        </Button>
      </Modal>
      <Modal
        style={{
          textAlign: "center",
          padding: "10px",
          fontFamily: "Noto Kufi Arabic",
        }}
        footer={null}
        closable={false}
        centered={true}
        visible={errorModalVisible}
      >
        <Result
          status="error"
          title="لا يمكن التسجيل"
          subTitle="لا يمكن التسجيل لانه لم يمضي الوقت المطلوب بين الجرعة التالية المستحقة والجرعة السابقة"
          extra={
            doseIndex > 0
              ? [
                  <Title level={5}>
                    موعد الجرعة التالية المستحق هو يوم{" "}
                    {calculateNextVaccinceDate()}{" "}
                  </Title>,
                ]
              : null
          }
        />

        <Button
          onClick={() => {
            window.location.reload(false);
          }}
          type="primary"
          shape="round"
        >
          {" "}
          عودة{" "}
        </Button>
      </Modal>
      <Space size={50} direction="vertical">
        <div>
          <Title level={3}>إدخال بيانات الجرعة {doses[doseIndex + 1]}</Title>
          {doseIndex > 0 && doseIndex <= 2 && (
            <Title level={5}>
              <InfoCircleTwoTone /> موعد الجرعة المستحقة التالية هو{" "}
              {calculateNextVaccinceDate()}
            </Title>
          )}
          {doseIndex > 2 && (
            <Title level={5}>
              <WarningTwoTone /> هذا الشخص قد تلقي الجرعة التنشيطية ( الثالثة )
            </Title>
          )}
        </div>
        <Form form={form}>
          <Form.Item
            label="نوع المصل"
            name="VaccineType"
            rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
          >
            <Select
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
            {/* <Input placeholder="..." /> */}
          </Form.Item>
          <Form.Item
            label="تاريخ الجرعة "
            name="Date"
            rules={[
              { required: true, message: "هذا الحقل مطلوب !" },
              {
                validator: (_, value) => {
                  if (doseIndex === 0) return Promise.resolve();
                  if (value && !isSafeDateDifference(value._d.getTime())) {
                    return Promise.reject(
                      new Error(
                        "لا يمكن تسجيل هذا التاريخ لانه لم يمضي الوقت المطلوب بينه وبين تاريخ الجرعة السابقة"
                      )
                    );
                  } else return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              format={"D-M-YYYY"}
              size="large"
              locale={locale}
            ></DatePicker>
          </Form.Item>
          <p>صورة شهادة التطعيم</p>
          <Form.Item
            name="Certificate"
            rules={[
              {
                validator: () => {
                  if (fileList.length === 0)
                    return Promise.reject(new Error("صورة الشهادة مطلوبة"));
                  else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <ImageUpload fileList={fileList} setFileList={setFileList} />
          </Form.Item>
          <Checkbox
            checked
            onChange={(e) => {
              setinMilitaryClinic(e.target.checked);
            }}
          >
            في مستشفي عسكري
          </Checkbox>
        </Form>
        <div>
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  getBase64(fileList[0].originFileObj).then((img) => {
                    const dosage = {
                      type: form.getFieldValue("VaccineType"),
                      indexOfDose: doseIndex + 1,
                      isInMilitaryHospital: inMilitaryClinic,
                      vaccineDate: form.getFieldValue("Date")._d,
                      certificate: img,
                    };
                    Create(
                      `persons/${registeredPerson._id}/covidVaccine/doses`,
                      JSON.stringify(dosage)
                    ).then(() => {
                      setsuccessModalVisible(true);
                    });
                  });
                })
                .catch(() => {
                  message.warning("من فضلك قم بادخال كامل البيانات");
                });
            }}
          >
            تسجيل
          </Button>
        </div>
      </Space>
    </>
  );
};

export default VaccineInfo;
