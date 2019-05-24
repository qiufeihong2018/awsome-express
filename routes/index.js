'use strict'
const express = require('express');
const router = express.Router();
// 获取事件
const event = require('../initData/alarm')
// 从低级事件中匹配高级事件
router.get('/', function (req, res) {
  // 自定义周期
  const cycle = 30
  // 自定义规则
  const rule = ['1004137', '1004139', '1004136']
  // 比配的列表
  let tmpEvent = []
  let tmpSmallEvent = {
    _id: '',
    timestamp: ''
  }
  // 高级事件
  let advanceEvent = []
  // 遍历所有低级事件
  for (let i in event) {
    // console.log(`${i}------${event[i]}`)
    let _id = event[i]._id
    // console.log('_id', _id)
    let signatureId = event[i].signatureId
    console.log('signatureId', signatureId)
    // 通过原型方法转时间戳
    let timestamp = (new Date(event[i].timestamp)).getTime()
    // console.log('timestamp', timestamp)
    // 遍历规则
    // for (let j in rule) {
    if (signatureId === rule[0]) {
      tmpSmallEvent._id = _id
      tmpSmallEvent.timestamp = timestamp
      tmpEvent[0] = tmpSmallEvent
      if(signatureId===rule[1]){
        tmpSmallEvent._id = _id
        tmpSmallEvent.timestamp = timestamp
        tmpEvent[1] = tmpSmallEvent    
      }
      // }
      // console.log('rule', rule[j])
      // tmpEvent[j] = _id
      console.log('tmpEvent', tmpEvent)
    }
  }
  res.send(tmpEvent)
});

module.exports = router;
