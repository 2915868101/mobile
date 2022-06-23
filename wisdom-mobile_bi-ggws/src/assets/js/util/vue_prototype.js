import Vue from 'vue'
if (!sessionStorage.fromRouteName) {
  sessionStorage.fromRouteName = JSON.stringify([])
}
//页面切换动画
Vue.prototype.skipPage = function(to, from) {
  var t = this
  var fromName = JSON.parse(sessionStorage.fromRouteName)
  var index = t.contains(fromName, to.name)
  if (to.name != '404') {
    if (index != -1) {
      t.transitionName = t.$store.state.transitionName || 'slide-right'
      fromName.splice(0, index + 1)
    } else {
      t.transitionName = t.$store.state.transitionName || 'slide-left'
      fromName.unshift(from.name)
    }
  } else {
    t.transitionName = 'fade'
  }
  if (to.name == 'indexPage') {
    fromName = []
    t.transitionName = 'slide-right'
  }
  sessionStorage.fromRouteName = JSON.stringify(fromName)
}
//切换路由
Vue.prototype.linkToPage = function(url, query, animation) {
  var t = this
  var hasQuery = typeof query == 'string' ? false : true
  t.$store.state.transitionName = (hasQuery ? animation : query) || ''
  t.$router.push({ path: url, query: ((query && hasQuery) ? { data: JSON.stringify(query || {}) } : {}) }).catch(error => error)
}
//后退
Vue.prototype.goBack = function(pg) {
  history.go(pg || -1)
}
//修改网页标题
Vue.prototype.updateTitle = function(value) {
  var t = this
  t.$store.commit('updateTitle', value)
}
// 获取随机数
Vue.prototype.getId = function(num) {
  num = num || 16
  let str = ''
  for (let i = 0; i < num; i++) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}
// 获取元素在数组中的索引值
Vue.prototype.contains = function(arr, v) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === v) {
      return i
    }
  }
  return -1
}
//选中或取消的时候更新 ids
Vue.prototype.spliceIds = function(arr, v, type) {
  var t = this
  var sp = function(arr, v) {
    var index = t.contains(arr, v)
    if (index == -1) {
      if (!type || type == 'add') {
        arr.push(v)
      }
    } else {
      if (!type || type == 'del') {
        arr.splice(index, 1)
      }
    }
    return arr
  }
  var new_arr = []
  if (Object.prototype.toString.call(v) == '[object Array]') {
    for (let i = 0; i < v.length; i++) {
      new_arr = sp(arr, v[i])
    }
  } else {
    new_arr = sp(arr, v)
  }
  return new_arr
}
//替换空字段
Vue.prototype.nullToSpace = function(obj, str) {
  return !obj && obj != 0 && obj != false ? (str || '--') : obj
}
//替换隐藏字符
Vue.prototype.regNumber = function(num) {
  let len = String(num).length,
    str = ''
  for (let i = 0; i < len; i++) {
    if (i > 3 && i < len - 3) {
      str += '*'
    }
  }
  return String(num).substr(0, 3) + str + String(num).substr(len - 4)
}
//关闭微信公众号聊天界面
Vue.prototype.closeWindow = function() {
  if (typeof window.WeixinJSBridge != 'undefined') {
    window.WeixinJSBridge.call('closeWindow')
  }
}
//网络异常关闭微信
Vue.prototype.onNetworkError = function() {
  var t = this
  setTimeout(function() {
    t.$dialog.alert({
      title: '提示',
      message: '网络不稳定，请重新尝试！'
    }).then(() => {
      t.$wechat.closeWindow()
    }).catch(() => {})
  }, 200)
}
Vue.prototype.toDecimal = function(x) {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return ''
  }
  f = Math.round(x * 100) / 100
  return f
}

Vue.prototype.getTableMaxWidth = function(num) {
  return document.body.clientWidth - num
}
Vue.prototype.getTableMaxHeight = function(num) {
  return document.body.clientHeight - num
}
Vue.prototype.toDecimal = function(x) {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return
  }
  f = Math.round(x * 100) / 100
  return f
}