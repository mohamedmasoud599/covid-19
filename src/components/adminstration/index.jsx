import { useState } from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Steps, ConfigProvider, Row, Tabs } from "antd";
import locale from "antd/lib/date-picker/locale/ar_EG";
import "moment/locale/ar";

//steps components
import NIDMID from "./steps/NIDMID";
import RegNumber from "./steps/RegNumber";
import VaccineInfo from "./steps/VaccineInfo";

const { TabPane } = Tabs;
const { Step } = Steps;

const VaccineRegisteration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [registeredPerson, setRegisteredPerson] = useState(null);

  const steps = [
    { title: "الرقم العسكري / الرقم القومي" },
    { title: "رقم التسجيل" },
    { title: "بيانات الجرعة" },
  ];

  const next = (offset = 1) => {
    setCurrentStep(currentStep + offset);
  };

  return (
    <ConfigProvider locale={locale} direction='rtl'>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          margin: "10px auto",
          fontSize: 14,
          backgroundColor: "#d7d1b8",
          height: "100%",
          width: "100%",
          borderRadius: 15,
        }}
      >
        <Steps type='navigation' current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Row
          align='middle'
          justify='center'
          style={{
            minHeight: 400,
          }}
        >
          <Tabs activeKey={(currentStep + 1).toString()}>
            <TabPane key='1'>
              <NIDMID
                stepsLength={steps.length}
                currentStep={currentStep}
                next={next}
                setRegisteredPerson={setRegisteredPerson}
              />
            </TabPane>
            <TabPane key='2'>
              <RegNumber
                stepsLength={steps.length}
                currentStep={currentStep}
                next={next}
                registeredPerson={registeredPerson}
              />
            </TabPane>
            <TabPane key='3'>
              <VaccineInfo
                stepsLength={steps.length}
                currentStep={currentStep}
                registeredPerson={registeredPerson}
              />
            </TabPane>
          </Tabs>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default VaccineRegisteration;
