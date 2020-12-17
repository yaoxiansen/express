var _ = require('lodash');

const SubPlan = {
  url: 'http://34.205.231.203:7300/mock/5fd709c891d80300ac74e519/womv/ws/catalogo/v1.0/ecommerce/datos/obtener/QueryAvailableSubsPlan4WOMRequest',
  headerConfs: {headers: {'Content-Type': 'text/xml'}},
  xmls:`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://com.ztesoft.zsmart/xsd">
   <soapenv:Header>
      <xsd:AuthHeader>
         <Username>NY</Username>
         <Password>smart</Password>
         <!--Optional:-->
         <ChannelCode>MAT</ChannelCode>
      </xsd:AuthHeader>
   </soapenv:Header>
   <soapenv:Body>
      <xsd:QueryAvailableSubsPlan4WOMRequest>
         <!--Optional:-->
         <CustType></CustType>
         <!--Optional:-->
         <PostpaidFlag>Y</PostpaidFlag>
         <!--Optional:-->
         <SubsPlanCode>WOM36</SubsPlanCode>
      </xsd:QueryAvailableSubsPlan4WOMRequest>
   </soapenv:Body>
</soapenv:Envelope>`,
  paths:{
    subsPlanCode: 'soapenv:Envelope.soapenv:Body.ns:QueryAvailableSubsPlan4WOMResponse.SubsPlanDtoList.SubsPlanCode'
  }
}

const GoogleDetail = {
  url: 'http://34.205.231.203:7300/mock/5fd709c891d80300ac74e519/womv/ws/catalogo/v1.0/ecommerce/datos/obtener/QueryGoodsDetailRequest',
  headerConfs: {headers: {'Content-Type': 'text/xml'}},
  xmls:`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://com.ztesoft.zsmart/xsd">
   <soapenv:Header>
      <xsd:AuthHeader>
         <Username>NY</Username>
         <Password>smart</Password>
         <!--Optional:-->
         <ChannelCode>IVR</ChannelCode>
      </xsd:AuthHeader>
   </soapenv:Header>
   <soapenv:Body>
      <xsd:QueryGoodsDetailRequest>
         <!--Optional:-->
         <OfferCode>001.002.1768</OfferCode>
         <!--Optional:-->
         <ServiceNumber>56972110634</ServiceNumber>
         <SaleScenario>30026</SaleScenario>
      </xsd:QueryGoodsDetailRequest>
   </soapenv:Body>
</soapenv:Envelope>`,
  paths:{
    OfferCode:'soapenv:Envelope.soapenv:Body.ns:QueryGoodsDetailResponse.GoodsOfferDtoList.OfferCode'
  }
}

const refineJsonData = function (obj,props){
  let res;
  const isvoid = (x) => typeof x === 'undefined' || x === null;
  if (!isvoid(obj)) {
    if (isvoid(props)) { props = []; }
    if (typeof props  === 'string') { props = props.trim().split('.'); }
    if (props.constructor === Array) {
      res = props.length > 1 ? refineJsonData(obj[props.shift()], props) : obj[props[0]];
    }
  }
  return res
}

const parseData = function (data, paths){
  if(!paths){
    return data;
  }
  if(typeof data === 'string'){
    data = JSON.parse(data);
  }
  const newJson = {};
  Object.keys(paths).forEach(key =>{
    newJson[key] = refineJsonData(data,paths[key]);
  });
  return newJson;
}

module.exports.SubPlan = SubPlan;
module.exports.GoogleDetail = GoogleDetail;
module.exports.parseData = parseData;

