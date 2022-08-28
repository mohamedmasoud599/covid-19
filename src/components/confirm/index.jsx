import React ,{useEffect,useState} from 'react'
import { Row, Col, Divider, Image, Button } from "antd";
import {  Fetch,Update } from "../common/actions";
import {useParams} from 'react-router-dom'
import ToastHandling from "../common/toastify";

import "./confirm.css"

const ConfirmPanel = (props) => {
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const params = useParams();

  const confirmCommission = () => {
    console.log(params.id)
    setLoadingButton(true);
    Update("/confirms",{},params.id).then((res) => {
      if (res.data.status) {
        setLoadingButton(false);
        ToastHandling("success", res.data.message);
      } else {
        setLoadingButton(false);
        ToastHandling("error", res.data.message);
      }
    });
  }
  useEffect(() => {
    Fetch(`/complaints/${params.id}`).then(
      (res) => {
        if (res.data.status) {
          setData(res.data.data);
          setLoading(true);
        } else {
          ToastHandling("error", res.data.message);
          setData({});
        }
      }
    );
  },[]);

  if(loading){
  return (
    <Row
      className='previewContainer'
      gutter={25}
      justify='center'
      align='middle'
    >
      <Col className='imgpreview' span={11}>
        <Image.PreviewGroup>
          <Image src={data.image} />
        </Image.PreviewGroup>
      </Col>
      <Col className='datapreview' span={11}>
        <Divider orientation='right'>البيانات الأساسية</Divider>
        <div className='databox'>
          <Row justify='center'>
            <Col span={12}>
              <h4 class="header">الإسم : </h4>
              <h3> {data.name}</h3>
            </Col>
            <Col span={12}>
              <h4 class="header">الثلاثي : </h4>
              <h3> {`${data.tribleNum.birth}/${data.tribleNum.markaz}/${data.tribleNum.serial}`}</h3>
            </Col>
          </Row>
        </div>
        <Divider orientation='right'>البيانات الطبية بالمنطقة</Divider>
        <div className='databox'>
          <Row justify='center'>
            <Col span={8}>
              <h4 class="header">القرار الطبي : </h4>
              <h3> {data.tagnidMedical}</h3>
            </Col>
            <Col span={8}>
              <h4 class="header">الموقف الطبي : </h4>
              <h3> {data.tagnidPosition}</h3>
            </Col>
            <Col span={8}>
              <h4 class="header">التشخيص : </h4>
              <h3> {data.speci}</h3>
            </Col>
          </Row>
        </div>
        <Divider orientation='right'>الموقف الطبي بالإدارة</Divider>
        <div className='databox'>
          <Row justify='start'>
            <Col span={8}>
              <h4 class="header">القرار الطبي : </h4>
              <h3> {data.commissionMedical}</h3>
            </Col>
            <Col span={8}>
              <h4 class="header"> الاشعات : </h4>
              <h3> {data.procedures.join('-')}</h3>
            </Col>
            <Col span={8}>
              <h4 class="header"> تاريخ القرار : </h4>
              <h3> {data.commissionDate}</h3>
            </Col>
          </Row>
        </div>
        <Row justify='center' style={{ padding: 20 }}>
          <Button type='primary' className="btn" loading={loadingButton} style={{ height:"60px","font-size":"30px" }} onClick={confirmCommission}>تصديق</Button>
        </Row>
      </Col>
    </Row>
  );}else  {
    return ('Loading ...');
  }
};

export default ConfirmPanel;
