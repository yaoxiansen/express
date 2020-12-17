var express = require('../../');
var app = module.exports = express();
var axios = require('axios');
var xmlParser = require('xml2json');
var conf = module.exports = require('./conf');

app.get('/query-available-subplan-request', async function(req, res){
  const axios_res = await axios.post(conf.SubPlan.url,conf.SubPlan.xmls,conf.SubPlan.headerConfs);
  if(axios_res && axios_res['data']){
    const data = axios_res['data'];
    res.send(conf.parseData(xmlParser.toJson(data),conf.SubPlan.paths));
  }
});

app.get('/query-goods-detail-request', async function(req, res){
  const axios_res = await axios.post(conf.GoogleDetail.url,conf.GoogleDetail.xmls,conf.GoogleDetail.headerConfs);
  if(axios_res && axios_res['data']){
    const data = axios_res['data'];
    res.send(conf.parseData(xmlParser.toJson(data),conf.GoogleDetail.paths));
  }
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
