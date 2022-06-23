import Vue from 'vue'
import axios from 'axios-jsonp-pro'

var instance = axios.create()
instance.interceptors.request.use(function(config) {
  return config
})
instance.interceptors.response.use(function(response) {
  return Promise.resolve(response)
}, function(err) {
  if (err.response) {
    return Promise.reject(err.response)
  }
  return Promise.reject({ code: 'fail', message: err })
})
Vue.prototype.axios = instance
Vue.prototype.ajax = function(opts) {
  var t = this;
  return new Promise((resolve, reject) => {
    if (typeof opts.loading == 'undefined') {
      opts.loading = true
    }
    if (opts.loading) {
      t.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner'
      })
    }
    var _method = opts.method ? opts.method.toLowerCase() : 'post'
    var _url = opts.url;
    if (opts.formData) {
      t.axios.defaults.headers[_method]['Content-Type'] = 'multipart/form-data'
    } else {
      t.axios.defaults.headers[_method]['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    var info = {
      method: _method,
      url: _url,
      responseType: opts.responseType || 'json'
    }
    var _params = opts.params || {}
    if (_method == 'get') {
      info.params = _params
    } else {
      _params.hospitalNo = t.WSD.hospitalNo 
      info.data = opts.formData ? _params : t.$querystring.stringify(_params)
      
    }
    
    t.axios(info).then(function(response) {
      hideLoading()
      var data = response.data
      setTimeout(function() {
        successFun(data, response)
        resolve(data)
      }, 0)
    }).catch(errorFun)

    function hideLoading() {
      if (opts.loading) {
        t.$toast.clear()
      }
    }

    function successFun(data) {
      if (opts.success) {
        opts.success && opts.success(data)
      }
    }

    function errorFun(error) {
      hideLoading()
      if (!opts.error) {
        console.log('请求：' + _url)
        console.log('参数：' + JSON.stringify(_params))
        console.log('返回：' + JSON.stringify(error))
        // t.$dialog.alert({
        //   title: '请求失败',
        //   message: '<div class="f-tal">\
        //     路径：' + _url + '<br>\
        //     参数：' + JSON.stringify(_params) + '\
        //   </div>'
        // })
      } else {
        opts.error(error)
      }
      reject(error)
    }
  })
}