/**
 * description: 获取地址栏参数
 * create_time: 2016-05-12
 * message: 不接受任何私下吐槽，请当面沟通协调
 * getURLParam: 获取地址栏参数（返回OBJ）
 * changeURLParam：变更地址栏参数（删除【传入string类型数据】/修改【传入OBJ类型数据】---最终返回string）
 */
import extend from 'Extend'

class URLParam {
  // 构造方法
  constructor() {};
  // 获取地址栏参数
  getURLParam (url) {
    let query = url || window.location.search;
    let start = query.indexOf('?');
    if (start > -1) {
      query = query.substring(start + 1);
    }
    let parameter = {};
    if (query) {
      let queryParams = query.split('&');
      for (let k in queryParams) {
        let param = queryParams[k].split('=');
        parameter[param[0]] = decodeURIComponent(param[1]) || "";
      }
    }
    return parameter;
  };
  //变更地址栏参数
  changeURLParam (obj) {
    let url = window.location.href;
    let urlParam = this.getURLParam();
    let objType = typeof obj;
    let uri = url.substr(0, url.indexOf("?"));
    if (urlParam != '') {
      // 如果传值是对象，就更改原参数,如果是字符串就删除
     if (objType == 'object') {
       // 合并或者替换参数
       urlParam = extend(urlParam, obj);
       return uri+ '?'+ f(urlParam).join('&');
     } else if (objType == 'string') {
       return uri+ '?'+ f(f1(urlParam, obj)).join('&');
     }
    };
    // 内部方法 循环匹配返回最终结果
    function f1(urlParam, obj) {
      Object.keys(urlParam).forEach(key => {
        delete urlParam[obj];
      })
      return urlParam
    }
    // 内部方法 循环序列化参数
    function f(urlParam) {
      let parameter = []
      Object.keys(urlParam).forEach(key =>{
        let value = urlParam[key]
        value = (typeof value == 'undefined')? '' : urlParam[key];
        parameter.push([key, encodeURIComponent(value)].join('='))
      });
      return parameter;
    };
  }
}
export default URLParam
