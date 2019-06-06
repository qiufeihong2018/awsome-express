'use strict'
const express = require('express');
const router = express.Router();
// 获取事件
const event = require('../initData/alarm')
// 获取规则
const rule = require('../initData/rule')

let arrayEvent = []

// 自定义周期,30d-毫秒数
const cycle = 2592000

// 高级事件
let advanceEvent = {
  alarmList: [],
  expireAt: '',
  trace: []
}

let status_map = new Map()
let final_map = new Map()

rule.forEach(item => {
  // 各个规则组
  status_map.set(item.key.value, [])
  final_map.set(item.key.value, [])
})

// 总的符合规则的数据
let arrTotalRuleToEvent = []
// 符合规则的数组
let arrRuleToEvent = []
//符合规则的事件对象
let objRuleToEvent = {
  _id: '',
  signatureId: '',
  timestamp: '',
  expireAt: '',
  nextRule: ''
}

// 获取低级事件
function getArrayEvent() {
  for (let i in event) {
    let tmpEvent = {
      _id: '',
      signatureId: '',
      timestamp: '',
      expireAt: ''
    }
    tmpEvent._id = event[i]._id
    tmpEvent.signatureId = event[i].signatureId
    // 通过原型方法转时间戳
    tmpEvent.timestamp = (new Date(event[i].timestamp)).getTime()
    tmpEvent.expireAt = tmpEvent.timestamp + cycle
    arrayEvent.push(tmpEvent)
  }
}

// map转对象
function strMapToObj(strMap) {
  let obj = Object.create(null)
  for (let item of strMap) {
    obj[item[0]] = item[1]
  }
  return obj
}
// 从低级事件中匹配高级事件
router.get('/', function (req, res) {
  getArrayEvent()

  // 遍历所有低级事件
  // 筛选各个规则组
  for (let key of status_map.keys()) {
    let tmpArr = []

    for (let i in arrayEvent) {
      if (arrayEvent[i].signatureId === key) {
        tmpArr.push(arrayEvent[i])
      }
    }
    status_map.set(key, tmpArr)
    tmpArr = []
  }
  // 筛选出最新的事件
  // item[0]是key，item[1]是value
  for (let item of status_map.entries()) {
    final_map.set(item[0], item[1][0])
    for (let j in item[1]) {
      if (item[1][j].timestamp > final_map.get(item[0]).timestamp) {
        final_map.set(item[0], item[1][j])
      }
    }
  }

  // 从event中找到详细数据
  for (let item of final_map.entries()) {
    var expireAt = item[1].timestamp
    let tmpArr = []
    tmpArr.push(event.find(v => v._id === item[1]._id))
    final_map.set(item[0], tmpArr)
  }

  advanceEvent.alarmList = rule
  advanceEvent.expireAt = cycle + expireAt
  advanceEvent.trace = strMapToObj(final_map)
  res.send(advanceEvent)
});

module.exports = router;
