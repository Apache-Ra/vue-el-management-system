/**
 * description: Cookie
 * create_time: 2019-01-03
 * message: 不接受任何私下吐槽，请当面沟通协调
 */
class Cookie {
  constructor() {
    this.date = new Date();
  }
  // 存入COOKIE
  set (name, value, day) {
    day = day || 7;
    const valueType = typeof value;
    value = (valueType == 'string')? JSON.stringify(value):value;
    this.date.setTime(this.date.getTime() + 24 * 60 * 60 * 1000 * day);
    window.document.cookie = name + '=' + value + ';path=/;expires=' + this.date.toGMTString();
  }
  // 取出COOKIE
  get (name) {
    let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null
  }
  // 删除COOKIE
  del (name) {
    this.date.setTime(this.date.getTime() - 1)
    let val = this.get(name)
    if (val != null) {
      document.cookie = name + '=' + val + ';expires=' + this.date.toGMTString();
    }
  }
}
export default Cookie
